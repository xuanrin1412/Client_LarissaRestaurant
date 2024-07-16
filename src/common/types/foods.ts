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
export interface IFoodInfoInFoodOrder {
    _id: string,
    categoryId?: string,
    foodName: string,
    description?: string,
    picture: string,
    costPrice: number,
    revenue: number,
    favourite?: boolean,
}

export interface IFoodAdd {
    categoryId: string,
    foodName: string,
    description: string,
    picture?: string,
    costPrice: number,
    revenue: number,
    favourite?: boolean,
}

export interface IFoods {
    _id: string,
    categoryId: {
        _id: string,
        categoryName: string,
    },
    foodName: string,
    description: string,
    picture: string,
    costPrice: number,
    revenue: number,
    favourite: boolean,
    createdAt: string,
}
export interface IdataFoods {
    key: number
    _id: string,
    categoryName: string,
    foodName: string,
    description: string,
    picture: string,
    costPrice: number,
    revenue: number,
    favourite: boolean,
    createdAt: string,
}
export interface IdataCategory {
    _id: string,
    categoryName: string
}
