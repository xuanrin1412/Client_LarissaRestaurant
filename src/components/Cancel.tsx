import { Link } from 'react-router-dom'

export default function CancelPaymentCustomer() {
    return (
        <div className=" w-full h-screen flex  items-center justify-center ">
            <div className=" flex flex-col items-center bg-white border-4 border-black p-8 text-center space-y-4">
                <div className="h-[60px] w-[60px] ">
                    <img
                        src="https://cdn2.iconfinder.com/data/icons/color-svg-vector-icons-part-2/512/erase_delete_remove_wipe_out-512.png"
                        alt=""
                    />
                </div>
                <div className="text-xl font-medium pb-4">
                    <div>Đặt hàng không thành công </div>
                </div>
                <Link to={'/'}>
                    <button className=" w-full p-2 font-bold bg-black text-white">
                        Trở về Trang Chủ
                    </button>
                </Link>
            </div>
        </div>
    )
}
