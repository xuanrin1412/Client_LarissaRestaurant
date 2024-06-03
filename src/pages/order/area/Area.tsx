import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IFoodInfoInFoodOrder } from "../../../common/type";
import { apiGetAllOrder, apiGetAreaWithTable } from "../../../API/api";
import io from 'socket.io-client';
const socket = io('http://localhost:3004');

interface ITable {
    _id: string,
    tableName: string,
    capacity: number,
}
interface IAreaWTable {
    areaName: string,
    table: ITable[]
}

interface IUserInfo {
    role: string,
    userName: string,
    email: string,
    phoneNumber: string,
}

export interface IFoodsInOrder {
    _id: string,
    foodId: IFoodInfoInFoodOrder,
    orderId: string,
    quantity: number,
    totalEachFood: number,
}

export interface ITableHaveOrders {
    userId: IUserInfo,
    tableId: string,
    subTotal: number,
    status: string,
    foods: IFoodsInOrder[]
}

function Area() {
    const navigate = useNavigate()
    const [data, setData] = useState<IAreaWTable[]>()
    const [tablesHaveOrders, setTablesHaveOrders] = useState<ITableHaveOrders[]>([])

    const handleClickOrder = (tableId: string, tableName: string) => {
        const takeOrderFromTable = tablesHaveOrders.find(item => (
            item.tableId === tableId
        ))
        if (takeOrderFromTable) {
            navigate(`/order/${tableName}`, { state: { tableId, tableName, takeOrderFromTable } });
        } else {
            navigate(`/order/${tableName}`, { state: { tableId, tableName } });
        }
    }

    // HANDLE SHOW TABLE HAVE ORDER
    const haveRedPoint = (tableId: string) => {
        const takeOutFood = tablesHaveOrders.find(item => (
            item.tableId === tableId
        ))
        if (takeOutFood) {
            return <>
             <div className=" absolute -top-3 -right-2 bg-red-500 border-2 border-black text-white font-medium h-6  rounded-lg flex items-center justify-center text-sm space-x-2 px-4 py-[14px]">
                <span>{takeOutFood.subTotal}K</span>
                <span>({takeOutFood.foods.length})</span>
            </div>
                {/* <div className=" absolute -top-3 -left-2 bg-[#0b2b6b] border-2 border-black text-white font-medium h-6  rounded-lg flex items-center justify-center text-sm space-x-2 px-4 py-[14px]">
                    <span>Reserved</span>
                </div> */}
            </>
        }
    }

    useEffect(() => {
        apiGetAllOrder().then(res => {
            setTablesHaveOrders(res.data.orders)
        })
        apiGetAreaWithTable()
            .then(res => {
                setData(res.data)
            })

        socket.on('all_orders', (allOrders) => {
            console.log("all_orders===============", allOrders.orders);
            setTablesHaveOrders(allOrders.orders)
        });

        socket.on('area_with_table', (areaWithTable) => {
            console.log("area_with_table===============", areaWithTable);
        });
        return () => {
            socket.off('all_orders');
            socket.off('area_with_table');
        };
    }, []);

    return <div className=" mt-header mx-4 lg:mx-10">
        {data?.map((area, index) => (
            <div key={index}>
                {area.table.length > 0 &&
                    <div className="pt-10" >
                        <div className=" font-bold text-[18px] my-5">Khu vực {area.areaName}</div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                            {area.table.map((table, index) => (
                                <div onClick={() => handleClickOrder(table._id, table.tableName)} key={index}
                                    className="hover:shadow cursor-pointer relative w-full h-16 lg:h-20 border-4 border-gray-400 flex justify-center items-center rounded-2xl">
                                    <span className="font-bold"> {table.tableName.split(' - ')[1]} -</span>&nbsp;
                                    <span> {table.capacity} ghế</span>
                                    {haveRedPoint(table._id)}
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>))}
    </div >
}

export default Area;
