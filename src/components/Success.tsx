import { Link } from 'react-router-dom'
import React from 'react'
// import axios from 'axios'

export default function SuccessPaymentCustomer() {
    // const hanleDeleteAllProductInCart = async () => {
    //     try {
    //         await axios.delete('http://localhost:8080/product_cart/deleteAll', {
    //             withCredentials: true,
    //         })
    //     } catch (error) {
    //         console.error(
    //             "Error fetch data Can't delete all product in user's cart ",
    //             error,
    //         )
    //     }
    // }

    return (
        <div className=" w-full h-screen flex  items-center justify-center ">
            <div className=" flex flex-col items-center bg-white border-4 border-black p-8 text-center space-y-4">
                <div className="h-[60px] w-[60px] ">
                    <img
                        src="https://static-00.iconduck.com/assets.00/success-icon-512x512-qdg1isa0.png"
                        alt=""
                    />
                </div>
                <div className="text-xl font-medium pb-4">
                    <div>Cảm ơn bạn đã đặt hàng </div>
                    <p>Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận </p>
                </div>
                <Link to={'/'}>
                    <button
                        // onClick={() => hanleDeleteAllProductInCart()}
                        className=" w-full p-2 font-bold bg-black text-white"
                    >
                        Trở về Trang Chủ
                    </button>
                </Link>
            </div>
        </div>
    )
}
