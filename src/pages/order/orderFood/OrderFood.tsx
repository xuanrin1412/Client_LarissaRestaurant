import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleDown, FaRegEdit } from "react-icons/fa";
import FooterOrderBoard from "./child/FooterOrderBoard";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IFoodsInOrder, ITableHaveOrders } from "../area/Area";
import { formatCurrency } from "../../../utils/formartCurrency";
import MenuOrderTable from "../../menuOrderTable/MenuOrderTable";
import FoodsInOrderBoard from "../orderFood/child/FoodsInOrderBoard"
import { RootState, useAppDispatch, useAppSelector } from "../../../Redux/store";
import { apiCreateBill, apiCreateOrder, apiMomoPayment, apiUpdateFoods, apiUpdateNote } from "../../../API/api";
import { closeOrder, decreaseQuantity, decreaseQuantityOD, deleteFoodArr, increaseQuantity, increaseQuantityOD, setOpenModalConfirm, setOpenModalPayment, setfoodsOrder } from "../../../Redux/foodsSlice";
import dayjs from 'dayjs'
import { IUserInfo } from "../../../common/types/userInfo";
import { IFoodSlice } from "../../../common/types/foods";

// INTERACE FOR UPDATE 
interface IOrderUpdates {
    updated: Array<IFoodsInOrder & { quantityChange: number; addedQuantity: number; removedQuantity: number }>;
    removed: IFoodsInOrder[];
    added: IFoodsInOrder[];
}

interface IMomoData {
    amount: number,
    deeplink: string,
    message: string,
    orderId: string,
    partnerCode: string,
    payUrl: string,
    qrCodeUrl: string,
    requestId: string,
    responseTime: number,
    resultCode: number,
}

function OrderFood() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // TAKE DATA FROM ROUTE
    const { tableId } = location.state
    const { tableName } = location.state
    const { takeOrderFromTable } = location.state

    const [test, setTest] = useState<ITableHaveOrders | undefined>(takeOrderFromTable)



    // TAKE DATA FROM REDUX
    const total: number = useAppSelector((state: RootState) => state.foods.total);
    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods.foods);
    const openModalConfirm: boolean = useAppSelector((state: RootState) => state.foods.openModalConfirm);
    const openModalPayment: boolean = useAppSelector((state: RootState) => state.foods.openModalPayment);
    const FoodInOrder: ITableHaveOrders | undefined = useAppSelector((state: RootState) => state.foods.foodsOrder);
    console.log("FoodInOrder-1", FoodInOrder);


    const [note, setNote] = useState<string | undefined>(FoodInOrder ? FoodInOrder.note : "")
    const [editNote, setEditNote] = useState<boolean>(FoodInOrder ? false : true)
    console.log({ editNote });

    const handleChangeNote = (value: SetStateAction<string | undefined>) => {
        setNote(value)
    }


    const oldOrderFoods = test?.foods
    const newOrderFoods = FoodInOrder?.foods
    const orderId = FoodInOrder?.foods.find(item => item.orderId)?.orderId
    const totalOrder = FoodInOrder?.subTotal

    const getOrdersFood = (oldOrderFoods: IFoodsInOrder[] | undefined, newOrderFoods?: IFoodsInOrder[] | undefined) => {
        const updates: IOrderUpdates = {
            updated: [],
            removed: [],
            added: [],
        }
        const newOrder = new Map(newOrderFoods?.map((item: IFoodsInOrder) => [item?.foodId?._id, item]))
        const oldOrder = new Map(oldOrderFoods?.map((item: IFoodsInOrder) => [item?.foodId?._id, item]))

        const allIds = new Set([...oldOrder.keys(), ...newOrder.keys()])
        allIds.forEach((item) => {
            const oldItem = oldOrder.get(item)
            const newItem = newOrder.get(item)
            if (!oldItem && newItem) {
                // Món mới được thêm vào
                updates.added.push(newItem);
            } else if (oldItem && !newItem) {
                // Món bị xóa hoàn toàn
                updates.removed.push(oldItem);
            } else if (oldItem && newItem && oldItem.quantity !== newItem.quantity) {
                // Món đã tồn tại nhưng số lượng thay đổi
                const quantityDifference = newItem.quantity - oldItem.quantity;
                updates.updated.push({
                    ...newItem,
                    quantityChange: quantityDifference,
                    addedQuantity: quantityDifference > 0 ? quantityDifference : 0,
                    removedQuantity: quantityDifference < 0 ? -quantityDifference : 0,
                });
            }
        });
        return updates;
    }

    // USESTATE
    const [data, setData] = useState<IFoodSlice[]>()

    // TAKE OUT USER ACCOUNT
    const userAccount: IUserInfo | null = useAppSelector(state => state.user.userInfo)
    // TAKE PARTERN FOOD TO PARSE INTO apiCreateOrder
    const foodForApi = foods.map(item => {
        return {
            _id: item.food._id,
            quantity: item.quantity
        };
    });

    // HANDLE INCREASE AND DECREASE QUANTITY
    const handleIncreaseQuantity = (_id: string) => {
        if (FoodInOrder) {
            dispatch(increaseQuantityOD({ _id }))
        } else {
            dispatch(increaseQuantity({ _id }))
        }
    }
    const handleDecreaseQuantity = (_id: string) => {
        if (FoodInOrder) {
            dispatch(decreaseQuantityOD({ _id }))
        } else {
            dispatch(decreaseQuantity({ _id }))
        }
    }

    // HANDLE CONFIRM ORDER
    const handleConfirmOrder = async () => {
        await apiCreateOrder({ userId: userAccount?._id, note: note, tableId: tableId, foods: foodForApi })
            .then(res => {
                if (res.status == 200) {
                    dispatch(deleteFoodArr())
                    navigate("/order")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const [updateOrders, setUpdateOrders] = useState<IOrderUpdates>()
    const listIdRemoveFoods = updateOrders?.removed.map(item => item.foodId._id)

    const listUpdateQuanFoods = updateOrders?.updated.map(item => {
        return { foodInfo: item.foodId, quan: item.quantity, totalEachFood: item.totalEachFood }
    })

    // HANDLE UPDATE FOODS
    const handleUpdateFoods = async () => {
        await apiUpdateFoods(
            {
                id: orderId,
                listIdRemoveFoods: listIdRemoveFoods,
                newOrderFoods: newOrderFoods,
                listUpdateQuanFoods: listUpdateQuanFoods,
                totalOrder: totalOrder
            })
            .then(res => {
                console.log("res apiUpdateFoods  ", res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // HANDLE NOTE
    const handleUpdateNote = async () => {
        await apiUpdateNote(
            {
                id: orderId,
                note: note,
            })
            .then(res => {
                console.log("res apiUpdateFoods  ", res);
            })
            .catch(error => {
                console.log(error);
            })
    }


    // HANDLE CLOSE BOARD ORDER
    const handleCloseBoardOrder = () => {
        if (foods.length > 0) {
            dispatch(setOpenModalConfirm(true))
        } else {
            navigate("/order");
            dispatch(deleteFoodArr());
            dispatch(setfoodsOrder({ foodsOrder: undefined }))
        }
    };

    const handleCloseModalConfirm = () => {
        dispatch(setOpenModalConfirm(false))
    }

    const handleCloseModalPayment = () => {
        dispatch(setOpenModalPayment(false))
    }
    const [toggleNotiUpdate, setToggleNotiUpdate] = useState<boolean>(false)
    const [showBtnFix, setShowBtnFix] = useState<boolean>(false)

    // PAYMENT METHOD
    const paymentMethods = [
        {
            value: "cash", label: "Tiền mặt"
        },
        {
            value: "momo", label: "Chuyển khoản MoMo"
        },
        {
            value: "bank", label: "Chuyển khoản ngân hàng"
        },
    ]
    const [chooseSelect, setChooseSelect] = useState<{ value: string, label: string } | undefined>(paymentMethods[0])
    console.log("chooseSelect", chooseSelect?.value);
    const [openOptions, setOpenOptions] = useState<boolean>(false)
    console.log("openOptions", openOptions);
    const [changeToReturn, setChangeToReturn] = useState<number | undefined>()
    const [customerPayment, setCustomerPayment] = useState<string>("");
    console.log("customerPayment==>", Number(customerPayment));
    const handleSetCustomerPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\./g, '');
        if (/^\d*$/.test(value)) {
            setCustomerPayment(value);
        }
    }
    const handlePayment = async () => {
        await apiCreateBill({ orderId, paymentMethod: chooseSelect?.value })
            .then((res) => {
                console.log("res handlePayment", res);
                navigate("/order")
                dispatch(closeOrder())
            })
            .catch(err => {
                console.log(err);
            })
    }

    const [momoPaymentData, setMomoPaymentData] = useState<IMomoData>()
    console.log("momoPaymentData", momoPaymentData);


    useEffect(() => {
        const handleUpdate = () => {
            const updates = getOrdersFood(oldOrderFoods, newOrderFoods)
            const updateDetails = {
                added: updates.added,
                removed: updates.removed,
                updated: updates.updated
            };
            setUpdateOrders(updateDetails)
            if (updateDetails?.added.length !== 0 || updateDetails?.removed.length !== 0 || updateDetails?.updated.length !== 0) {
                setShowBtnFix(true)
            } else if (updateDetails?.added.length === 0 && updateDetails?.removed.length === 0 && updateDetails?.updated.length === 0) {
                setShowBtnFix(false)
            }
        }
        handleUpdate()

        if (takeOrderFromTable) {
            setTest(takeOrderFromTable)
        }
        if (foods) {
            setData(foods)
        }

        // MOMO PAYMENT
        const momoPayment = async () => {
            localStorage.setItem("orderId-momo", JSON.stringify(orderId))
            try {
                const res = await apiMomoPayment({ orderId, amount: FoodInOrder?.subTotal })
                setMomoPaymentData(res.data.getPayment)
                window.location.href = res.data.getPayment.payUrl;
            } catch (error) {
                console.log("Error fetching apiMomoPayment", error);
            }
        }
        if (chooseSelect?.value == "momo") {
            momoPayment()
        }

        // HANDLE BACK BUTTON ON BROWSER 
        const handlePopstate = () => {
            if (foods.length > 0) {
                dispatch(setOpenModalConfirm(true))
                // window.history.pushState(null, "", "/order");
            } else {
                navigate("/order");
                dispatch(deleteFoodArr());
            }
        };
        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, [foods, total, navigate, dispatch, takeOrderFromTable, newOrderFoods, oldOrderFoods, chooseSelect]);

    useEffect(() => {
        const handleCalculate = () => {
            if (FoodInOrder?.subTotal) {
                const change = Number(customerPayment) - FoodInOrder?.subTotal
                console.log("change", change);
                setChangeToReturn(change)

            }
        }
        handleCalculate()

        if (openModalPayment) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        const handleCloseOptionsPayment = () => {
            setOpenOptions(false)
        }
        document.addEventListener("click", handleCloseOptionsPayment)

        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener("click", handleCloseOptionsPayment)
        };

    }, [openModalPayment, FoodInOrder?.subTotal, customerPayment]);


    return <div className="relative flex w-full  ">
        <div className="flex-1">
            <MenuOrderTable />
        </div>
        <div className=" w-[400px] mt-header ">
            <div className="relative top-0 right-0 w-[400px] height-order ">
                <div className="fixed  border-x-2 border-black height-order w-[400px]  flex flex-col  justify-end  ">
                    <div className="h-10 flex  items-center justify-between border-b-2 border-black bg-primary text-white">
                        <div className="ml-4">
                            <span>{tableName}</span>
                            <span> - NV: {FoodInOrder?.userId.userName ? FoodInOrder?.userId.userName : userAccount?.userName}</span>
                        </div>
                        <span
                            onClick={() => handleCloseBoardOrder()}
                            title="Close Order"
                            className="h-10 w-10 flex items-center justify-center cursor-pointer ">
                            <IoClose className=" text-md hover:text-2xl" />
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-scroll">
                        {FoodInOrder && <>{FoodInOrder?.foods?.map((item, index) => (
                            <FoodsInOrderBoard
                                key={index}
                                keyFoodsInOrderBoard={index}
                                no={index + 1}
                                _id={item?.foodId?._id}
                                FoodInOrder={FoodInOrder}
                                foodName={item?.foodId?.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item?.foodId?._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item?.foodId?._id)}
                                itemQuantity={item?.quantity}
                                totalEachFood={item?.totalEachFood}
                            />
                        ))}</>}
                        {data && <> {data?.map((item, index) => (
                            <FoodsInOrderBoard
                                key={index}
                                keyFoodsInOrderBoard={index}
                                no={index + 1}
                                _id={item?.food?._id}
                                FoodInOrder={FoodInOrder}
                                foodName={item?.food?.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item?.food?._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item?.food?._id)}
                                itemQuantity={item?.quantity}
                                totalEachFood={item?.totalEachFood}
                            />
                        ))}</>}
                    </div>
                    {showBtnFix && <button onClick={() => setToggleNotiUpdate(true)} className="bg-primary w-fit text-left text-white py-2 px-4">Update Order !</button>}
                    <div className="border-y-2  border-black flex justify-start p-2  ">
                        <span className="mr-2">Note:</span>
                        <div className="relative min-h-12 w-full">
                            <textarea disabled={editNote ? false : true} value={note} onChange={(e) => handleChangeNote(e.target.value)} placeholder="Enter Note..." className={` ${!editNote ? 'bg-gray-100 cursor-not-allowed' : ''} absolute top-0 left-0 w-[90%] px-2 h-full flex-1 min-h-12 outline-none`}></textarea>
                            {FoodInOrder && (
                                editNote ? <div onClick={() => {
                                    setEditNote(!editNote)
                                    handleUpdateNote()
                                }} className="cursor-pointer absolute top-0 right-0 p-1 bg-primary text-[12px] text-white">Save</div> :
                                    <FaRegEdit onClick={() => setEditNote(!editNote)} className="cursor-pointer absolute top-0 right-0" />
                            )}
                        </div>
                    </div>
                    <FooterOrderBoard
                        handleConfirmOrder={() => handleConfirmOrder()}
                        FoodInOrder={FoodInOrder}
                        data={data}
                        total={total}
                        subTotal={FoodInOrder ? FoodInOrder.subTotal : total}
                    />
                </div>
            </div>
        </div>

        {openModalConfirm && <div className=" z-50 absolute top-0 left-0 h-screen w-full ">
            <div
                className=" fixed h-full w-full bg-black bg-opacity-50 flex items-center justify-center ">
                <div data-aos="fade-down" className=" relative max-w-80 min-w-72 bg-white p-8 flex flex-col border-2 border-black">
                    <div
                        onClick={() => {
                            handleCloseModalConfirm()
                        }}
                        className=" absolute top-2 right-2 p-1 hover:bg-gray-200"><IoClose style={{ height: 20, width: 20 }} /></div>
                    <h1 className="text-center mb-5 text-[19px] font-bold">Are you sure you want to cancel all food in order?</h1>
                    <div className="flex w-full justify-between">
                        <span onClick={() => {
                            // navigate("/order");
                            dispatch(deleteFoodArr());
                            dispatch(setOpenModalConfirm(false))
                        }} className="py-2 px-4 border-2 border-black hover:bg-primary hover:text-white">Yes !!!</span>
                        <span onClick={() => {
                            handleCloseModalConfirm()
                        }} className="py-2 px-4 border-2  border-black hover:bg-primary hover:text-white">No</span>
                    </div>
                </div>
            </div>
        </div>}

        {toggleNotiUpdate && <div className=" z-50 absolute top-0 left-0 h-screen w-full ">
            <div
                className=" fixed h-full w-full bg-black bg-opacity-50 flex items-center justify-center ">
                <div data-aos="fade-down" className=" relative max-w-80 min-w-80 bg-white p-8 flex flex-col border-2 border-black">
                    <div
                        onClick={() => {
                            setToggleNotiUpdate(false)
                        }}
                        className=" absolute top-2 right-2 p-1 hover:bg-gray-200"><IoClose style={{ height: 20, width: 20 }} /></div>
                    <div className="font-bold text-xl mb-2">Xác nhận cập nhật Order </div>
                    <div>
                        {/* Thêm món mới */}
                        {updateOrders?.added.length !== 0 &&
                            <div className="mb-4">
                                <div className="font-bold">Thêm món mới</div>
                                {updateOrders?.added.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <div>{item.foodId.foodName}</div>
                                        {item.quantity > 0 ? <div> +{item.quantity}</div> : ""}
                                    </div>
                                ))}
                            </div>
                        }
                        {/* Chỉnh số lượng */}
                        {updateOrders?.updated.length !== 0 &&
                            <div className="mb-4">
                                <div className="font-bold">Chỉnh số lượng</div>
                                {updateOrders?.updated.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <div>{item.foodId.foodName}</div>
                                        {item.addedQuantity > 0 ? <div>+{item.addedQuantity}</div> : ""}
                                        {item.removedQuantity > 0 ? <div>-{item.removedQuantity}</div> : ""}
                                    </div>
                                ))}
                            </div>
                        }
                        {/* Remove */}
                        {updateOrders?.removed.length !== 0 &&
                            <div className="mb-4">
                                <div className="font-bold">Hủy món</div>
                                {updateOrders?.removed.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <div>{item.foodId.foodName}</div>
                                        <div>-{item.quantity}</div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <div className="flex w-full justify-between">
                        <span onClick={() => {
                            // navigate("/order");
                            // dispatch(deleteFoodArr());
                            handleUpdateFoods()
                            setToggleNotiUpdate(false)
                            setShowBtnFix(false)

                        }} className="py-2 px-4 border-2 border-black hover:bg-primary hover:text-white">Xác nhận</span>
                        <span onClick={() => {
                            setToggleNotiUpdate(false)
                            dispatch(setfoodsOrder({ foodsOrder: takeOrderFromTable }))

                        }} className="py-2 px-4 border-2  border-black hover:bg-primary hover:text-white">Hủy cập nhật</span>
                    </div>
                </div>
            </div>
        </div>}

        {/* PAYMENT */}
        {openModalPayment && <div className=" z-50 absolute top-0 left-0 h-screen w-full ">
            <div
                className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
                <div data-aos="fade-down" className=" relative h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[45%] bg-white mt-14 p-8   flex flex-col border-2 border-black">
                    <div
                        onClick={() => {
                            handleCloseModalPayment()
                        }}
                        className=" absolute top-2 right-2 p-1 hover:bg-gray-200"><IoClose style={{ height: 20, width: 20 }} />
                    </div>
                    <div className="">
                        <div className="text-center mb-5  font-bold text-xl">Hóa đơn</div>

                        <div className="flex justify-between mb-4">
                            <div className="">
                                <div className="space-x-2 ">
                                    <span className="font-bold">Nhân viên:</span>
                                    <span>{FoodInOrder?.userId.userName}</span>
                                </div>
                                <div className="space-x-2">
                                    <span className="font-bold">Order lúc:</span>
                                    <span>{dayjs(FoodInOrder?.createdAt).format('h:mm A  DD/MM/YYYY ')}</span>
                                </div>
                            </div>
                            <div >
                                <div className="space-x-2">
                                    <span className="font-bold">Bàn:</span>
                                    <span>{tableName}</span>
                                </div>


                            </div>
                        </div>

                        <table className="table-auto  w-full">
                            <thead className="" >
                                <tr className="  border-y-2 border-dashed border-gray-400 ">
                                    <th className="py-1">No</th>
                                    <th className="px-4 text-center">Món ăn</th>
                                    <th className="px-4 text-center">SL</th>
                                    <th className="text-right">Đơn giá</th>
                                    <th className=" text-right">Tổng Tiền</th>
                                </tr>
                            </thead>
                            <tbody className="border-b-2  border-dashed border-gray-400">
                                {FoodInOrder?.foods.map((item, index) => (
                                    <tr className=" ">
                                        <td className="py-1">{index + 1}</td>
                                        <td className="px-2">{item.foodId.foodName}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-right">{formatCurrency(item.foodId.revenue)}</td>
                                        <td className="text-right">{formatCurrency(item.foodId.revenue * item.quantity)}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-between">
                            <span className="font-bold text-xl">Thành tiền</span>
                            <span className="text-xl font-bold">{formatCurrency(FoodInOrder?.subTotal)}K</span>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <div className="flex text-nowrap flex-1">Phương thức thanh toán  </div>
                        <div className="relative w-[50%]">
                            {/* choose Options */}
                            <div onClick={(e) => {
                                e.stopPropagation()
                                setOpenOptions(!openOptions)
                            }} className={`${chooseSelect ? "text-primary" : ""} relative top-0 left-0 w-full px-2 py-1  border-2 rounded-xl flex items-center`}>
                                <span className="flex-1">{chooseSelect?.label}</span>
                                <div className={` ${openOptions ? "transform rotate-180  duration-150" : "transform rotate-0  duration-150"}`}>
                                    <FaAngleDown />
                                </div>
                            </div>
                            {/* Options */}
                            {openOptions &&
                                <div className="flex flex-col absolute top-10 left-0 h-full w-full bg-white rounded-xl">
                                    {paymentMethods.map((item, index) => (
                                        <span onClick={() => setChooseSelect(item)} className="hover:bg-gray-200 bg-white py-1 px-2 border first:rounded-t-xl last:rounded-b-xl " key={index}>{item.label}</span>
                                    ))}
                                </div>}
                        </div>
                    </div>
                    <div className="mt-4 flex">
                        <span className="flex-1">Nhận tiền của khách</span>
                        <input value={formatCurrency(Number(customerPayment))} onChange={(e) => handleSetCustomerPayment(e)} type="text" className="px-2 py-1 border w-[50%] text-right " />
                    </div>
                    <div className="mt-4 flex">
                        <span className="flex-1">Tiền thừa</span>
                        <input value={formatCurrency(changeToReturn)} type="text" className="px-2 py-1 border w-[50%] text-right " />
                    </div>
                    <div className="mt-10 flex justify-end space-x-4">
                        <button onClick={() => {
                            handlePayment()
                            handleCloseModalPayment()

                        }} className="p-2 border-2 border-black hover:bg-primary hover:text-white">Xác nhận thanh toán </button>
                        <button onClick={() => {
                            handleCloseModalPayment()
                        }} className="p-2 border-2 border-black hover:bg-primary hover:text-white">Đóng</button>
                    </div>
                    {/* <div className="flex w-full justify-between">
                        <span onClick={() => {
                            // navigate("/order");
                            // dispatch(deleteFoodArr());
                            // dispatch(setOpenModalConfirm(false))
                        }} className="py-2 px-4 border-2 border-black hover:bg-primary hover:text-white">Yes !!!</span>
                        <span onClick={() => {
                            // handleCloseModalConfirm()
                        }} className="py-2 px-4 border-2  border-black hover:bg-primary hover:text-white">No</span>
                    </div> */}
                </div>
            </div>
        </div>
        }
        {/* <ToastContainer /> */}
    </div >
}

export default OrderFood;
