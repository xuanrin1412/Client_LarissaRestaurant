import { IFoodSlice } from "../../common/type"
import { IFoodsInOrder } from "../../pages/order/area/Area"

export const sumTotal = (foodArray: IFoodSlice[]|IFoodsInOrder[]) => {
    const sum = foodArray?.reduce((acc: number, current: IFoodSlice|IFoodsInOrder) => {
        return acc + current.totalEachFood
    }, 0)
    return sum
}