import { setOpenModalPayment } from "../../../../Redux/foodsSlice";
import { formatCurrency } from "../../../../utils/formartCurrency";
import { IFoodSlice } from "../../../../common/types/foods";
import { MdOutlineReportProblem } from "react-icons/md";
import { ITableHaveOrders } from "../../area/Area";
import { useDispatch } from "react-redux";
interface IFooterOrderBoard {
    handleConfirmOrder: () => void,
    FoodInOrder: ITableHaveOrders | undefined,
    data: IFoodSlice[] | undefined,
    total: number,
    subTotal: number | undefined,
}

const FooterOrderBoard = ({ handleConfirmOrder, FoodInOrder, data, total, subTotal }: IFooterOrderBoard) => {
    const dispatch = useDispatch()
    const totalQuantityFoods = FoodInOrder?.foods.reduce((acc, current) => {
        return acc + current.quantity
    }, 0)

    const totalQuantityNews = data?.reduce((acc, current) => {
        return acc + current.quantity
    }, 0)

    return <div className="h-12 flex items-center justify-between">
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
        {FoodInOrder ? (
            <span onClick={() => {
                dispatch(setOpenModalPayment(true))
            }} className="cursor-pointer bg-primary h-full flex items-center px-2 border-l-2 border-black text-white">
                Thanh Toán {formatCurrency(subTotal)} VND ({totalQuantityFoods})
            </span>
        ) : (
            data && data.length > 0 && (
                <span onClick={() => handleConfirmOrder()} className="cursor-pointer bg-primary h-full flex items-center px-2 border-l-2 border-black text-white">
                    Xác nhận order {total}K ({totalQuantityNews})
                </span>
            )
        )}
    </div>
}

export default FooterOrderBoard;

