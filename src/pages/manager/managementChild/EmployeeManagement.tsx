import { apiCreateModerator, apiDeleteModerator, apiGetAllModerator, apiGetUserInfo, apiUpdateProfile } from "../../../API/api";
import { Button, Input, InputRef, Space, Table, TableColumnType, type TableColumnsType } from 'antd';
import { LoadingImage } from "../../../components/commons/loadingImage";
import { FaCirclePlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useAppSelector } from "../../../Redux/store";
import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CryptoJS from "crypto-js"

type DataIndex = keyof IDataModeratorsDisplay;
interface IdataModerators {
  _id: string;
  role: string;
  avatar: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}
interface IDataModeratorsDisplay {
  key: number;
  _id: string;
  role: string;
  avatar: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  password: string;
}

export const EmployeeManagement = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IDataModeratorsDisplay>(
    {
      criteriaMode: "all",
    },
  )

  const [staffData, setStaffData] = useState<IDataModeratorsDisplay>()
  const [dataModerators, setDataModerators] = useState<IDataModeratorsDisplay[]>()
  const [modalFoods, setModalFoods] = useState<boolean>(false)
  const [deletedStaff, setDeletedStaff] = useState<boolean>(false)
  const [takeOneStaff, setTakeOneStaff] = useState<IDataModeratorsDisplay | null>(null)

  const loadingImage: boolean = useAppSelector(state => state.image.loadingImage)
  const [openModalConfirmDeleteStaff, setOpenModalConfirmDeleteStaff] = useState<boolean>(false)

  const handleOpenModalDeleteStaff = async (record: IDataModeratorsDisplay) => {
    setOpenModalConfirmDeleteStaff(!openModalConfirmDeleteStaff)
    setStaffData(record)
  }
  const handleDeleteFood = async () => {
    try {
      await apiDeleteModerator(staffData?._id)
      setDeletedStaff(true)
      toast.success("Xóa nhân viên thành công")
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error fetching apiDeleteFood", error);
      }
    }
  }

  const [addFood, setAddFood] = useState<boolean>(false)
  const [startEdit, setStartEdit] = useState<boolean>(false)
  const [readOnly, setReadOnly] = useState<boolean>(false)
  const handleOpenModalViewEdit = async (id: string) => {
    setAddFood(false)
    setModalFoods(!modalFoods)
    setReadOnly(true)
    try {
      const res = await apiGetUserInfo(id)
      setTakeOneStaff(res.data.getUser)
    } catch (error) {
      console.log(error);
    }
  }

  // =================HANDLE COLUMN SEARCH START================================
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const showPass = () => {
    const elementPassword = document.getElementsByClassName("password");
    if ((elementPassword[0] as HTMLInputElement).type === "password") {
      (elementPassword[0] as HTMLInputElement).type = "text"
      setShowPassword(true)

    } else {
      (elementPassword[0] as HTMLInputElement).type = "password"
      setShowPassword(false)
    }
  }


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
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IDataModeratorsDisplay> => ({
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
  // =================HANDLE COLUMN SEARCH END================================
  const columns: TableColumnsType<IDataModeratorsDisplay> = [
    {
      title: <span className="text-nowrap">Id</span>,
      width: 20,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: <span className="text-nowrap">Tên Nhân Viên</span>,
      dataIndex: 'userName',
      key: 'userName',
      width: 50,
      ...getColumnSearchProps('userName'),
      // render: (record) => (
      //   <div className="flex space-x-4 h-20 w-20">
      //     <img src={record} alt="" className="h-full w-full object-cover" />
      //   </div>
      // ),
    },
    {
      title: <span className="text-nowrap">Số ĐT</span>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 45,
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: <span className="text-nowrap">Email</span>,
      dataIndex: 'email',
      key: 'email',
      width: 60,
      ...getColumnSearchProps('email'),
    },

    {
      title: <span className="text-nowrap">Địa chỉ</span>,
      dataIndex: 'address',
      key: 'address',
      width: 140,
      ...getColumnSearchProps('address'),
    },
    {
      title: <span className="text-nowrap">Hành động</span>,
      key: 'operation',
      width: 35,
      fixed: 'right',
      render: (record) => (
        <div className="flex space-x-4 justify-center">
          <FaEdit onClick={() => handleOpenModalViewEdit(record._id)} className="text-[20px] cursor-pointer" />
          <FaRegTrashAlt onClick={() => handleOpenModalDeleteStaff(record)} className="text-[20px] cursor-pointer" />
        </div>
      ),
    },
  ];

  const onSubmitAddModerator: SubmitHandler<IDataModeratorsDisplay> = async (data) => {
    if (startEdit) {
      setStartEdit(false)
      setReadOnly(true)
      console.log("UPDATE DATA", data);
      try {
        const res = await apiUpdateProfile({
          id: takeOneStaff?._id,
          body: {
            userName: data?.userName,
            email: data?.email,
            avatar: data?.avatar,
            phoneNumber: data?.phoneNumber,
            address: data?.address,
          }
        })
        reset()
        console.log("res update user info", res);
        setModalFoods(!modalFoods)
        toast.success("Cập nhật thông tin thành công !")
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log("Error Fetching apiUpdateProfile", error?.response.data.message);
          toast.error(error?.response.data.message)
        }
      }
    } else {
      try {
        const res = await apiCreateModerator({
          userName: data.userName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          password: data.password,
          role: "moderator",
        })
        setDeletedStaff(true)
        console.log("res apiCreateModerator", res.data.newUser);
        reset()
        toast.success("Thêm nhân viên thành công")
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          console.log("Error Fetching apiCreateModerator", error?.response.data.message);
          toast.error(error?.response.data.message)
        }
      }
    }
  }

  const handleCancelEdit = () => {
    if (takeOneStaff) {
      const bytes = CryptoJS.AES.decrypt(takeOneStaff.password, 'xuanrin');
      const originalPass = bytes.toString(CryptoJS.enc.Utf8);
      console.log({ originalPass });
      setValue("address", takeOneStaff?.address),
        setValue("email", takeOneStaff?.email),
        setValue("password", originalPass),
        setValue("phoneNumber", takeOneStaff?.phoneNumber),
        setValue("userName", takeOneStaff?.userName)
    }
    setStartEdit(!startEdit)
    setReadOnly(true)
  }

  useEffect(() => {
    // const getAllFoods = async () => {
    //   try {
    //     const res = await apiGetAllFoods()
    //     const foods: IFoods[] = res.data.foods
    //     setDataFoods(foods.map((item, index) => {
    //       return {
    //         key: index + 1,
    //         _id: item._id,
    //         categoryName: item.categoryId.categoryName,
    //         foodName: item.foodName,
    //         description: item.description,
    //         picture: item.picture,
    //         costPrice: item.costPrice,
    //         revenue: item.revenue,
    //         favourite: item.favourite,
    //         createdAt: item.createdAt,
    //       }
    //     }))
    //   } catch (error) {
    //     console.log("Error get all bills", error);
    //   }
    // }
    // getAllFoods()
    // if (deletedFood) {
    //   getAllFoods()
    //   setDeletedFood(false)
    // }
    // const getAllCategory = async () => {
    //   try {
    //     const res = await apiGetAllCategory()
    //     setListCategory(res.data.getAllCategory)
    //   } catch (error) {
    //     console.log("Error get all bills", error);
    //   }
    // 
    // getAllCategory()



    // if (modalFoods) {
    //   document.body.classList.add('modal-open');
    // } else {
    //   document.body.classList.remove('modal-open');
    // }
    // return () => {
    //   document.body.classList.remove('modal-open');
    // };



    const GetAllModarator = async () => {
      try {
        const res = await apiGetAllModerator()
        console.log("res apiGetAllModerator", res.data.getAllModerator);
        const moderator: IdataModerators[] = res.data.getAllModerator
        setDataModerators(moderator.map((item, index) => {
          return {
            key: index + 1,
            _id: item._id,
            userName: item.userName,
            email: item.email,
            phoneNumber: item.phoneNumber,
            address: item.address,
            avatar: item.avatar,
            role: item.role,
            password: item.password
          }
        }))

        // const modarator: IFoods[] = res.data.foods
        // setDataFoods(foods.map((item, index) => {
        //   return {
        //     key: index + 1,
        //     _id: item._id,
        //     categoryName: item.categoryId.categoryName,
        //     foodName: item.foodName,
        //     description: item.description,
        //     picture: item.picture,
        //     costPrice: item.costPrice,
        //     revenue: item.revenue,
        //     favourite: item.favourite,
        //     createdAt: item.createdAt,
        //   }
        // }))
      } catch (error) {
        console.log("Error get all moderator", error);
      }
    }
    GetAllModarator()
    if (deletedStaff) {
      GetAllModarator()
      setDeletedStaff(false)
    }
    if (takeOneStaff) {
      const bytes = CryptoJS.AES.decrypt(takeOneStaff.password, 'xuanrin');
      const originalPass = bytes.toString(CryptoJS.enc.Utf8);
      console.log({ originalPass });
      setValue("address", takeOneStaff?.address),
        setValue("email", takeOneStaff?.email),
        setValue("password", originalPass),
        setValue("phoneNumber", takeOneStaff?.phoneNumber),
        setValue("userName", takeOneStaff?.userName)
    }
  }, [modalFoods, staffData, setValue, takeOneStaff, showPassword, deletedStaff])

  return <div className="mt-5 flex-col pr-10">
    <div className="flex justify-between items-end mt-4 mb-8">
      <div className="text-2xl font-medium underline">Danh sách nhân viên</div>
      <div className="border-2 border-slate-800 rounded-2xl hover:border-black">
        <button onClick={() => {
          setAddFood(true)
          setModalFoods(!modalFoods)
        }} type="submit" className="flex text-white h-fit bg-slate-800 m-[2px]  font-bold items-center space-x-4 p-2  rounded-xl border-black hover:bg-black hover:text-white  hover:border-black">
          <span className="text-nowrap">Thêm nhân viên</span> <FaCirclePlus />
        </button>
      </div>
    </div>
    <Table columns={columns} dataSource={dataModerators} scroll={{ x: 1200, y: 800 }} />
    {modalFoods &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center pb-5 ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[40%] bg-white mt-14  flex flex-col border-2 border-black">
            <div className="" >
              <div className="bg-black text-white rounded-t-xl py-3 px-2 border-2 border-white  text-xl font-bold text-center border-b-2 ">{addFood ? "Thêm Nhân viên" : "Xem và chỉnh sửa món ăn"}</div>
              <form className="p-8 space-y-3 border-t-2 border-black">
                <div className="flex flex-col">
                  <label htmlFor="userName">Tên NV</label>
                  <input {...register("userName", { required: "Hãy nhập tên nhân viên *" })} disabled={readOnly}
                    className={`${errors.userName ? "border-red-500" : "border-black"} 
                  ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="userName" placeholder="Nhập tên nhân viên" />
                  {errors.userName && <p className="text-red-500">{errors.userName?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phoneNumber">SĐT</label>
                  <input disabled={readOnly} {...register("phoneNumber",
                    {
                      required: "Hãy nhập số điện thoại",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Số điện thoại không hợp lệ!"
                      }
                    }
                  )}
                    className={`${errors.phoneNumber ? "border-red-500" : "border-black"} 
                  ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="phoneNumber" placeholder="Nhập SĐT" />
                  {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address">Địa chỉ</label>
                  <input disabled={readOnly} {...register("address", { required: "Hãy nhập địa chỉ *" })}
                    className={`${errors.address ? "border-red-500" : "border-black"} 
                  ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="address" placeholder="Nhập Địa chỉ" />
                  {errors.address && <p className="text-red-500">{errors.address?.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input disabled={readOnly}
                    {...register("email", {
                      required: "Hãy nhập email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không hợp lệ!"
                      }
                    })}
                    className={`${errors.email ? "border-red-500" : "border-black"} 
                    ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`}
                    type="email"
                    id="email"
                    placeholder="Nhập email"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div className="flex flex-col">
                  <label id="userName" htmlFor="">Mật khẩu</label>
                  <div className="relative  ">
                    <input disabled={readOnly} {...register("password", { required: "Hãy nhập mật khẩu *" })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""}  outline-none p-2 border-2  rounded-xl password w-full`} type="password" id="foodName" placeholder="Nhập tên nhân viên" />
                    <div className="absolute top-0 right-3 h-full flex items-center">
                      {showPassword ? <FaRegEye onClick={() => showPass()} className="" />
                        : <FaRegEyeSlash onClick={() => showPass()} className="" />}
                    </div>
                    
                  </div>
                  {errors.password && <p className="text-red-500">{errors.password?.message}</p>}

                </div>

                <div className="flex justify-between pt-4 font-bold space-x-2 ">
                  {addFood && <button type="submit" onClick={handleSubmit(onSubmitAddModerator)} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Lưu
                  </button>}
                  {!addFood &&
                    <div>
                      {startEdit ?
                        <div className="flex space-x-2">
                          <button onClick={handleSubmit(onSubmitAddModerator)} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Lưu thay đổi</button>
                          <div onClick={() => handleCancelEdit()} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Hủy thay đổi</div>
                        </div> : <button onClick={() => {
                          setStartEdit(!startEdit)
                          setReadOnly(false)
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        }} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Chỉnh sửa</button>
                      }
                    </div>
                  }
                  <button
                    onClick={() => {
                      setReadOnly(false)
                      setTakeOneStaff(null)
                      setStartEdit(false)
                      setModalFoods(!modalFoods)
                      reset()
                    }}
                    className="border-2 py-2 px-6 border-black  text-black rounded-xl hover:bg-red-600 hover:text-white">Đóng</button>
                </div>
              </form>
            </div>
            <div onClick={() => {
              setReadOnly(false)
              setTakeOneStaff(null)
              setStartEdit(false)
              setModalFoods(!modalFoods)
              reset()
            }} className="absolute top-2 right-2 p-1 hover:bg-gray-200 hover:bg-opacity-20 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl text-white" />
            </div>
          </div>
        </div>
      </div >
    }
    {openModalConfirmDeleteStaff &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full ">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[30%] bg-white mt-36  flex flex-col border-2 border-black">
            <div className="py-8 px-4" >
              <div className="text-center font-bold text-[18px]">Bạn có chắc muốn xóa nhân viên</div>
              <div className="text-center text-xl mb-5  font-bold text-red-500">{staffData?.userName}</div>
              <div className="flex justify-between px-10 font-bold">
                <button onClick={() => {
                  setOpenModalConfirmDeleteStaff(!openModalConfirmDeleteStaff)
                  handleDeleteFood()

                }} className="border-2 py-2 px-6 border-black rounded-2xl hover:bg-red-600 hover:text-white">Xóa</button>
                <button onClick={() => {
                  // reset()
                  setOpenModalConfirmDeleteStaff(!openModalConfirmDeleteStaff)
                }} className="border-2 py-2 px-6 border-black bg-black text-white rounded-2xl">Đóng</button>
              </div>
            </div>
            <div onClick={() => setOpenModalConfirmDeleteStaff(!openModalConfirmDeleteStaff)} className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl" />
            </div>
          </div>
        </div>
      </div>
    }
    {loadingImage &&
      <LoadingImage />
    }
  </div >
}
