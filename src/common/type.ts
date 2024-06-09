export interface IFood {
    _id: string,
    foodName: string,
    description: string,
    picture: string,
    costPrice: number,
    revenue: number,
    favourite: boolean,
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


export interface IFoodInfoInFoodOrder {
    _id:string,
    categoryId?:string,
    foodName:string,
    description?:string,
    picture:string,
    costPrice:number,
    revenue:number,
    favourite?:boolean,
}