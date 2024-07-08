import { apiAddFoods, apiDeleteFood, apiGetAllCategory, apiGetAllFoods, apiUploadImage } from "../../../API/api";
import { Button, Input, InputRef, Select, Space, Table, TableColumnType, type TableColumnsType } from 'antd';
import { IdataCategory, IdataFoods, IFoodAdd, IFoods } from "../../../common/types/foods";
import { LoadingImage } from "../../../components/commons/loadingImage";
import { useEffect, useRef, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { formatCurrency } from "../../../utils/formartCurrency";
import { useDispatch } from "react-redux";
import { convertBase64 } from "../../../utils/conversebase";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { setLoadingImage } from "../../../Redux/Image";
import { useAppSelector } from "../../../Redux/store";

type DataIndex = keyof IdataFoods;
export const FoodsManagement = () => {
  const dispatch = useDispatch()
  const [dataFoods, setDataFoods] = useState<IdataFoods[]>()
  const [modalFoods, setModalFoods] = useState<boolean>(false)
  const [listCategory, setListCategory] = useState<IdataCategory[]>()
  const loadingImage: boolean = useAppSelector(state => state.image.loadingImage)
  const listCategoryForSelectOption = listCategory?.map(item => {
    return {
      value: item._id,
      label: item.categoryName,
    }
  })

  const {
    register,
    handleSubmit, control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFoodAdd>(
    {
      criteriaMode: "all",
    }
  )


  const [deletedFood, setDeletedFood] = useState<boolean>(false)
  const [foodItem, setFoodItem] = useState<IFoods>()
  console.log({ foodItem });

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

  const handleOpenModalViewEdit = (Food: IFoods) => {
    setFoodItem(Food)
    setAddFood(false)
    setModalFoods(!modalFoods)
  }

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
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IdataFoods> => ({
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
  const columns: TableColumnsType<IdataFoods> = [
    {
      title: <span className="text-nowrap">No.</span>,
      width: 20,
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: <span className="text-nowrap">Ảnh món ăn</span>,
      dataIndex: 'picture',
      key: 'picture',
      width: 40,
      render: (record) => (
        <div className="flex space-x-4 h-20 w-20">
          <img src={record} alt="" className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      title: <span className="text-nowrap">Tên món ăn</span>,
      dataIndex: 'foodName',
      key: 'foodName',
      width: 45,
      ...getColumnSearchProps('foodName'),
    },
    {
      title: <span className="text-nowrap">Doanh mục</span>,
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 45,
      ...getColumnSearchProps('categoryName'),
    },

    {
      title: <span className="text-nowrap">Giá bán</span>,
      dataIndex: 'revenue',
      key: 'revenue',
      width: 45,
      ...getColumnSearchProps('revenue'),
    },
    {
      title: <span className="text-nowrap">Giá gốc</span>,
      dataIndex: 'costPrice',
      key: 'costPrice',
      width: 45,
      ...getColumnSearchProps('costPrice'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 150,
      render: (record) => (
        <div className="flex ">
          {record}
        </div>
      ),
    },
    {
      title: <span className="text-nowrap">Hành động</span>,
      key: 'operation',
      width: 35,
      fixed: 'right',
      render: (record) => (
        <div className="flex space-x-4 justify-center">
          <FaEdit onClick={() => handleOpenModalViewEdit(record)} className="text-[20px]" />
          <FaRegTrashAlt onClick={() => handleOpenModalDeleteFood(record)} className="text-[20px]" />
        </div>
      ),
    },
  ];

  const [sellingPrice, setSellingPrice] = useState<string>("");
  console.log("sellingPrice==>", Number(sellingPrice));
  const handleSetSellingPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, '');
    if (/^\d*$/.test(value)) {
      setSellingPrice(value);
      setValue("revenue", Number(value));
    }
  }

  const [costPrice, setCostPrice] = useState<string>("");
  console.log("costPrice==>", Number(costPrice));
  const handleSetCostPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, '');
    if (/^\d*$/.test(value)) {
      setCostPrice(value);
      setValue("costPrice", Number(value));
    }
  }


  // UPLOAD IMAGE 
  const [displayImageFood, setDisplayImageFood] = useState<string>()
  const [fileUpload, setFileUpload] = useState<File | undefined | Blob>()
  const hiddenInputFile = useRef<HTMLInputElement | null>(null)

  const handleClickHiddenInputFile = () => {
    hiddenInputFile?.current?.click()
  }
  const handleUploadImage = (file: File) => {
    const foodImage = URL.createObjectURL(file);
    console.log({ foodImage });
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
    dispatch(setLoadingImage(true))
    console.log("costPrice costPrice", data.costPrice)
    const costPrice = parseInt(String(data.costPrice).replace(/\./g, ''), 10)
    const revenue = parseInt(String(data.revenue).replace(/\./g, ''), 10)
    console.log({ costPrice }, { revenue });
    try {
      const picture = await handleUploadToCloud()
      const res = await apiAddFoods({
        categoryId: data.categoryId,
        foodName: data.foodName,
        description: data.description,
        picture: picture,
        costPrice,
        revenue,
        favourite: data.favourite,
      })
      dispatch(setLoadingImage(false))
      console.log("res apiAddFoods", res);
      setValue("costPrice", 0);
      setValue("revenue", 0);
      setDisplayImageFood("")
      reset()
      console.log("reset?", reset());
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

  useEffect(() => {
    const getAllFoods = async () => {
      try {
        const res = await apiGetAllFoods()
        const foods: IFoods[] = res.data.foods
        setDataFoods(foods.map((item, index) => {
          return {
            key: index + 1,
            _id: item._id,
            categoryName: item.categoryId.categoryName,
            foodName: item.foodName,
            description: item.description,
            picture: item.picture,
            costPrice: item.costPrice,
            revenue: item.revenue,
            favourite: item.favourite,
            createdAt: item.createdAt,
          }
        }))
      } catch (error) {
        console.log("Error get all bills", error);
      }
    }
    getAllFoods()
    if (deletedFood) {
      getAllFoods()
      setDeletedFood(false)
    }
    const getAllCategory = async () => {
      try {
        const res = await apiGetAllCategory()
        setListCategory(res.data.getAllCategory)
      } catch (error) {
        console.log("Error get all bills", error);
      }
    }
    getAllCategory()
    if (foodItem) {
      // setValue("categoryId", foodItem.categoryId._id),
      setValue("foodName", foodItem.foodName),
        setValue("revenue", foodItem.revenue),
        setValue("costPrice", foodItem.costPrice),
        setValue("description", foodItem.description),
        setValue("favourite", foodItem.favourite)
      // setValue('categoryId', foodItem.categoryId._id);
      setDisplayImageFood(foodItem.picture)
    }


    if (modalFoods) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [deletedFood, modalFoods, foodItem, setValue])

  return <div className="mt-5 flex-col pr-10">

    <div className="flex justify-end mt-4 mb-8">
      <div className="border-2 border-slate-800 rounded-2xl hover:border-black">
        <button onClick={() => {
          setAddFood(true)
          setModalFoods(!modalFoods)
        }} type="submit" className="flex text-white h-fit bg-slate-800 m-[2px]  font-bold items-center space-x-4 p-2  rounded-xl border-black hover:bg-black hover:text-white  hover:border-black">
          <span className="text-nowrap">Thêm món ăn</span> <FaCirclePlus />
        </button>
      </div>
    </div>
    <Table columns={columns} dataSource={dataFoods} scroll={{ x: 1200, y: 800 }} />
    {modalFoods &&
      <div className="z-50 absolute top-0 left-0 h-screen w-full">
        <div
          className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center pb-5 ">
          <div data-aos="fade-down" className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[40%] bg-white mt-14  flex flex-col border-2 border-black">
            <div className="" >
              <div className="bg-black text-white rounded-t-xl py-3 px-2 border-2 border-white  text-xl font-bold text-center border-b-2 ">{addFood ? "Thêm món ăn" : "Xem và chỉnh sửa món ăn"}</div>
              <form className="p-8 space-y-3 border-t-2 border-black">
                <div className="flex flex-col">
                  <span>Doanh mục</span>
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: 'Hãy chọn doanh mục món ăn !' }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select
                          {...field}
                          showSearch
                          placeholder="Hãy chọn doanh mục"
                          className="styleSelect"
                          style={{ width: "100%", height: "41px" }}
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                          }
                          options={listCategoryForSelectOption}
                          onChange={(value) => field.onChange(value)}
                          onBlur={field.onBlur}
                          value={field.value}
                        />
                        {error && <p className="text-red-500">{error.message}</p>}
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <label id="foodName" htmlFor="">Tên món ăn</label>
                  <input {...register("foodName", { required: true })} className={`${errors.foodName ? "border-red-500" : "border-black"} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập tên món ăn" />
                </div>
                {errors.foodName && <span className="text-red-500">Hãy nhập tên món ăn !</span>}
                <div className="flex flex-col">
                  <label id="description" htmlFor="description">Mô tả</label>
                  <textarea
                    {...register("description", {
                      required: "Hãy nhập mô tả",
                      maxLength: {
                        value: 250,
                        message: "Hãy mô tả nhỏ hơn 300 ký tự"
                      },
                    })}
                    className={`${errors.description ? "border-red-500" : "border-black"} outline-none p-2 border-2 rounded-xl h-[100px] overflow-y-visible`}
                    id="description"
                    placeholder="Nhập mô tả"
                  />
                  {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>
                <div className="flex flex-col">
                  <label id="costPrice" htmlFor="">Giá gốc</label>
                  <input  {...register("costPrice", {
                    minLength: {
                      value: 4,
                      message: "Nhập số tiền lớn hơn"
                    }
                  }
                  )} value={formatCurrency(Number(costPrice))}
                    onChange={handleSetCostPrice} className={`${errors.costPrice ? "border-red-500" : "border-black"} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập giá gốc" />
                </div>
                {errors.costPrice && <span className="text-red-500">Hãy nhập giá gốc !</span>}
                <div className="flex flex-col">
                  <label id="revenue" htmlFor="">Giá bán</label>
                  <input {...register("revenue", {
                    minLength: {
                      value: 4,
                      message: "Nhập số tiền lớn hơn"
                    }
                  }
                  )} value={formatCurrency(Number(sellingPrice))}
                    onChange={handleSetSellingPrice} className={`${errors.revenue ? "border-red-500" : "border-black"} outline-none p-2 border-2  rounded-xl`} type="text" id="foodName" placeholder="Nhập giá bán" />
                </div>
                {errors.revenue && <span className="text-red-500">Hãy nhập giá bán !</span>}
                <div className="flex space-x-4">
                  <label id="favourite" htmlFor="switch">Món đề xuất</label>
                  <Controller
                    name="favourite"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          id="switch"
                          type="checkbox"
                          className="peer sr-only"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                      </label>
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <Controller
                    name="picture"
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
                </div>
                {displayImageFood && <div className="w-full h-[300px]">
                  <img src={displayImageFood} className="h-full w-full object-cover" alt="" />
                </div>}
                <div className="flex justify-between pt-4 font-bold space-x-2 ">
                  {addFood && <button type="submit" onClick={handleSubmit(onSubmitAddFood)} className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white">Thêm món ăn
                  </button>}
                  {!addFood &&
                    <div>
                      {startEdit ?
                        <div className="flex space-x-2">
                          <button className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Lưu thay đổi</button>
                          <button className="border-2 py-2 px-6 border-black rounded-xl hover:bg-red-600 hover:text-white text-nowrap">Hủy thay đổi</button>
                        </div> : <button onClick={() => {
                          setStartEdit(!startEdit)
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
                      setStartEdit(!startEdit)
                      setModalFoods(!modalFoods)
                      setValue("costPrice", 0);
                      setValue("revenue", 0);
                      setDisplayImageFood("")
                      reset()
                      console.log("reset?", reset());
                    }}
                    className="border-2 py-2 px-6 border-black  text-black rounded-xl hover:bg-red-600 hover:text-white">Đóng</button>
                </div>
              </form>
            </div>
            <div onClick={() => {
              setModalFoods(!modalFoods)
              setValue("costPrice", 0);
              setValue("revenue", 0);
              setDisplayImageFood("")
              reset()
              console.log("reset?", reset());
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
                <button onClick={() => setOpenModalConfirmDeleteFood(!openModalConfirmDeleteFood)} className="border-2 py-2 px-6 border-black bg-black text-white rounded-2xl">Đóng</button>
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
