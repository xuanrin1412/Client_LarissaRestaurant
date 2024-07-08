
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { apiGetBookATable, apiGetOneBookATable } from '../../API/api';
import dayjs from 'dayjs';
import { FaEye } from 'react-icons/fa6';
import SelectStatusBooking from './child/SelectStatusBooking';
import { IoClose } from 'react-icons/io5';
import io from 'socket.io-client';
import { IColumnBooking, IdataBooking } from '../../common/types/bookATable';
const socket = io('http://localhost:3004');

type DataIndex = keyof IColumnBooking;
const BookATableManager: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IColumnBooking> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const [showViewBooking, setShowViewBooking] = useState<boolean>(false)
  const [viewBooking, setViewBooking] = useState<IdataBooking>()
  const handleViewBookingDetails = (id: string) => {
    setShowViewBooking(!showViewBooking)
    apiGetOneBookATable(id)
      .then(res => {
        setViewBooking(res.data.getOneBooking)
      })
      .catch(error => {
        console.log("Error fetching apiGetOneBookATable", error);
      })
  }

  const columns: TableColumnsType<IColumnBooking> = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
      width: 60,
    },
    {
      title: <span className='text-nowrap'>Status</span>,
      dataIndex: 'status',
      key: 'status',
      width: 160,
      ...getColumnSearchProps('status'),
      render: (text, record) => (
        <SelectStatusBooking text={text} idBooking={record._id} />

      ),
    },
    {
      title: <span className='text-nowrap'>Khách hàng</span>,
      dataIndex: 'customerName',
      key: 'customerName',
      width: 120,
      ...getColumnSearchProps('customerName'),
      render: (text) => <div className='w-24  overflow-hidden'>
        <div className='text-nowrap text-ellipsis overflow-hidden'>{text}</div>
      </div>
    },
    {
      title: <span className='text-nowrap'>Ngày đến</span>,
      dataIndex: 'date',
      key: 'date',
      width: 110,
      ...getColumnSearchProps('date'),
    },
    {
      title: <span className='text-nowrap'>TG đến</span>,
      dataIndex: 'time',
      key: 'time',
      width: 100,
      ...getColumnSearchProps('time'),
      sorter: (a, b) => a.time.length - b.time.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: <span className='text-nowrap'>Không gian</span>,
      dataIndex: 'space',
      key: 'space',
      width: 120,
      ...getColumnSearchProps('space'),
    },
    {
      title: <span className='text-nowrap'>SL khách</span>,
      dataIndex: 'totalPerson',
      key: 'totalPerson',
      width: 100,
      ...getColumnSearchProps('totalPerson'),
    },
    {
      title: <span className='text-nowrap'>Note</span>,
      dataIndex: 'note',
      key: 'note',
      width: 100,
      ...getColumnSearchProps('note'),
      render: (text) => <div className='w-20  overflow-hidden'>
        <div className='text-nowrap text-ellipsis overflow-hidden'>{text}</div>
      </div>
    },
    {
      title: <span className='text-nowrap'>Ngày đặt bàn</span>,
      dataIndex: 'createAt',
      key: 'createAt',
      width: 150,
      ...getColumnSearchProps('createAt'),
      render: (text) => <span className='text-nowrap'>{text}</span>,
    },
    {
      title: <span className='text-nowrap'>Action</span>,
      key: 'operation',
      fixed: 'right',
      width: 70,
      render: (record) => (
        <div>
          <span className="text-sm underline cursor-pointer"><FaEye onClick={() => handleViewBookingDetails(record._id)} className="text-2xl" /></span>
        </div>
      ),
    },
  ];

  const [dataBooking, setDataBooking] = useState<IdataBooking[]>()

  const dataDisplayBooking = dataBooking?.map((item, index) => {
    return {
      _id: item._id,
      key: index + 1,
      customerName: item?.userInfo?.userName,
      date: item?.date,
      note: item?.note,
      time: item?.time,
      space: item?.space,
      totalPerson: item?.totalPerson,
      createAt: dayjs(item?.createdAt).format('DD/MM/YYYY  h:mm A '),
      status: item.status,
    }
  })

  useEffect(() => {
    const getListBooking = async () => {
      try {
        const res = await apiGetBookATable()
        setDataBooking(res.data.getAllBooking)
      } catch (error) {
        console.log("Error getListBooking", error);

      }
    }
    getListBooking()
    socket.on('updateBookingList', () => {
      console.log("fetch lại data booking");
      getListBooking()
    });
    return () => {
      socket.off('allBooking');
    };


  }, [])

  return <div className='pt-header w-full ' >
    <div className='text-center font-bold text-2xl py-6'>
      Khách hàng đặt bàn
    </div>
    <div className='w-11/12 mx-auto pb-20'>
      <Table columns={columns} dataSource={dataDisplayBooking} />
    </div>

    {showViewBooking && <div className=" z-50 absolute top-0 left-0 h-screen w-full ">
      <div
        className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
        <div data-aos="fade-down" className=" relative h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[45%] bg-white mt-20 p-8   flex flex-col border-2 border-black">
          <div
            onClick={() => {
              setShowViewBooking(!showViewBooking)
            }}
            className=" absolute top-2 right-2 p-1 hover:bg-gray-200"><IoClose style={{ height: 20, width: 20 }} />
          </div>
          <div className='space-y-2'>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Khách hàng:</div>
              <span className='font-bold'>{viewBooking?.userInfo.userName}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>SĐT:</div>
              <span>{viewBooking?.userInfo.phoneNumber}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Email:</div>
              <span>{viewBooking?.userInfo.email}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Địa chỉ:</div>
              <span>{viewBooking?.userInfo.address}</span>
            </div>

            <br />
            <div className='flex'>
              <div className='min-w-[130px] underline'>Ngày đến:</div>
              <span className='font-bold'>{viewBooking?.date}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Thời gian đến:</div>
              <span className='font-bold'>{viewBooking?.time}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Không gian:</div>
              <span>{viewBooking?.space}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Ghi chú:</div>
              <span>{viewBooking?.note}</span>
            </div>
            <div className='flex'>
              <div className='min-w-[130px] underline'>Số lượng khách:</div>
              <span>{viewBooking?.totalPerson}</span>
            </div>
          </div>
        </div>
      </div>
    </div>}
  </div>;
};
export default BookATableManager;
