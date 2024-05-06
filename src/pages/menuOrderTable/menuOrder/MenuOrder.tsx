import React, { useEffect, useState } from "react";
import { apiGetCategoryWFood } from "../../../API/api";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { createFoodArr } from "../../../Redux/foodsSlice";
import { useDispatch } from "react-redux";
import { IFood } from "../../../common/type";

interface IMenu {
    categoryName: string,
    food: IFood[]
}
function Menu() {
    const param = useLocation()
    const [menuActive, setMenuActive] = useState<boolean>(false)
    const dispatch = useDispatch();


    const [data, setData] = useState<IMenu[]>()
    useEffect(() => {
        if (param.pathname == "/menuOrderTable") {
            setMenuActive(true)
        }
        apiGetCategoryWFood()
            .then(res => {
                setData(res.data)
            })
    }, [menuActive])
    const handleClick = (id: string) => {
        if (param.pathname !== "/menuOrderTable") {
            dispatch(createFoodArr({ _id: id, quantity: 1 }))
        }
    }
    return <div className=" mt-header mx-4 lg:mx-10">
        <div className="pt-5">
            <div className=" bg-primary border border-black rounded-lg  w-10/11 lg:w-2/3 mx-auto flex items-center justify-center">
                <input className="flex-1 h-10 rounded-l-lg px-4" type="text" placeholder="enter food name" />
                <div className="mx-2"><IoIosSearch style={{ color: "black" }} /></div>
            </div>
        </div>
        {data?.map((category, index) => (
            <div key={index}>
                {category.food.length > 0 &&
                    <div className="pt-10" key={index}>
                        <div className=" font-bold my-5"> {category.categoryName}</div>
                        <div className={`grid grid-cols-2 lg:grid-cols-${menuActive ? '5' : '4'} gap-4 lg:gap-6`}>
                            {category.food.map((food, index) => (
                                <div onClick={() => handleClick(food._id)} key={index} className="w-full flex flex-col h-fit  bg-primary text-white rounded-lg shadow">
                                    <div className="w-full h-24 ">
                                        <img src={food.picture} alt="" className=" rounded-t-lg h-full w-full object-cover" />
                                    </div>
                                    <div className="px-3 py-2">
                                        <div>{food.foodName}</div>
                                        <div>{food.revenue}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>))}
    </div >;
}

export default Menu;
