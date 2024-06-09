import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { IFoodSlice } from "../../../common/type";
import { apiCreateOrder, apiUpdateFoods } from "../../../API/api";
import FooterOrderBoard from "./child/FooterOrderBoard";
import { useLocation, useNavigate } from "react-router-dom";
import { IFoodsInOrder, ITableHaveOrders } from "../area/Area";
import { UserAccount } from "../../../components/navbar/Navbar";
import MenuOrderTable from "../../menuOrderTable/MenuOrderTable";
import FoodsInOrderBoard from "../orderFood/child/FoodsInOrderBoard"
import { RootState, useAppDispatch, useAppSelector } from "../../../Redux/store";
import { decreaseQuantity, decreaseQuantityOD, deleteFoodArr, increaseQuantity, increaseQuantityOD, setOpenModalConfirm, setfoodsOrder } from "../../../Redux/foodsSlice";

// INTERACE FOR UPDATE 
interface IOrderUpdates {
    updated: Array<IFoodsInOrder & { quantityChange: number; addedQuantity: number; removedQuantity: number }>;
    removed: IFoodsInOrder[];
    added: IFoodsInOrder[];
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
    const total: number = useAppSelector((state: RootState) => state.total);
    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods);
    const openModalConfirm: boolean = useAppSelector((state: RootState) => state.openModalConfirm);
    const FoodInOrder: ITableHaveOrders | undefined = useAppSelector((state: RootState) => state.foodsOrder);

    const oldOrderFoods = test?.foods
    const newOrderFoods = FoodInOrder?.foods
    const orderId = FoodInOrder?.foods.find(item => item.orderId)?.orderId
    console.log("orderId", orderId);

    const totalOrder = FoodInOrder?.subTotal




    const getOrdersFood = (oldOrderFoods: IFoodsInOrder[] | undefined, newOrderFoods?: IFoodsInOrder[] | undefined) => {
        const updates: IOrderUpdates = {
            updated: [],
            removed: [],
            added: [],
        }
        const newOrder = new Map(newOrderFoods?.map((item: IFoodsInOrder) => [item.foodId._id, item]))
        const oldOrder = new Map(oldOrderFoods?.map((item: IFoodsInOrder) => [item.foodId._id, item]))

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

    console.log("===========================================================")

    // USESTATE
    const [data, setData] = useState<IFoodSlice[]>()

    // TAKE OUT USER ACCOUNT
    const userAccountString = localStorage.getItem("larissa_userInfo");
    let userAccount: UserAccount | null = null;
    if (userAccountString) {
        try {
            userAccount = JSON.parse(userAccountString) as UserAccount;
        } catch (error) {
            console.error("Error parsing user account from localStorage", error);
        }
    }

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
        await apiCreateOrder(userAccount?.id, tableId, foodForApi)
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
    console.log("updateOrders remove", updateOrders?.removed.map(item => item.foodId._id));
    const listIdRemoveFoods = updateOrders?.removed.map(item => item.foodId._id)
    console.log("update quan", updateOrders?.updated.map(item => {
        return { foodInfo: item.foodId, quan: item.quantity, totalEachFood: item.totalEachFood }
    }));

    const listUpdateQuanFoods = updateOrders?.updated.map(item => {
        return { foodInfo: item.foodId, quan: item.quantity,totalEachFood:item.totalEachFood }
    })

    // HANDLE UPDATE FOODS
    const handleUpdateFoods = async () => {
    
        await apiUpdateFoods(orderId, listIdRemoveFoods, newOrderFoods,listUpdateQuanFoods,totalOrder)
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
    //



    const [toggleNotiUpdate, setToggleNotiUpdate] = useState<boolean>(false)
    const [showBtnFix, setShowBtnFix] = useState<boolean>(false)

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
    }, [foods, total, navigate, dispatch, takeOrderFromTable, newOrderFoods, oldOrderFoods]);

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
                                _id={item.foodId._id}
                                FoodInOrder={FoodInOrder}
                                foodName={item.foodId.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item.foodId._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item.foodId._id)}
                                itemQuantity={item.quantity}
                                totalEachFood={item.totalEachFood}
                            />
                        ))}</>}
                        {data && <> {data?.map((item, index) => (
                            <FoodsInOrderBoard
                                key={index}
                                keyFoodsInOrderBoard={index}
                                no={index + 1}
                                _id={item.food._id}
                                FoodInOrder={FoodInOrder}
                                foodName={item.food.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item.food._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item.food._id)}
                                itemQuantity={item.quantity}
                                totalEachFood={item.totalEachFood}
                            />
                        ))}</>}


                    </div>
                    {showBtnFix && <button onClick={() => setToggleNotiUpdate(true)} className="bg-primary w-fit text-left text-white py-2 px-4">Update Order !</button>}
                    <div className="border-y-2  border-black flex justify-start p-2 ">
                        <span className="mr-2">Note:</span>
                        <textarea placeholder="Enter Note..." className=" flex-1 min-h-12 outline-none"></textarea>
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
                            console.log("newOrderFoods==================>", newOrderFoods);
                            handleUpdateFoods()

                        }} className="py-2 px-4 border-2 border-black hover:bg-primary hover:text-white">Xác nhận</span>
                        <span onClick={() => {
                            setToggleNotiUpdate(false)
                            dispatch(setfoodsOrder({ foodsOrder: takeOrderFromTable }))

                        }} className="py-2 px-4 border-2  border-black hover:bg-primary hover:text-white">Hủy cập nhật</span>
                    </div>
                </div>
            </div>
        </div>}
        {/* <ToastContainer /> */}

    </div>
}

export default OrderFood;
