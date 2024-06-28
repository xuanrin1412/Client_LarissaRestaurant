import Money from "../../../assets/money.png"
import Profits from "../../../assets/profits.png"
import bestSeller from "../../../assets/bestSeller.png"
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { apiGetAllBill, apiGetBestSellingFoods, apiGetOneBill } from "../../../API/api";
import { FaEye } from "react-icons/fa";
import { IFoodsInOrder, ITable, IUserInfo } from "../../order/area/Area";
import dayjs from 'dayjs'
import { formatCurrency } from "../../../utils/formartCurrency";
import { IoClose } from "react-icons/io5";

interface DataType {
    _id: string
    userName: string;
    createAt: string;
    table: string;
    total: string;

}




interface IdataBills {
    _id: string,
    paymentMethod: string,
    orderId: {
        createdAt: string,
        note: string,
        statusPayment: string,
        subTotal: number,
        tableId: ITable,
        updatedAt: string,
        userId: IUserInfo
        _id: string,
    },
    foodOrderDetail: {
        orderId: {
            createdAt: string
            note: string
            statusPayment: string
            subTotal: number
            tableId: ITable,
            userId: IUserInfo
            _id: string
        }
    },
    profit: number
}
export const Sales = () => {
    const [dataBills, seDataBills] = useState<IdataBills[]>()
    console.log("dataBills", dataBills);
    const totalProfit = dataBills?.reduce((acc, curent) => {
        return acc + curent.profit
    }, 0)
    const totalRevenue = dataBills?.reduce((acc, current) => {
        return acc + current.orderId.subTotal
    }, 0)

    const dataDisplayInTable = dataBills?.map(item => {
        return {
            _id: item._id,
            userName: item?.foodOrderDetail?.orderId?.userId?.userName,
            createAt: item.orderId ? dayjs(item.orderId.createdAt).format('DD/MM/YYYY h:mm A ') : '',
            table: item?.foodOrderDetail?.orderId?.tableId?.tableName,
            total: formatCurrency(item.orderId ? item.orderId.subTotal : 0) + "VNĐ",
        };
    });

    interface IbestSellingFoods {
        totalSold: number,
        foodId: string,
        foodName: string,
        picture: string
    }

    interface IBillDetails {
        foods: IFoodsInOrder[]
        getOneBill: {
            orderId: {
                _id: string,
                createdAt: string,
                userId: IUserInfo,
                tableId: ITable,
                subTotal: number | undefined,
                status: string,
                foods: IFoodsInOrder[],
                note?: string | undefined
            }
            paymentMethod: string;
            profit: number
        }
    }

    const [bestSellingFoods, setBestSellingFoods] = useState<IbestSellingFoods[] | undefined>()

    const [modalViewBill, setModalViewBill] = useState(false)
    const [billDetail, setBillDetail] = useState<IBillDetails>()
    console.log("billDetail", billDetail);


    const handleViewBill = useCallback((billId: string) => {
        setModalViewBill(!modalViewBill)
        apiGetOneBill(billId)
            .then(res => {
                console.log(res.data.getOneBill);
                setBillDetail(res.data.getOneBill)
            })
            .catch(error => {
                console.log("Error fetching apiGetOneBill", error);
            })
    }, [modalViewBill]);

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Id Hóa đơn',
            width: 50,
            dataIndex: '_id',
            key: '_id',
            // fixed: 'left',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'userName',
            key: 'userName',
            width: 30,
        },
        {
            title: 'Ngày',
            dataIndex: 'createAt',
            key: 'createAt',
            width: 50,
        },

        {
            title: 'Bàn',
            dataIndex: 'table',
            key: 'table',
            width: 50,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            width: 50,
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 25,
            render: (text, record) => (
                <div>
                    <span onClick={() => handleViewBill(record._id)} className="text-sm underline cursor-pointer"><FaEye className="text-2xl" /></span>
                </div>
            ),
        },
    ];

    useEffect(() => {
        apiGetAllBill()
            .then((res) => {
                seDataBills(res.data.getAllBills)
            })
            .catch((err) => {
                console.log("Error get all bills", err);
            })

        apiGetBestSellingFoods()
            .then((res) => {
                console.log("troi");

                setBestSellingFoods(res.data.bestSellingDishes)
                console.log("apiGetBestSellerFoods", res);
            })
            .catch((err) => {
                console.log("Error get bestselles Foods", err);
            })
    }, [])

    return <div className="mt-5 flex-col pr-10">
        <div className="grid grid-cols-4 gap-5 justify-between  mb-10">
            <div className="text-red-500 h-24 border-2 border-red-500  rounded-3xl flex flex-col items-center justify-center">
                <div className="text-xl flex">
                    <div className="flex flex-col">
                        <span className=" font-bold text-nowrap">{formatCurrency(totalRevenue)}VNĐ</span>
                        <span>Doanh Thu</span>
                    </div>
                    <img className=" w-12 h-12 object-cover " src={Money} alt="" />
                </div>
            </div>
            <div className="text-red-500 h-24 border-2 border-red-500  rounded-3xl flex flex-col items-center justify-center">
                <div className="text-xl flex">
                    <div className="flex flex-col">
                        <span className=" font-bold text-nowrap">{formatCurrency(totalProfit)}VNĐ</span>
                        <span>Lợi Nhuận</span>
                    </div>
                    <img className=" w-12 h-12 object-cover " src={Profits} alt="" />
                </div>
            </div>
            {/* <div className="text-red-500 h-24 border-2 border-red-500  rounded-3xl flex flex-col items-center justify-center">
                <div className="text-xl flex">
                    <div className="flex flex-col">
                        <span className=" font-bold text-nowrap"></span>
                        <span>Doanh Thu</span>
                    </div>
                    <img className=" w-12 h-12 object-cover " src={Money} alt="" />
                </div>
            </div> */}
            {/* <div className="relative text-red-500 h-24 border-2 border-red-500  rounded-3xl flex flex-col items-center justify-center">
                <img src="https://images.ctfassets.net/awb1we50v0om/2Spf80TME2zIhLqsi3Zxv9/919421a45f3260ee426c99c35235f1c8/Plates03__3__copy3.jpg"
                    className="w-full h-full rounded-3xl object-cover" alt="" />
                <div className="absolute -bottom-1 -left-2 flex items-end  w-[230px]">
                    <img className=" absolute h-12 w-12" src={bestSeller} alt="" />
                    <span className=" ml-8 font-bold text-white bg-black mb-1 rounded-full px-4 text-sm text-nowrap text-ellipsis overflow-hidden">Gà rán Gzxcczczxcà rán dasdasrans</span>
                </div>
            </div> */}
        </div>
        <Table columns={columns} dataSource={dataDisplayInTable} scroll={{ x: 800, y: 300 }} />
        <div className="flex overflow-x-scroll mt-10 gap-4 pb-2 scroll-bestseller">
            {bestSellingFoods?.map((item, index) => (
                <div key={index} >
                    <div className="w-48 h-40 rounded-2xl relative">
                        <img src={item.picture} className="h-full w-full object-cover rounded-2xl" alt="" />
                        <div className="flex justify-between absolute bottom-0 left-0 w-full bg-white bg-opacity-30 p-2 space-x-2 flex-wrap ">
                            <span className="text-nowrap font-medium text-shadown-white">{item.foodName}</span>
                            <span className="text-nowrap text-right text-shadown-white"><span className="text-xs">Đã bán</span> {item.totalSold}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="pt-10">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident libero quia asperiores, dignissimos esse molestias porro? Aut hic nulla, sapiente ut ab est cumque facilis repellendus porro cupiditate tempora alias?
        </div>

        {modalViewBill && <div className=" z-50 absolute top-0 left-0 h-screen w-full ">
            <div
                className=" fixed h-full w-full bg-black bg-opacity-50 flex  overflow-y-scroll justify-center ">
                <div data-aos="fade-down" className=" relative h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[45%] bg-white mt-20 p-8   flex flex-col border-2 border-black">
                    <div
                        onClick={() => {
                            setModalViewBill(!modalViewBill)
                        }}
                        className=" absolute top-2 right-2 p-1 hover:bg-gray-200"><IoClose style={{ height: 20, width: 20 }} />
                    </div>
                    <div className="">
                        <div className="text-center mb-5  font-bold text-xl">Hóa đơn</div>

                        <div className="flex justify-between mb-4">
                            <div className="">
                                <div className="space-x-2 ">
                                    <span className="font-bold">Nhân viên:</span>
                                    <span>{billDetail?.getOneBill.orderId.userId.userName}</span>
                                </div>
                                <div className="space-x-2">
                                    <span className="font-bold">Order lúc:</span>
                                    <span>{dayjs(billDetail?.getOneBill.orderId.createdAt).format('h:mm A  DD/MM/YYYY ')}</span>
                                </div>
                            </div>
                            <div >
                                <div className="space-x-2">
                                    <span className="font-bold">Bàn:</span>
                                    <span>{billDetail?.getOneBill.orderId.tableId.tableName}</span>
                                </div>


                            </div>
                        </div>

                        <table className="table-auto  w-full">
                            <thead className="" >
                                <tr className="  border-y-2 border-dashed border-gray-400 ">
                                    <th className="py-1">No</th>
                                    <th className="px-4 text-center">Món ăn</th>
                                    <th className="px-4 text-center">SL</th>
                                    <th className="text-right">Đơn giá</th>
                                    <th className=" text-right">Tổng Tiền</th>
                                </tr>
                            </thead>
                            <tbody className="border-b-2  border-dashed border-gray-400">
                                {billDetail?.foods.map((item, index) => (
                                    <tr className=" ">
                                        <td className="py-1">{index + 1}</td>
                                        <td className="px-2">{item.foodId.foodName}</td>
                                        <td className="text-center">{item.quantity}</td>
                                        <td className="text-right">{formatCurrency(item.foodId.revenue)}</td>
                                        <td className="text-right">{formatCurrency(item.foodId.revenue * item.quantity)}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-between">
                            <span className="font-bold text-xl">Thành tiền</span>
                            <span className="text-xl font-bold">{formatCurrency(billDetail?.getOneBill.orderId.subTotal)}K</span>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <div className="flex text-nowrap flex-1">Phương thức thanh toán  </div>
                        <div className="relative w-[50%]">
                            <div
                                className={`text-pretty relative top-0 left-0 w-full px-2 py-1  border-2 rounded-xl flex items-center`}>
                                <span className="flex-1">{billDetail?.getOneBill.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
};
