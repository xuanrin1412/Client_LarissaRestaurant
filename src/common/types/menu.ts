import { IFood } from "./foods";

export interface IMenu {
    categoryName: string,
    food: IFood[]
}