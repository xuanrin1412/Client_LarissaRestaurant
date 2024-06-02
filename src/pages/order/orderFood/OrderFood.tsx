import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { ITableHaveOrders } from "../area/Area";
import 'react-toastify/dist/ReactToastify.css';
import { apiCreateOrder } from "../../../API/api";
import { IFoodSlice } from "../../../common/type";
import FooterOrderBoard from "./child/FooterOrderBoard";
import { useLocation, useNavigate } from "react-router-dom";
import MenuOrderTable from "../../menuOrderTable/MenuOrderTable";
import FoodsInOrderBoard from "../orderFood/child/FoodsInOrderBoard"
import { RootState, useAppDispatch, useAppSelector } from "../../../Redux/store";
import { decreaseQuantity, deleteFoodArr, increaseQuantity, setOpenModalConfirm } from "../../../Redux/foodsSlice";

function OrderFood() {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // TAKE DATA FROM ROUTE
    const { tableId } = location.state
    const { tableName } = location.state
    const { takeOrderFromTable } = location.state

    // USESTATE
    const [data, setData] = useState<IFoodSlice[] | undefined>()
    const [dataOrderFoods, setDataOrderFoods] = useState<ITableHaveOrders>()


    // TAKE DATA FROM REDUX
    const total: number = useAppSelector((state: RootState) => state.foods.total);
    const foods: IFoodSlice[] = useAppSelector((state: RootState) => state.foods.foods);
    const userId: string | undefined = useAppSelector((state: RootState) => state.user.userId);
    const userName: string | undefined = useAppSelector((state: RootState) => state.user.userName);
    const openModalConfirm: boolean = useAppSelector((state: RootState) => state.foods.openModalConfirm);

    // TAKE PARTERN FOOD TO PARSE INTO apiCreateOrder
    const foodForApi = foods.map(item => {
        return {
            _id: item.food._id,
            quantity: item.quantity
        };
    });

    // HANDLE INCREASE AND DECREASE QUANTITY
    const handleIncreaseQuantity = (_id: string) => {
        dispatch(increaseQuantity({ _id }))
    }
    const handleDecreaseQuantity = (_id: string) => {
        dispatch(decreaseQuantity({ _id }))
    }

    // HANDLE CONFIRM ORDER
    const handleConfirmOrder = async () => {
        await apiCreateOrder(userId, tableId, foodForApi)
            .then(res => {
                console.log("handleConfirmOrder res", res);
                if (res.status == 200) {
                    dispatch(deleteFoodArr())
                    navigate("/order")
                }
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
        }
    };
    const handleCloseModalConfirm = () => {
        dispatch(setOpenModalConfirm(false))
    }
    //
    useEffect(() => {
        if (takeOrderFromTable) {
            setDataOrderFoods(takeOrderFromTable)
        } else {
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
    }, [foods, total, takeOrderFromTable, navigate, dispatch]);


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
                            <span> - NV: {userName}</span>
                        </div>
                        <span
                            onClick={() => handleCloseBoardOrder()}
                            title="Close Order"
                            className="h-10 w-10 flex items-center justify-center cursor-pointer ">
                            <IoClose className=" text-md hover:text-2xl" />
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-scroll">
                        {dataOrderFoods?.foods.map((item, index) => (
                            <FoodsInOrderBoard
                                key={index}
                                keyFoodsInOrderBoard={index}
                                no={index + 1}
                                _id={item.foodId._id}
                                foodName={item.foodId.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item.foodId._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item.foodId._id)}
                                itemQuantity={item.quantity}
                                totalEachFood={item.totalEachFood}
                            />
                        ))}
                        {data?.map((item, index) => (
                            <FoodsInOrderBoard
                                key={index}
                                keyFoodsInOrderBoard={index}
                                no={index + 1}
                                _id={item.food._id}
                                foodName={item.food.foodName}
                                onClickIncrease={() => handleIncreaseQuantity(item.food._id)}
                                onClickDecrease={() => handleDecreaseQuantity(item.food._id)}
                                itemQuantity={item.quantity}
                                totalEachFood={item.totalEachFood}
                            />
                        ))}
                    </div>
                    <button className="bg-primary w-fit text-left text-white py-2 px-4">Fix</button>
                    <div className="border-y-2  border-black flex justify-start p-2 ">
                        <span className="mr-2">Note:</span>
                        <textarea placeholder="Enter Note..." className=" flex-1 min-h-12 outline-none"></textarea>
                    </div>
                    <FooterOrderBoard
                        handleConfirmOrder={() => handleConfirmOrder()}
                        takeOrderFromTable={takeOrderFromTable}
                        data={data}
                        total={total}
                        subTotal={dataOrderFoods?.subTotal}
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
        {/* <ToastContainer /> */}

    </div>
}

export default OrderFood;
