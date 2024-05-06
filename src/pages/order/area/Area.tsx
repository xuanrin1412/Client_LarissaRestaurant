import React, { useEffect, useState } from "react";
import { apiGetAreaWithTable } from "../../../API/api";
import { useNavigate } from "react-router-dom";
interface ITable {
    _id: string,
    tableName: string,
    capacity: number,

}
interface IAreaWTable {
    areaName: string,
    table: ITable[]

}

function Area() {
    const navigate = useNavigate()
    const [data, setData] = useState<IAreaWTable[]>()
    console.log(data);
    useEffect(() => {
        apiGetAreaWithTable()
            .then(res => {
                setData(res.data)
            })
    }, [])
    const handleOrder = (id: string, tableName: string) => {
        console.log("click", id, tableName);
        navigate(`/order/${tableName}`, { state: { id, tableName } });

    }
    return <div className=" mt-header mx-4 lg:mx-10">
        {data?.map((area, index) => (
            <div key={index}>
                {area.table.length > 0 &&
                    <div className="pt-10" >
                        <div className=" font-bold my-5">Khu vực {area.areaName}</div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                            {area.table.map((table, index) => (
                                <div onClick={() => handleOrder(table._id, table.tableName)} key={index} className=" cursor-pointer relative w-full h-16 lg:h-20 bg-[#B7DBFF] flex justify-center items-center rounded-lg">
                                    <span> {table.tableName.split(' - ')[1]} -</span>&nbsp;
                                    <span> {table.capacity} ghế</span>
                                    <div className=" absolute -top-1 -right-1 bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">23</div>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>))}
    </div >;
}

export default Area;
