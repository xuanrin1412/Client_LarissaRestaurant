import { IgetDataAreaWTable, ITableItem } from '../TableManagement';
import { ViewEditTableItem } from './ViewEditTableItem';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { useEffect } from 'react';
import { Select } from 'antd';
interface IModalViewEditTable {
    areaWithTableItem: IgetDataAreaWTable | undefined;
    setModalViewEditTables: (value: React.SetStateAction<boolean>) => void;
}

export const ModalViewEditTable = ({ areaWithTableItem, setModalViewEditTables}: IModalViewEditTable) => {
    const { control, formState: { errors }, setValue } = useForm<{ table: ITableItem[] }>({
        criteriaMode: 'all',
    });
    useEffect(() => {
        if (areaWithTableItem) {
            areaWithTableItem.table.forEach((item, index) => {
                setValue(`table.${index}.tableName`, item.tableName);
                setValue(`table.${index}.capacity`, item.capacity);
            });
        }
    }, [areaWithTableItem, setValue]);

    return (
        <div className="z-50 absolute top-0 left-0 h-screen w-full">
            <div className="fixed h-full w-full bg-black bg-opacity-50 flex overflow-y-scroll justify-center pb-5">
                <div className="relative rounded-2xl h-fit w-11/12 sm:w-9/12 md:w-3/5 lg:w-[80%] bg-white mt-14 flex flex-col border-2 border-black">
                    <div className="bg-black text-white rounded-t-xl py-3 px-2 border-2 border-white text-xl font-bold text-center border-b-2">Thêm bàn</div>
                    <form className="p-8 space-y-3 border-t-2 border-black">
                        <div className="flex flex-col">
                            <span>Khu vực</span>
                            <Select
                                disabled={areaWithTableItem ? true : false}
                                showSearch
                                placeholder="Hãy chọn danh mục"
                                className={`styleSelect ${areaWithTableItem ? "readOnlyy" : ""}`}
                                style={{ width: '100%', height: '41px' }}
                                defaultValue={areaWithTableItem?.areaName}
                            />
                        </div>
                        {/* List Table item */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            {areaWithTableItem?.table.map((item, index) => (
                                <ViewEditTableItem  key={index} item={item} index={index} control={control} errors={errors} />
                            ))}
                        </div>
                    </form>
                    <div onClick={() => setModalViewEditTables(false)} className="absolute top-2 right-2 p-1 hover:bg-gray-200 hover:bg-opacity-20 rounded-full hover:cursor-pointer">
                        <IoClose className="text-xl text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};
