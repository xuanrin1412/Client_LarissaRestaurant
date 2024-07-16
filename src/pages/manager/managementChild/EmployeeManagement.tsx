import { apiAddFoods, apiDeleteFood, apiGetAllModerator, apiGetOneFood, apiUpdateFoodItem, apiUploadImage } from "../../../API/api";
import { Button, Input, InputRef, Space, Table, TableColumnType, type TableColumnsType } from 'antd';
import { IdataCategory, IFoodAdd, IFoods } from "../../../common/types/foods";
import { LoadingImage } from "../../../components/commons/loadingImage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FilterDropdownProps } from "antd/es/table/interface";
import { convertBase64 } from "../../../utils/conversebase";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { setLoadingImage } from "../../../Redux/Image";
import { useAppSelector } from "../../../Redux/store";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type DataIndex = keyof IDataModeratorsDisplay;
interface IdataModerators {
  _id: string;
  role: string;
  avatar: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
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
}

export const EmployeeManagement = () => {
  const {
    register,
    handleSubmit, control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IdataModerators>(
    {
      criteriaMode: "all",
    },
  )

  const dispatch = useDispatch()
  const [foodItem, setFoodItem] = useState<IFoods>()
  // const [dataFoods, setDataFoods] = useState<IdataFoods[]>()
  const [dataModerators, setDataModerators] = useState<IDataModeratorsDisplay[]>()
  const [modalFoods, setModalFoods] = useState<boolean>(false)
  const [deletedFood, setDeletedFood] = useState<boolean>(false)
  // const [listCategory, setListCategory] = useState<IdataCategory[]>()
  const [takeFoodItem, settakeFoodItem] = useState<IFoods | null>(null)
  const loadingImage: boolean = useAppSelector(state => state.image.loadingImage)
  const [openModalConfirmDeleteFood, setOpenModalConfirmDeleteFood] = useState<boolean>(false)

  const handleOpenModalDeleteFood = async (Food: IFoods) => {
    setOpenModalConfirmDeleteFood(!openModalConfirmDeleteFood)
    setFoodItem(Food)
  }
  const handleDeleteFood = async () => {
    try {
      await apiDeleteFood(foodItem?._id)
      setDeletedFood(true)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.log("Error fetching apiDeleteFood", error);
      }
    }
  }

  const [addFood, setAddFood] = useState<boolean>(false)
  const [startEdit, setStartEdit] = useState<boolean>(false)
  const [readOnly, setReadOnly] = useState<boolean>(false)
  const handleOpenModalViewEdit = async (foodId: string) => {
    setAddFood(false)
    setModalFoods(!modalFoods)
    setReadOnly(true)
    try {
      const res = await apiGetOneFood(foodId)
      settakeFoodItem(res.data.getOneFood)
    } catch (error) {
      console.log(error);
    }
  }

  // =================HANDLE COLUMN SEARCH START================================
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
    // {
    //   title: <span className="text-nowrap">Giá gốc</span>,
    //   dataIndex: 'costPrice',
    //   key: 'costPrice',
    //   width: 50,
    //   ...getColumnSearchProps('costPrice'),
    //   render: (record) => (
    //     <div className=" text-nowrap float-right" >
    //       {formatCurrency(record)} vnđ
    //     </div>
    //   ),
    // },

    {
      title: <span className="text-nowrap">Hành động</span>,
      key: 'operation',
      width: 35,
      fixed: 'right',
      render: (record) => (
        <div className="flex space-x-4 justify-center">
          <FaEdit onClick={() => handleOpenModalViewEdit(record._id)} className="text-[20px]" />
          <FaRegTrashAlt onClick={() => handleOpenModalDeleteFood(record)} className="text-[20px]" />
        </div>
      ),
    },
  ];

  // const [sellingPrice, setSellingPrice] = useState<string>("");
  // const handleSetSellingPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\./g, '');
  //   if (/^\d*$/.test(value)) {
  //     setSellingPrice(value);
  //     setValue("revenue", Number(value));
  //   }
  // }

  // const [costPrice, setCostPrice] = useState<string>("");
  // const handleSetCostPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.replace(/\./g, '');
  //   if (/^\d*$/.test(value)) {
  //     setCostPrice(value);
  //     setValue("costPrice", Number(value));
  //   }
  // }

  // UPLOAD IMAGE 
  const [displayImageFood, setDisplayImageFood] = useState<string>()
  const [fileUpload, setFileUpload] = useState<File | undefined | Blob>()
  const hiddenInputFile = useRef<HTMLInputElement | null>(null)

  const handleClickHiddenInputFile = () => {
    hiddenInputFile?.current?.click()
  }
  const handleUploadImage = (file: File) => {
    const foodImage = URL.createObjectURL(file);
    setDisplayImageFood(foodImage);
  };

  const handleUploadToCloud = async () => {
    try {
      const base64 = await convertBase64(fileUpload);
      const res = await apiUploadImage(base64)
      setDisplayImageFood(res.data)

      return res.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.statusText == 'Payload Too Large') {
        toast.error("Hãy chọn ảnh có kích thước nhỏ hơn 800x400px")
      }
      console.log("Error fetchign iamgeUpload", error);
    }
  }

  const onSubmitAddFood: SubmitHandler<IFoodAdd> = async (data) => {
    const costPrice = parseInt(String(data.costPrice).replace(/\./g, ''), 10)
    const revenue = parseInt(String(data.revenue).replace(/\./g, ''), 10)
    if (startEdit) {
      try {
        const picture = await handleUploadToCloud()
        apiUpdateFoodItem(takeFoodItem?._id, {
          categoryId: data.categoryId,
          foodName: data.foodName,
          description: data.description,
          picture: picture,
          costPrice,
          revenue,
          favourite: data.favourite
        })
        setStartEdit(false)
        setReadOnly(true)

      } catch (error) {
        dispatch(setLoadingImage(false))
        if (error instanceof AxiosError && error.response) {
          console.log("Error fetching apiUpdateFoodItem", error);
        } else {
          console.log("Unexpected error", error);
        }
      }
    } else {
      dispatch(setLoadingImage(true))
      try {
        const picture = await handleUploadToCloud()
        await apiAddFoods({
          categoryId: data.categoryId,
          foodName: data.foodName,
          description: data.description,
          picture: picture,
          costPrice,
          revenue,
          favourite: data.favourite,
        })
        dispatch(setLoadingImage(false))
        // setCostPrice("");
        // setSellingPrice("");
        // setValue("costPrice", 0);
        // setValue("revenue", 0);
        setDisplayImageFood("")
        reset()
        toast.success("Thêm món ăn thành công !")
      } catch (error) {
        dispatch(setLoadingImage(false))
        if (error instanceof AxiosError && error.response) {
          console.log("Error fetching apiAddFoods", error);
        } else {
          console.log("Unexpected error", error);
        }
      }
    }

  }

  // const listCategoryForSelectOption = listCategory?.map(item => {
  //   return {
  //     value: item._id,
  //     label: item.categoryName,
  //   }
  // })


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
    // }
    // getAllCategory()
    // if (takeFoodItem) {
    //   setValue("categoryId", takeFoodItem.categoryId._id),
    //     setValue("foodName", takeFoodItem.foodName),
    //     setValue("revenue", takeFoodItem.revenue),
    //     setValue("costPrice", (takeFoodItem.costPrice)),
    //     setValue("description", takeFoodItem.description),
    //     setValue("favourite", takeFoodItem.favourite)
    //   setValue("picture", takeFoodItem.picture)
    //   setCostPrice(takeFoodItem.costPrice.toString());
    //   setSellingPrice(takeFoodItem.revenue.toString());
    //   setDisplayImageFood(takeFoodItem.picture)
    // }
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


  }, [deletedFood, modalFoods, foodItem, setValue, takeFoodItem])

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
              <div className="bg-black text-white rounded-t-xl py-3 px-2 border-2 border-white  text-xl font-bold text-center border-b-2 ">{addFood ? "Chỉnh sửa" : "Xem và chỉnh sửa món ăn"}</div>
              <form className="p-8 space-y-3 border-t-2 border-black">
                <div className="flex flex-col"> 
                  <label id="userName" htmlFor="">Tên NV</label>  
                  <input disabled={readOnly} {...register("userName", { required: true })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên nhân viên" />
                </div>

                <div className="flex flex-col"> 
                  <label id="userName" htmlFor="">SĐT</label>  
                  <input disabled={readOnly} {...register("userName", { required: true })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên nhân viên" />
                </div>

                <div className="flex flex-col"> 
                  <label id="userName" htmlFor="">Địa chỉ</label>  
                  <input disabled={readOnly} {...register("userName", { required: true })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên nhân viên" />
                </div>

                <div className="flex flex-col"> 
                  <label id="userName" htmlFor="">Email</label>  
                  <input disabled={readOnly} {...register("userName", { required: true })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên nhân viên" />
                </div>

                
                <div className="flex flex-col"> 
                  <label id="userName" htmlFor="">Mật khẩu</label>  
                  <input disabled={readOnly} {...register("userName", { required: true })} className={`${errors.userName ? "border-red-500" : "border-black"} ${readOnly ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên nhân viên" />
                </div>

                {/* {readOnly ? "" : <div className="flex flex-col">
                  <Controller
                    name="avatar"
                    control={control}
                    rules={{ required: 'Vui lòng upload ảnh món ăn' }}
                    render={({ field }) => (
                      <>
                        <div
                          className="hover:bg-black hover:text-white p-2 flex justify-center items-center space-x-2 text-center px-4 border-2 border-black cursor-pointer bg-gray-100 font-bold"
                          onClick={() => {
                            handleClickHiddenInputFile();
                          }}
                        >
                          <span>{displayImageFood ? "Thay đổi hình ảnh" : "Upload ảnh món ăn"}</span>
                          <AiFillPicture className="text-2xl" />
                        </div>
                        <input
                          type="file"
                          ref={hiddenInputFile}
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file);
                              setFileUpload(file)
                              handleUploadImage(file);
                            }
                          }}
                        />
                        {errors.picture && (
                          <p className="text-red-500 ">
                            {errors.picture.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>} */}

                {displayImageFood && <div className="w-full h-[300px]">
                  <img src={displayImageFood} className="h-full w-full object-cover" alt="" />
                </div>}
                <div className="flex justify-between pt-4 font-bold space-x-2 ">
                  {addFood && <button type="submit" onClick={handleSubmit(onSubmitAddFood)} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Lưu
                  </button>}
                  {!addFood &&
                    <div>
                      {startEdit ?
                        <div className="flex space-x-2">
                          <button onClick={handleSubmit(onSubmitAddFood)} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Lưu thay đổi</button>
                          <button className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Hủy thay đổi</button>
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
                      settakeFoodItem(null)
                      setStartEdit(false)
                      setModalFoods(!modalFoods)
                      // setValue("costPrice", 0);
                      // setValue("revenue", 0);
                      // setCostPrice("0");
                      // setSellingPrice("0");
                      setDisplayImageFood("")
                      reset()
                    }}
                    className="border-2 py-2 px-6 border-black  text-black rounded-xl hover:bg-red-600 hover:text-white">Đóng</button>
                </div>
              </form>
            </div>
            <div onClick={() => {
              setReadOnly(false)
              settakeFoodItem(null)
              setAddFood(false)
              setModalFoods(!modalFoods)
              // setValue("costPrice", 0);
              // setValue("revenue", 0);
              // setCostPrice("0");
              // setSellingPrice("0");
              setDisplayImageFood("")
              reset()
            }} className="absolute top-2 right-2 p-1 hover:bg-gray-200 hover:bg-opacity-20 rounded-full hover:cursor-pointer">
              <IoClose className=" text-xl text-white" />
            </div>
          </div>
        </div>
      </div >
    }
    {openModalConfirmDeleteFood &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full ">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[30%] bg-white mt-36  flex flex-col border-2 border-black">
            <div className="py-8 px-4" >
              <div className="text-center font-bold text-xl  mb-5">Bạn có chắc muốn xóa món <br></br>"{foodItem?.foodName}"</div>
              <div className="flex justify-between px-10 font-bold">
                <button onClick={() => {
                  setOpenModalConfirmDeleteFood(!openModalConfirmDeleteFood)
                  handleDeleteFood()

                }} className="border-2 py-2 px-6 border-black rounded-2xl hover:bg-red-600 hover:text-white">Xóa</button>
                <button onClick={() => {
                  settakeFoodItem(null)
                  setAddFood(false)
                  setModalFoods(!modalFoods)
                  setValue("costPrice", 0);
                  setValue("revenue", 0);
                  setDisplayImageFood("")
                  reset()
                  setDisplayImageFood("")
                  setOpenModalConfirmDeleteFood(!openModalConfirmDeleteFood)
                }} className="border-2 py-2 px-6 border-black bg-black text-white rounded-2xl">Đóng</button>
              </div>
            </div>
            <div onClick={() => setOpenModalConfirmDeleteFood(!openModalConfirmDeleteFood)} className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full hover:cursor-pointer">
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
