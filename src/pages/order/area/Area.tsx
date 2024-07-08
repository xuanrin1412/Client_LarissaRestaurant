import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGetAllOrder, apiGetAreaWithTable } from "../../../API/api";
import io from 'socket.io-client';
import { useAppDispatch } from "../../../Redux/store";
import { setfoodsOrder } from "../../../Redux/foodsSlice";
import { IUserInfo } from "../../../common/types/userInfo";
import { IFoodInfoInFoodOrder } from "../../../common/types/foods";
const socket = io('http://localhost:3004');

export interface ITable {
    _id: string,
    tableName: string,
    capacity: number,
}
interface IAreaWTable {
    areaName: string,
    table: ITable[]
}


export interface IFoodsInOrder {
    _id?: string,
    foodId: IFoodInfoInFoodOrder,
    orderId: string,
    quantity: number,
    totalEachFood: number,
}

export interface ITableHaveOrders {
    createdAt: string,
    userId: IUserInfo,
    tableId: string,
    subTotal: number | undefined,
    status: string,
    foods: IFoodsInOrder[],
    note?: string | undefined
}

function Area() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<IAreaWTable[]>()
    const [tablesHaveOrders, setTablesHaveOrders] = useState<ITableHaveOrders[]>([])

    const handleClickOrder = (tableId: string, tableName: string) => {
        const takeOrderFromTable = tablesHaveOrders.find(item => (
            item.tableId === tableId
        ))
        if (takeOrderFromTable) {
            dispatch(setfoodsOrder({ foodsOrder: takeOrderFromTable }))
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
        const totalFood = takeOutFood?.foods.reduce((acc, current) => {
            return acc + current.quantity
        }, 0)

        if (takeOutFood) {
            return <>
                <div className=" absolute -top-3 -right-2 bg-red-500 border-2 border-black text-white font-medium h-6  rounded-lg flex items-center justify-center text-sm space-x-2 px-4 py-[14px]">
                    <span>{takeOutFood.subTotal}K</span>
                    <span>({totalFood})</span>
                </div>
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

    return <div className=" my-header mx-4 lg:mx-10">
        {data?.map((area, index) => (
            <div key={index}>
                {area.table.length > 0 &&
                    <div className="pt-10" >
                        <div className=" font-bold text-[18px] my-5">Khu vực {area.areaName}</div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                            {area.table.map((table, index) => (
                                <div onClick={() => handleClickOrder(table._id, table.tableName)} key={index}
                                    className="hover:shadow cursor-pointer relative w-full h-20 border-4 border-gray-400 flex justify-center items-center rounded-2xl">
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
