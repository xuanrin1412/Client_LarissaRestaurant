import { IFoodSlice } from "./foods";

export interface IOrder {
    food: IFoodSlice[],
    total: number,
    userName: string | undefined,
    tableId: string
}


