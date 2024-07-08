import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Space, Table, TableColumnType, type TableColumnsType } from 'antd';
import { apiAddCategory, apiDeleteCategory, apiGetAllCategory } from "../../../API/api";
import { FaCirclePlus } from "react-icons/fa6";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";


interface IdataCategory {
  _id: string,
  categoryName: string
}
type DataIndex = keyof IdataCategory;
export const CategoryManagement = () => {
  const [dataCategory, setDataCategory] = useState<IdataCategory[]>()
  console.log("dataCategory", dataCategory);
  type Inputs = {
    categoryName: string
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>(
    {
      criteriaMode: "all",
    }
  )
  const [addedCategory, setAddedCategory] = useState<boolean>(false)
  console.log("addedCategory boolean ", addedCategory);


  const onSubmitAddCategory: SubmitHandler<Inputs> = async (data) => {
    console.log("data cate", data)
    try {
      const res = await apiAddCategory(data.categoryName)
      setAddedCategory(true)
      reset()
      console.log("res 123", res);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error fetching ApiAddCategory", error.response.data.error);
        setError("categoryName", {
          message: error.response.data.error,
        })
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  const [openModalConfirmDeleteCate, setOpenModalConfirmDeleteCate] = useState<boolean>(false)
  const [categoryItem, setCategoryItem] = useState<IdataCategory>()
  const handleOpenModalDeleteCategory = async (category: IdataCategory) => {
    setOpenModalConfirmDeleteCate(!openModalConfirmDeleteCate)
    setCategoryItem(category)
  }

  const handleDeleteCategory = async () => {
    try {
      const res = await apiDeleteCategory(categoryItem?._id)
      setAddedCategory(true)
      reset()
      console.log("res 123", res);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error fetching 668a363a61856939d2d74abd", error.response.data.statusError);
        if (error.response.data.statusError == "Category have foods") {
          toast.error("Danh mục món ăn đang chứa món ăn không thể xóa doanh mục!")
        }
      }
    }
  }

  console.log(watch("categoryName"))

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
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IdataCategory> => ({
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
  const columns: TableColumnsType<IdataCategory> = [
    {
      title: 'Id',
      width: 50,
      dataIndex: '_id',
      key: '_id',
      // fixed: 'left',
    },
    {
      title: 'Tên doanh mục món ăn',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 30,
      ...getColumnSearchProps('categoryName'),
    },
    // {
    //   title: 'Ngày',
    //   dataIndex: 'createAt',
    //   key: 'createAt',
    //   width: 50,
    // },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 25,
      render: (record) => (
        <div className="flex space-x-4">
          <FaEdit className="text-[20px]" />
          <FaRegTrashAlt onClick={() => handleOpenModalDeleteCategory(record)} className="text-[20px]" />
        </div>
      ),
    },
  ];
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await apiGetAllCategory()
        setDataCategory(res.data.getAllCategory)
        console.log("res apiGetAllCategory", res.data.getAllCategory);
      } catch (error) {
        console.log("Error get all bills", error);
      }
    }
    getAllCategory()

    if (addedCategory == true) {
      getAllCategory()
      setAddedCategory(false)
    }

    // if (openModalCategory) {
    //   document.body.classList.add('modal-open');
    // } else {
    //   document.body.classList.remove('modal-open');
    // }
    // return () => {
    //   document.body.classList.remove('modal-open');
    // };

  }, [addedCategory])

  return <div className="mt-5 flex-col pr-10">

    <form onSubmit={handleSubmit(onSubmitAddCategory)} action="" className="flex flex-col w-full  border-4 border-slate-800 rounded-2xl px-6 py-4 mb-8">
      <div className="flex w-full items-end space-x-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="" id="categoryName" className="text-xl text-slate-800 font-bold pb-2">Tên doanh mục món ăn</label>
          <input placeholder="Hãy nhập tên daonh mục "  {...register("categoryName", { required: "Hãy nhập tên doanh mục !" })} id="categoryName" name="categoryName" type="text" className={` ${errors.categoryName ? " border-red-400 outline-none" : "border-gray-300"} h-[40px] rounded-xl border-2   px-4`} />
        </div>
        <button type="submit" className="flex text-white h-fit bg-slate-800 font-bold items-center space-x-4 p-2 border-2 rounded-2xl border-slate-800 hover:bg-black hover:text-white  hover:border-black">
          <span className="text-nowrap">Thêm danh mục</span> <FaCirclePlus />
        </button>
      </div>
      {errors.categoryName && <div className="text-red-500 pt-1 ">{errors.categoryName.message}</div>}
    </form>

    {/* <button className="flex text-slate-800 font-bold items-center space-x-4 p-2 border-2 rounded-2xl border-slate-800 hover:bg-black hover:text-white  hover:border-black">
        <span>Thêm danh mục món ăn</span> <FaCirclePlus />
      </button> */}

    <Table columns={columns} dataSource={dataCategory} scroll={{ x: 500, y: 300 }} />
    {openModalConfirmDeleteCate &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full ">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[30%] bg-white mt-36  flex flex-col border-2 border-black">
            <div className="py-8 px-4" >
              <div className="text-center font-bold text-xl  mb-5">Bạn có chắc muốn xóa doanh mục <br></br>"{categoryItem?.categoryName}"</div>
              <div className="flex justify-between px-10 font-bold">
                <button onClick={() => {
                  setOpenModalConfirmDeleteCate(!openModalConfirmDeleteCate)
                  handleDeleteCategory()
                }} className="border-2 py-2 px-6 border-black rounded-2xl hover:bg-red-600 hover:text-white">Xóa</button>
                <button onClick={() => setOpenModalConfirmDeleteCate(!openModalConfirmDeleteCate)} className="border-2 py-2 px-6 border-black bg-black text-white rounded-2xl">Đóng</button>
              </div>
            </div>
            <div onClick={() => setOpenModalConfirmDeleteCate(!openModalConfirmDeleteCate)} className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
    }
  </div>
}
