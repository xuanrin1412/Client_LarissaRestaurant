import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";

import {  ITableHaveOrders } from "../order/area/Area";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";
import { addFoodInFoodsOrder, createFoodArr, getCategoryWFood } from "../../Redux/foodsSlice";
import { formatCurrency } from "../../utils/formartCurrency";
import { IMenu } from "../../common/types/menu";
import { IFood } from "../../common/types/foods";

function MenuOrderTable() {
    const param = useLocation()
    const dispatch = useAppDispatch();
    // const location = useLocation()
    // const { takeOrderFromTable } = location.state
    // console.log("=====",takeOrderFromTable);
    
    const [menuActive, setMenuActive] = useState<boolean>(false)
    const categoryWFood: IMenu[] = useAppSelector((state: RootState) => state.foods.categoryWFood);
    console.log("categoryWFood order",categoryWFood);
    


    const FoodInOrder: ITableHaveOrders|undefined  = useAppSelector((state: RootState) => state.foods.foodsOrder);
    // console.log("=============take data OrderFoods in Redux  menu=========",FoodInOrder);
    const takeOrderID = FoodInOrder?.foods?.find(item=>item.orderId)?.orderId
    // console.log("testtttt",takeOrderID);
    
    
    const handleClick = (food: IFood) => {
        if (param.pathname !== "/menuOrderTable" && !takeOrderID) {
            console.log("-------add food to New order---------");
            return dispatch(createFoodArr({ food, quantity: 1 }))
        }
        if(FoodInOrder && takeOrderID){
            console.log("-------add food to Old order---------");
           return dispatch(addFoodInFoodsOrder({foodId:food, orderId:takeOrderID,quantity:1}))
        }
    }
    useEffect(() => {
        if (param.pathname == "/menuOrderTable") {
            setMenuActive(true)
        }
        dispatch(getCategoryWFood())
    }, [dispatch, menuActive, param.pathname])

    return <div className=" my-header mx-4 lg:mx-10">
        <div className="pt-5">
            <div className=" bg-primary border border-black rounded-lg  w-10/11 lg:w-2/3 mx-auto flex items-center justify-center">
                <input className="flex-1 h-10 rounded-l-lg px-4" type="text" placeholder="enter food name" />
                <div className="mx-2"><IoIosSearch style={{ color: "black" }} /></div>
            </div>
        </div>
        {categoryWFood?.map((category, index) => (
            <div key={index}>
                {category.food.length > 0 &&
                    <div className="pt-10" key={index}>
                        <div className=" font-bold my-5"> {category.categoryName}</div>
                        <div className={`grid ${menuActive ? "lg:grid-cols-4" : "lg:grid-cols-5"} gap-4 lg:gap-6`}>
                            {category.food.map((food, index) => (
                                <div onClick={() => handleClick(food)} key={index} className="w-full flex flex-col h-fit  bg-primary text-white rounded-lg shadow">
                                    <div className="w-full h-24 ">
                                        <img src={food.picture} alt="" className=" rounded-t-lg h-full w-full object-cover" />
                                    </div>
                                    <div className="px-3 py-2">
                                        <div>{food.foodName}</div>
                                        <div>{formatCurrency(food.revenue)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>))}
    </div >;
}
export default MenuOrderTable;
