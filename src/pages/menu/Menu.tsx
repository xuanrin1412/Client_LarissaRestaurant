import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";
import { getCategoryWFood } from "../../Redux/foodsSlice";
import { IMenu } from "../../common/type";

function Menu() {
    const dispatch = useAppDispatch();
    const categoryWFood: IMenu[] = useAppSelector((state: RootState) => state.foods.categoryWFood);
    useEffect(() => {
        dispatch(getCategoryWFood())
    }, [dispatch])

    return <div className=" mt-header">
        <div className="banner text-white font-greatVibes text-4xl  mb-5 "> The Tast Of The Food Life</div>
        {categoryWFood.map((category, categoryIndex) => (
            <div key={categoryIndex}>
                {category.food.length > 0 && (
                    <div className="text-xl font-bold text-center mt-10">{category.categoryName}</div>
                )}
                <div className=" w-11/12 mx-auto grid grid-cols-2 flex-wrap">
                    {category.food.map((item, index) => (

                        <div key={index} className={`${index % 2 === 0 ? "border-r-2" : ""} flex items-center px-8 py-5`}>
                            <div className="h-52 w-52">
                                <img
                                    className="h-full w-full object-cover rounded-full"
                                    src={item.picture}
                                    alt={item.foodName}
                                />
                            </div>
                            <div className="flex-1 px-4 space-y-2">
                                <div className="flex justify-between text-xl">
                                    <div>{item.foodName}</div>
                                    {item.revenue && <div>{item.revenue}k</div>}
                                </div>
                                <div className="text-justify">{item.description || "No description available"}</div>
                            </div>
                        </div>

                    ))}</div>
            </div>
        ))}
    </div >
}

export default Menu;
