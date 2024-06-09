
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { changeQuantityInput, changeQuantityInputOD, deleteOneFood, deleteOneFoodOD } from "../../../../Redux/foodsSlice";
import { ITableHaveOrders } from "../../area/Area";
interface IFoodsInOrderBoard {
    key: number,
    keyFoodsInOrderBoard: number
    FoodInOrder:ITableHaveOrders|undefined
    no: number,
    _id: string,
    foodName: string,
    onClickIncrease: () => void,
    onClickDecrease: () => void,
    itemQuantity: number | undefined,
    totalEachFood: number,
}
function FoodsInOrderBoard({FoodInOrder, keyFoodsInOrderBoard, _id, itemQuantity, no, foodName, onClickIncrease, onClickDecrease, totalEachFood }: IFoodsInOrderBoard) {
    const dispatch = useDispatch()
    const handleDeleteOneFood = (id: string) => {
        console.log("in handleDeleteOneFood");
        if(FoodInOrder){
            dispatch(deleteOneFoodOD({ id }))
        }else{
            dispatch(deleteOneFood({ id }))
        }
    }
    const [quan, setQuan] = useState<string>(itemQuantity !== undefined ? String(itemQuantity) : "");
    
    const handleChangeQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuan(value);
        const numericValue = value === "" ? 1 : Number(value);
        if(FoodInOrder){
            dispatch(changeQuantityInputOD({ _id, value: numericValue }));
        }else{
            dispatch(changeQuantityInput({ _id, value: numericValue }));
        }
    };

    const handleBlur = () => {
        if (quan === "") {
            setQuan("1");
            if(FoodInOrder){
                dispatch(changeQuantityInputOD({ _id, value: 1 }));
            }else{
                dispatch(changeQuantityInput({ _id, value: 1 }));
            }
        }
    };

    useEffect(() => {
        setQuan(itemQuantity !== undefined ? String(itemQuantity) : "1");
    }, [itemQuantity]);

    return <div key={keyFoodsInOrderBoard} className="flex border-b group border-b-1 items-center min-h-12 hover:bg-gray-100">
        <span className="px-3">{no}</span>
        <span className="flex-1 max-w-[125px] py-2">{foodName}</span>
        <div className="flex items-center">
            <span onClick={() => onClickIncrease()} className="hover:bg-gray-200 h-7 w-7 cursor-pointer flex items-center justify-center">+</span>
            <input value={quan} onBlur={handleBlur} onChange={handleChangeQuantityInput} min={1} className="h-7 border w-9 flex items-center justify-center px-2" type="number" />
            {/* <input type="number" value={quan}  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setQuan(e.target.value)} /> */}
            <span onClick={() => onClickDecrease()} className="hover:bg-gray-200 h-7 w-7 cursor-pointer flex items-center justify-center">-</span>
        </div>
        <span className="pl-5  min-w-[65px]">{totalEachFood}</span>
        <span onClick={() => handleDeleteOneFood(_id)} title="Delete" className="pl-3  group-hover:cursor-pointer  invisible group-hover:visible h-12 flex items-center"><IoClose /></span>
    </div>
}

export default FoodsInOrderBoard;
