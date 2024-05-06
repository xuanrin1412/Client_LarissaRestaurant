import React, { useEffect, useState } from "react";
import MenuOrderTable from "../../menuOrderTable/MenuOrderTable";
import { IoClose } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { MdOutlineReportProblem } from "react-icons/md";
import { IFoodSlice, increaseQuantity } from "../../../Redux/foodsSlice";
import { apiGetFoodInfo } from "../../../API/api";
import { IFood } from "../../../common/type";
function OrderFood() {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { tableName } = location.state
    const userName: string | undefined = useSelector((state: RootState) => state.user.userName);
    const foods: IFoodSlice[] = useSelector((state: RootState) => state.foods.foods);
    const [data, setData] = useState<IFood[]>([])
    const [quantity, setQuantity] = useState<number>(1)
    console.log("data", data.concat());
    useEffect(() => {
        foods.map(item =>
            apiGetFoodInfo(item._id)
                .then(res => {
                    const updateData = [...data]
                    const updatedFood = { ...res.data.getOneFood, quantity: item.quantity }
                    updateData.push(updatedFood)
                    setData(updateData)
                })
        )
    }, [foods])

    const handleIncrease = (id: string) => {
        dispatch(increaseQuantity({ _id: id }))
    }
    // const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuantity(e.target.value)
    // }
    return <div className="flex w-full  ">
        <div className="flex-1"><MenuOrderTable /></div>

        <div className=" w-[400px] mt-header ">
            <div className="relative w-[400px] top-0 left-0 height-order ">
                <div className="absolute top-0 right-0 w-[400px] height-order ">
                    <div className="fixed  border-2 border-black height-order w-[400px]  flex flex-col  justify-end  ">
                        <div className="h-10 flex  items-center justify-between border-b-2 border-black bg-primary text-white">
                            <div className="ml-4">
                                <span>{tableName}</span>
                                <span> - NV: {userName}</span>
                            </div>
                            <span onClick={() => navigate("/order")} title="Close Order" className="h-10 w-10 flex items-center justify-center cursor-pointer hover:border-l-2 hover:border-l-black"><IoClose /></span>
                        </div>
                        <div className="flex-1 overflow-y-scroll">
                            {/* each item */}
                            {data.map((item, index) => (
                                <div key={index} className="flex border-b group border-b-1 items-center min-h-12 ">
                                    <span className="px-3">{index + 1}</span>
                                    <span className="flex-1 max-w-[130px] py-2">{item.foodName}</span>
                                    <div className="flex items-center">
                                        <span onClick={() => handleIncrease(item._id)} className="hover:bg-red-50 h-7 w-7 cursor-pointer flex items-center justify-center">+</span>
                                        <input value={item.quantity} onChange={(e) => setQuantity(e.target.value)} className="h-7 border w-12 flex items-center justify-center px-2" min={1} type="number" />
                                        <span className="hover:bg-red-50 h-7 w-7 cursor-pointer flex items-center justify-center">-</span>
                                    </div>
                                    <span className="pl-5">34362K</span>
                                    <span title="Delete" className="px-3  group-hover:cursor-pointer  invisible group-hover:visible h-12 flex items-center"><IoClose /></span>
                                </div>
                            ))}

                            {/* <div className="p-4">Please add Food !</div> */}
                        </div>
                        <div className="border-y-2  border-black flex justify-start p-2 ">
                            <span className="mr-2">Note:</span>
                            <textarea placeholder="Enter Note..." className=" flex-1 min-h-12 outline-none"></textarea>
                        </div>
                        <div className="h-12 flex items-center justify-between">
                            <span onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()} className="mx-2 px-2 cursor-pointer">
                                <MdOutlineReportProblem />
                            </span>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-lg">Cancel Order ?</h3>
                                    <p className="w-full h-40">
                                        <textarea placeholder="Enter reason cancel order..." className="w-full h-full p-4 border-2"></textarea>
                                    </p>
                                    <div className="mt-5 flex justify-end">
                                        <button className="btn">Confirm</button>
                                    </div>
                                </div>
                            </dialog>

                            <span className=" cursor-pointer bg-primary h-full flex items-center px-2 border-l-2 border-black text-white">Thanh Toán</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    </div>


    // </div>;
}

export default OrderFood;
