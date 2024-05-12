export interface IFood {
    _id: string,
    foodName: string,
    description: string,
    picture: string,
    costPrice: number,
    revenue: number,
    favourite: string,
}
export interface IFoodSlice {
    food: IFood;
    quantity: number;
    totalEachFood: number;
    
}
export interface IMenu {
    categoryName: string,
    food: IFood[]
}

export interface IOrder {
    food: IFoodSlice[],
    total: number,
    userName:string|undefined,
    tableId: string
}