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

interface IFoodsInOrder {
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

    console.log("tablesHaveOrders từ api ",tablesHaveOrders);
    

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

    const haveRedPoint = (tableId: string) => {
        const takeOutFoodLength = tablesHaveOrders.find(item => (
            item.tableId === tableId
        ))
        if (takeOutFoodLength) {
            return <div className=" absolute -top-1 -right-1 bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">{takeOutFoodLength.foods.length}</div>
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
    }, [])
    useEffect(() => {
        // Lắng nghe sự kiện 'new_order' từ server
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
                        <div className=" font-bold my-5">Khu vực {area.areaName}</div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                            {area.table.map((table, index) => (
                                <div onClick={() => handleClickOrder(table._id, table.tableName)} key={index} className=" cursor-pointer relative w-full h-16 lg:h-20 border bg-[#B7DBFF] flex justify-center items-center rounded-lg">
                                    <span> {table.tableName.split(' - ')[1]} -</span>&nbsp;
                                    <span> {table.capacity} ghế</span>
                                    {haveRedPoint(table._id)}
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>))}
    </div >;
}

export default Area;
