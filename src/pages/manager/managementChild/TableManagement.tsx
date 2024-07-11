import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Select, Space, Table, TableColumnType, type TableColumnsType } from 'antd';
import { apiCreateTable, apiDeleteTable, apiGetAllArea, apiGetAreaWithTable } from "../../../API/api";
import { FaCirclePlus } from "react-icons/fa6";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { ModalViewEditTable } from "./Modal/ModalViewEditTable";
import { useAppSelector } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import { setRefreshAreaWithTable } from "../../../Redux/userSlice";
import { setCloseModalDeleteTable } from "../../../Redux/foodsSlice";


export interface IdataArea {
  _id: string,
  areaName: string
}
export interface ITableItem {
  _id: string,
  tableName: string,
  capacity: number,
}
export interface IgetDataAreaWTable {
  areaId: string,
  areaName: string,
  table: ITableItem[]
}
export interface IgetDataAreaWTableDisplay {
  key: number
  areaId: string,
  areaName: string,
  table: ITableItem[]
}
export interface IAddTable {
  tableName: string,
  capacity: number,
  areaId: string,
}
type DataIndex = keyof IgetDataAreaWTableDisplay;

export const TableManagement = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IAddTable>(
    {
      criteriaMode: "all",
    }
  )

  const dispatch = useDispatch()
  const [dataArea, setDataArea] = useState<IdataArea[]>()
  const [addFood, setAddFood] = useState<boolean>(false)
  const [modalFoods, setModalFoods] = useState<boolean>(false)
  const [areaWithTables, setAreaWithTables] = useState<IgetDataAreaWTableDisplay[]>()

  const listAreaForSelectOption = dataArea?.map(item => {
    return {
      value: item._id,
      label: item.areaName,
    }
  })

  const [areaWithTableItem, setAreaWithTableItem] = useState<IgetDataAreaWTable>()
  const [modalViewEditTables, setModalViewEditTables] = useState<boolean>(false)
  const setViewAndEditTable = (record: IgetDataAreaWTable) => {
    setModalViewEditTables(true)
    setAreaWithTableItem(record)
  }

  const openModalDeleteTable: boolean = useAppSelector(state => state.foods.openModalDeleteTable)
  const tableDeleteInfo: ITableItem = useAppSelector(state => state.foods.tableDeleteInfo)
  const refreshAreaWTable = useAppSelector(state => state.user.refreshAreaWithTable)  //RE CALL API WHEN UPDATE

  // HANDLE ADD TABLE
  const [addedTable, setAddedTable] = useState<boolean>(false)
  const onSubmitAddTable: SubmitHandler<IAddTable> = async (data) => {
    try {
      const capacity = Number(data.capacity)
      const res = await apiCreateTable({
        tableName: data.tableName,
        capacity,
        areaId: data.areaId
      })
      setAddedTable(true)
      reset()
      setValue("areaId", "")
      toast.success(res.data.createTable.tableName + " " + "đã được tạo")
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error fetching ApiCreateTable", error.response.data.message);
        toast.error(error.response.data.message)
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  // HANDLE DELETE TABLE
  const [deletedTable, setDeletedTable] = useState<boolean>(false)
  const handleDeleteTable = () => {
    try {
      apiDeleteTable(tableDeleteInfo._id)
      setDeletedTable(true)
      setModalViewEditTables(false)
      toast.success("Xóa bàn thành công")
    } catch (error) {
      console.log("Error Fetching Delete Table", error);
    }
  }

  //================================ HANDEL COLUMN START=================
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
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IgetDataAreaWTableDisplay> => ({
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
  const columns: TableColumnsType<IgetDataAreaWTableDisplay> = [
    {
      title: <span className="text-nowrap">Id</span>,
      width: 20,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: <span className="text-nowrap ">Tên khu vực</span>,
      dataIndex: 'areaName',
      key: 'areaName',
      width: 60,
      ...getColumnSearchProps('areaName'),
    },
    {
      title: 'Tên bàn',
      dataIndex: 'table',
      key: 'table',
      width: 140,
      render: (table: ITableItem[]) => (
        <div className="grid lg:grid-cols-2  gap-x-3">
          {table.map((item) => (
            <div key={item._id} className="flex flex-nowrap">
              <div className="text-nowrap">{item.tableName}</div>
              <div className="text-nowrap">__ {item.capacity} ghế</div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: <span className="text-nowrap">Action</span>,
      key: 'operation',
      width: 40,
      fixed: 'right',
      render: (record) => (
        <FaEye onClick={() => {
          setViewAndEditTable(record)
        }} className="text-2xl cursor-pointer w-full " />
      ),
    },
  ];
  //=========================HANDEL COLUMN END==========================



  useEffect(() => {
    const getAllArea = async () => {
      try {
        const res = await apiGetAllArea()
        setDataArea(res.data.getAllArea)
      } catch (error) {
        console.log("Error get all bills", error);
      }
    }
    getAllArea()
    const getAreaWithTable = async () => {
      try {
        const res = await apiGetAreaWithTable()
        const dataAreaWithtable: IgetDataAreaWTable[] = res.data
        setAreaWithTables(dataAreaWithtable.map((item, index) => {
          return {
            key: index + 1,
            areaName: item.areaName,
            areaId: item.areaId,
            table: item.table,
          }
        }))
      } catch (error) {
        console.log("Error get all bills", error);
      }
    }
    getAreaWithTable()
    if (addedTable == true) {
      getAllArea()
      setAddedTable(false)
    }
    if (refreshAreaWTable == true) {
      getAreaWithTable()
      dispatch(setRefreshAreaWithTable(false))
    }
    if (areaWithTableItem) {
      setValue("areaId", areaWithTableItem.areaId)
    }
    if (deletedTable) {
      getAreaWithTable()
      setDeletedTable(false)
    }
    if (modalViewEditTables || openModalDeleteTable) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };

  }, [addedTable, areaWithTableItem, setValue, openModalDeleteTable, modalViewEditTables, refreshAreaWTable, deletedTable, dispatch])

  return <div className="mt-5 flex-col pr-10">
    <div className="flex justify-between mt-4 mb-8 items-end">
      <div className="text-2xl font-medium underline">Danh sách bàn </div>
      <div className="border-2 border-slate-800 rounded-2xl hover:border-black">
        <button onClick={() => {
          setAddFood(true)
          setModalFoods(!modalFoods)
        }} type="submit" className="flex text-white h-fit bg-slate-800 m-[2px]  font-bold items-center space-x-4 p-2  rounded-xl border-black hover:bg-black hover:text-white  hover:border-black">
          <span className="text-nowrap">Thêm bàn</span> <FaCirclePlus />
        </button>
      </div>
    </div>
    <Table columns={columns} dataSource={areaWithTables} scroll={{ x: 500, y: 800 }} />

    {/*MODAL ADD TABLE*/}
    {modalFoods &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center pb-5 ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[40%] bg-white mt-14  flex flex-col border-2 border-black">
            <div className="" >
              <div className="bg-black text-white rounded-t-xl py-3 px-2 border-2 border-white  text-xl font-bold text-center border-b-2 ">Thêm bàn</div>
              <form className="p-8 space-y-3 border-t-2 border-black">
                <div className="flex flex-col">
                  <span>Khu vực</span>
                  <Controller
                    name="areaId"
                    control={control}
                    rules={{ required: 'Hãy chọn khu vực !' }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select
                          {...field}
                          showSearch
                          placeholder="Hãy chọn danh mục"
                          className={`styleSelect `}
                          style={{ width: "100%", height: "41px" }}
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                          }
                          options={listAreaForSelectOption}
                          onChange={(value) => field.onChange(value)}
                          onBlur={field.onBlur}
                          value={field.value || null}
                        />
                        {error && <p className="text-red-500">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <label id="tableName" htmlFor="">Tên bàn</label>
                  <input  {...register("tableName", { required: true })} className={`${errors.tableName ? "border-red-500" : "border-black"} outline-none p-2 border-2  rounded-xl`} type="text" id="tableName" placeholder="Nhập tên bàn" />
                </div>
                {errors.tableName && <span className="text-red-500">Hãy nhập tên bàn !</span>}
                <div className="flex flex-col">
                  <label id="capacity" htmlFor="">Số lượng ghế</label>
                  <input  {...register("capacity", { required: true })} className={`${errors.capacity ? "border-red-500" : "border-black"} outline-none p-2 border-2  rounded-xl`} type="number" id="capacity" placeholder="Nhập số lượng ghế" />
                </div>
                {errors.capacity && <span className="text-red-500">Hãy nhập số lượng ghế !</span>}
                <div className="flex justify-between pt-4 font-bold space-x-2 ">
                  {addFood &&
                    <button type="submit"
                      onClick={handleSubmit(onSubmitAddTable)}
                      className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Thêm bàn
                    </button>
                  }
                  {!addFood &&
                    <div>
                      <div className="flex space-x-2">
                        <button
                          className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Lưu thay đổi</button>
                        <button className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Hủy thay đổi</button>
                      </div> : <button
                        className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Chỉnh sửa</button>
                    </div>
                  }
                  <button
                    onClick={() => {
                      setModalFoods(!modalFoods)
                      reset()
                    }}
                    className="border-2 py-2 px-6 border-black  text-black rounded-xl hover:bg-red-600 hover:text-white">Đóng</button>
                </div>
              </form>
            </div>
            <div onClick={() => {
              setModalFoods(!modalFoods)
            }} className="absolute top-2 right-2 p-1 hover:bg-gray-200 hover:bg-opacity-20 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl text-white" />
            </div>
          </div>
        </div>
      </div >
    }
    {/* MODAL VIEW EDIT TABLE */}
    {modalViewEditTables &&
      <ModalViewEditTable areaWithTableItem={areaWithTableItem} setModalViewEditTables={setModalViewEditTables} />
    }
    {/* MODAL VIEW AND DELETE TABLE */}
    {openModalDeleteTable &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full ">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[30%] bg-white mt-36  flex flex-col border-2 border-black">
            <div className="py-8 px-4" >
              <div className="text-center font-bold text-xl  mb-5">Bạn có chắc muốn xóa khu vực<br /> {tableDeleteInfo.tableName} </div>
              <div className="flex justify-between px-10 font-bold">
                <button onClick={() => {
                  dispatch(setCloseModalDeleteTable(false))
                  handleDeleteTable()
                }} className="border-2 py-2 px-6 border-black rounded-2xl hover:bg-red-600 hover:text-white">Xóa</button>
                <button onClick={() => dispatch(setCloseModalDeleteTable(false))} className="border-2 py-2 px-6 border-black bg-black text-white rounded-2xl">Đóng</button>
              </div>
            </div>
            <div onClick={() => dispatch(setCloseModalDeleteTable(false))} className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
    }
  </div>
}
