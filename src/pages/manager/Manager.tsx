import { useEffect, useState } from "react";
import { Sales } from "./managementChild/Sales";
import { FoodsManagement } from "./managementChild/FoodsManagement";
import { CategoryManagement } from "./managementChild/CatergoryMangement";
import { EmployeeManagement } from "./managementChild/EmployeeManagement";
import { AreaManagement } from "./managementChild/AreaManagement";
import { TableManagement } from "./managementChild/TableManagement";

const listManagement = [
    "Doanh Số Bán Hàng",
    "Quản Lý Món Ăn",
    "Quản Lý Bàn",
    "Quản Lý Khu Vực",
    "Quản Lý Doanh Mục Món",
    "Quản Lý Nhân Viên"
]

function Manager() {
    const [managementName, setManagementName] = useState<string>(() => {
        return localStorage.getItem("managementName") || listManagement[0]
    })

    useEffect(() => {
        localStorage.setItem("managementName", managementName)

    }, [managementName])

    return <div className="pt-header h-screen flex relative">
        <div className=" absolute top-0 left-0 z-10 ">
            <div className="fixed pt-header w-[220px] h-screen  top-0 left-0   space-y-4 px-2">
                {listManagement.map((item, index) => (
                    <div key={index} onClick={() => setManagementName(item)} className={`${managementName == item ? "bg-white font-bold border-2 text-red-500 border-red-500" : "bg-black text-white"} cursor-pointer mt-5 h-12 flex items-center justify-center bg-black  rounded-full hover:bg-white hover:border-2 hover:border-black hover:text-black`}>
                        {item}
                    </div>
                ))}

            </div>
        </div>
        <div className=" pt-header absolute top-0 left-0 pl-[240px] w-full  h-full">
            {managementName == "Doanh Số Bán Hàng" && <Sales />}
            {managementName == "Quản Lý Món Ăn" && <FoodsManagement />}
            {managementName == "Quản Lý Bàn" && <TableManagement />}
            {managementName == "Quản Lý Khu Vực" && <AreaManagement />}
            {managementName == "Quản Lý Doanh Mục Món" && <div><CategoryManagement /></div>}
            {managementName == "Quản Lý Nhân Viên" && <div><EmployeeManagement /></div>}
        </div>

    </div>;
}

export default Manager;
