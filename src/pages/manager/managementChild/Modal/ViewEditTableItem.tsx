import { setOpenModalDeleteTable } from "../../../../Redux/foodsSlice";
import { setRefreshAreaWithTable } from "../../../../Redux/userSlice";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { apiUpdateTable } from "../../../../API/api";
import { MdDeleteForever } from "react-icons/md";
import { ITableItem } from "../TableManagement";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface IViewEditTableItem {
    item: ITableItem;
    index: number;
    control: Control<{ table: ITableItem[] }>;
    errors: FieldErrors<{ table: ITableItem[] }>;
}

export const ViewEditTableItem = ({ item, index, control, errors }: IViewEditTableItem) => {
    const dispatch = useDispatch()
    const [readOnlyy, setReadOnlyy] = useState<boolean>(true);
    const [editTable, setEditTable] = useState<boolean>(false);
    const [capacityUpdate, setCapacityUpdate] = useState<number>()
    const [tableNameUpdate, setTableNameUpdate] = useState<string>("")

    const handleUpdateTable = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            apiUpdateTable(item._id, { tableName: tableNameUpdate, capacity: capacityUpdate })
            setEditTable(false)
            dispatch(setRefreshAreaWithTable(true))
            toast.success("Cập nhập bàn thành công !")
        } catch (error) {
            setEditTable(false)
            console.log("Error Update Table", error);
        }
    }
    useEffect(() => {
    }, [dispatch])

    return (
        <div key={index}>
            <form className="grid grid-cols-9 gap-x-2">
                <div className='col-span-1 flex items-end justify-end'>
                    {editTable ? (
                        <div className="flex flex-col h-fit justify-between">
                            <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleUpdateTable(e)} className='h-[30px] w-[44px] flex items-center justify-center rounded-md border-2 mb-1 bg-primary text-white'>Lưu</button>
                            <div onClick={() => {
                                setTableNameUpdate(item.tableName)
                                setCapacityUpdate(item.capacity)
                                setEditTable(false);
                                setReadOnlyy(true);
                            }} className='h-[30px] w-[44px] flex items-center justify-center rounded-md border-2'>Hủy</div>
                        </div>
                    ) : (
                        <div onClick={() => {
                            setEditTable(true);
                            setReadOnlyy(false);
                        }} className='h-[44px] w-[44px] flex items-center justify-center rounded-xl border-2'>
                            <AiFillEdit className='text-2xl' />
                        </div>
                    )}
                </div>
                <div className="grid col-span-6">
                    <label htmlFor={`table.${index}.tableName`}>Tên bàn</label>
                    <Controller
                        name={`table.${index}.tableName`}
                        control={control}
                        rules={{ required: 'Hãy nhập tên bàn !' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                disabled={readOnlyy}
                                className={`${errors.table?.[index]?.tableName ? 'border-red-500' : 'border-black'} ${readOnlyy ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2 rounded-xl`}
                                type="text"
                                value={tableNameUpdate ? tableNameUpdate : item.tableName}
                                placeholder="Nhập tên bàn"
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                    setTableNameUpdate(e.target.value)
                                }}
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col col-span-1">
                    <label className="text-nowrap" htmlFor={`table.${index}.capacity`}>SL ghế</label>
                    <Controller
                        name={`table.${index}.capacity`}
                        control={control}
                        rules={{ required: 'Hãy nhập số lượng ghế !' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                disabled={readOnlyy}
                                className={`${errors.table?.[index]?.capacity ? 'border-red-500' : 'border-black'}  ${readOnlyy ? "bg-gray-50 cursor-not-allowed" : ""} outline-none p-2 border-2 rounded-xl`}
                                type="number"
                                value={capacityUpdate ? capacityUpdate : item.capacity}
                                placeholder="SL ghế"
                                onChange={(e) => {
                                    field.onChange(e.target.value)
                                    setCapacityUpdate(Number(e.target.value))
                                }}
                            />
                        )}
                    />
                </div>
                <div className='col-span-1 flex items-end justify-end'>
                    <div onClick={() =>
                        dispatch(setOpenModalDeleteTable({ statusOpen: true, tableInfo: item }))
                    } className='h-[44px] w-[44px] flex items-center justify-center rounded-xl border-2'>
                        <MdDeleteForever className='text-2xl' />
                    </div>
                </div>
            </form>
            <div className="flex justify-between">
                {errors.table?.[index]?.tableName && <span className="text-red-500">{errors.table[index].tableName.message}</span>}
                {errors.table?.[index]?.capacity && <span className="text-red-500">{errors.table[index].capacity.message}</span>}
            </div>
        </div>
    );
};
