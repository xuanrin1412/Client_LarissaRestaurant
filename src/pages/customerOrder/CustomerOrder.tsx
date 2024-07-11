import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { decreaseQuantityCustomer, deleteOneFoodCustomer, increaseQuantityCustomer } from "../../Redux/foodsCustomer";
import { formatCurrency } from "../../utils/formartCurrency";
import { loadStripe } from '@stripe/stripe-js'

export const CustomerOrder = () => {
    const dispatch = useAppDispatch()
    const foodsCustomer = useAppSelector(state => state.foodsCustomer.foodsCustomer)
    const totalOrderCustomer = useAppSelector(state => state.foodsCustomer.totalOrderCustomer)
    const userInfo = useAppSelector(state => state.user.userInfo)


     // payment integration
     const makePayment = async () => {
        const stripe = await loadStripe(
            `pk_test_51O2BltBMGimvwHpfSwNexLpY1K1hgiEgZ4cCzlS4AMAeCPcw48YObxnnZXhJfxhh32OwXZ4bornf3rBEjHAWzNT900ii2eMMHZ`,
        )
        console.log('stripe cart ', stripe)

         const body = {
             products: foodsCustomer,
            userId:userInfo?._id
        }

        const headers = {
            'Content-Type': 'application/json',
        }

        try {
            const response = await fetch(
                'http://localhost:3004/api/create-checkout-session',
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body),
                },
            )

            if (!response.ok) {
                console.error(
                    'Failed to create checkout session:',
                    response.statusText,
                )
                // Handle the error
                return
            }

            const session = await response.json()

            const result = await stripe?.redirectToCheckout({
                sessionId: session.id,
            })

            if (result?.error) {
                console.log(result.error)
                // Handle the error
            }
        } catch (error) {
            console.error('Error:', error)
            // Handle unexpected errors
        }
    }


    return <div className="pt-header">
        <div className="max-w-md sm:max-w-4xl  mx-auto py-8 flex flex-col sm:flex-row sm:space-x-8">
            {/* LEFT */}
            <div className="  sm:w-2/3  ">
                <div className="py-2 text-xl font-bold">
                    Giỏ hàng của tôi
                </div>
                {foodsCustomer.map((data, index) => (
                    <div key={index}>
                        <hr className="border-0 h-[2px] bg-[#D0D0D0] w-full " />
                        {/* ITEMS */}
                        <div className=" my-7  flex justify-between">
                            <div className="flex space-x-5">
                                <div className="h-24 w-24 border">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={data.food.picture}
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <div className="font-bold mb-3">
                                        {data.food.foodName}
                                    </div>
                                    <div> {formatCurrency(data.food.revenue)} VND</div>
                                </div>
                            </div>
                            <div className="flex space-x-6">
                                <span
                                    className=" border border-black  justify-between flex items-center h-[31px]"
                                    style={{ zIndex: 1 }}
                                >
                                    <button
                                        className={`px-3 py-[2px]  ${data.quantity === 1
                                            ? ' bg-gray-100 text-gray-300 '
                                            : ''
                                            } `}
                                        onClick={() => dispatch(decreaseQuantityCustomer({ _id: data.food._id }))}
                                    >
                                        -
                                    </button>
                                    <span>{data.quantity}</span>
                                    <button
                                        className="px-3 py-[2px]"
                                        onClick={() => dispatch(increaseQuantityCustomer({ _id: data.food._id }))}
                                    >
                                        +
                                    </button>
                                </span>
                                <span className="font-bold">
                                    {formatCurrency(data.totalEachFood)} VND
                                </span>
                                <span
                                    onClick={() => dispatch(deleteOneFoodCustomer({ id: data.food._id }))}
                                    className=" cursor-pointer"
                                >
                                    <IoClose className="text-gray-500" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {foodsCustomer.length === 0 && (
                    <div className="h-[400px] w-[600px]">
                        <img
                            className=" object-contain h-full w-full"
                            src="https://www.getillustrations.com/packs/matilda-startup-illustrations/scenes/_1x/shopping,%20e-commerce%20_%20empty,%20shopping%20cart,%20items,%20products,%20zero,%20none_md.png"
                            alt=""
                        />
                    </div>
                )}

                <hr className="border-0 h-[1px] bg-[#D0D0D0] " />
            </div>

            {/* RIGHT */}
            <div className="w-5/6 sm:w-1/3 mx-auto sm:mx-0">
                <div className="py-2 text-xl font-bold">
                    Tóm tắt đơn hàng
                </div>
                <hr className="border-0 h-[2px] bg-[#D0D0D0] " />
                <div className="mt-7 space-y-2">
                    <div className="flex justify-between font-bold">
                        <span>Tổng từng phần</span>
                        <span>{formatCurrency(totalOrderCustomer)} VND</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Tiền Ship</span>
                        {foodsCustomer.length === 0 ? (
                            <span>0 VND</span>
                        ) : (
                            <span>{formatCurrency(50000)}  VND</span>
                        )}
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Discount Ship</span>
                        {foodsCustomer.length === 0 ? (
                            <span>0 VND</span>
                        ) : (
                            <span>-{formatCurrency(50000)} VND</span>
                        )}
                    </div>
                </div>
                <hr className="mt-2 border-0 h-[2px] bg-[#D0D0D0] " />
                <div className="my-3 font-bold text-xl flex justify-between">
                    <span>Tổng</span>
                    <span>{formatCurrency(totalOrderCustomer)} VND</span>
                </div>
                <button
                    onClick={makePayment}
                    className="w-full bg-black text-white py-2 hover:opacity-80"
                >
                    Thanh Toán
                </button>
            </div>
        </div>
    </div>;
};
