
import { IFoodsInOrder } from "../../pages/order/area/Area"
import { IFoodSlice } from "../../common/types/foods"

export const sumTotal = (foodArray: IFoodSlice[] | IFoodsInOrder[]) => {
    const sum = foodArray?.reduce((acc: number, current: IFoodSlice | IFoodsInOrder) => {
        return acc + current.totalEachFood
    }, 0)
    return sum
}