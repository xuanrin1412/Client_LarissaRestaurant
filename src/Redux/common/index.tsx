import { IFoodSlice } from "../../common/type"

export const sumTotal = (foodArray: IFoodSlice[]) => {
    const sum = foodArray.reduce((acc: number, current: IFoodSlice) => {
        return acc + current.totalEachFood
    }, 0)
    return sum
}