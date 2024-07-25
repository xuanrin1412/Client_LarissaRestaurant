import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFood, IFoodSlice } from "../common/types/foods";
import { sumTotal } from "./common";


export interface IState {
    foodsCustomer: IFoodSlice[]
    quantityFoodInCard: number
    totalOrderCustomer: number
}

const initialState: IState = {
    foodsCustomer: [],
    quantityFoodInCard: 0,
    totalOrderCustomer: 0
};

const foodsCustomer = createSlice({
    name: "foodsCustomer",
    initialState,
    reducers: {
        createFoodCustomerArr: (state, action: PayloadAction<{ food: IFood, quantity: number }>) => {
            const index = state.foodsCustomer.findIndex(item => item.food._id === action.payload.food._id)
            if (index !== -1) {
                state.foodsCustomer[index].quantity++
                state.foodsCustomer[index].totalEachFood = state.foodsCustomer[index].quantity * action.payload.food.revenue
                state.totalOrderCustomer = sumTotal(state.foodsCustomer)
            } else {
                const newFoodCustomer: IFoodSlice = {
                    food: action.payload.food,
                    quantity: action.payload.quantity,
                    totalEachFood: action.payload.food.revenue
                }
                console.log("newFoodCustomer", newFoodCustomer);
                state.foodsCustomer.push(newFoodCustomer)
                state.totalOrderCustomer = sumTotal(state.foodsCustomer)
                console.log("foodsCustomer redux", foodsCustomer);
            }
        },
        increaseQuantityCustomer: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foodsCustomer.findIndex(item => item.food._id === action.payload._id);
            state.foodsCustomer[index].quantity++
            state.foodsCustomer[index].totalEachFood = state.foodsCustomer[index].quantity * state.foodsCustomer[index].food.revenue
            state.totalOrderCustomer = sumTotal(state.foodsCustomer)
        },
        decreaseQuantityCustomer: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foodsCustomer.findIndex(item => item.food._id === action.payload._id);
            if (state.foodsCustomer[index].quantity > 1) {
                state.foodsCustomer[index].quantity--
                state.foodsCustomer[index].totalEachFood -= state.foodsCustomer[index].food.revenue
            }
            state.totalOrderCustomer = sumTotal(state.foodsCustomer)
        },
        deleteAllFoodsCustomer: (state) => {
            state.foodsCustomer = []
            state.quantityFoodInCard = 0
            state.totalOrderCustomer = 0
        },
        changeQuantityInputCustomer: (state, action: PayloadAction<{ _id: string, value: number }>) => {
            const index = state.foodsCustomer.findIndex(item => item.food._id === action.payload._id);
            if (state.foodsCustomer[index].quantity) {
                state.foodsCustomer[index].quantity = action.payload.value
                state.foodsCustomer[index].totalEachFood = state.foodsCustomer[index].quantity * state.foodsCustomer[index].food.revenue
            }
            state.totalOrderCustomer = sumTotal(state.foodsCustomer)
        },
        deleteOneFoodCustomer: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.foodsCustomer.find(item => item.food._id === action.payload.id)
            state.foodsCustomer = state.foodsCustomer.filter(item => item.food._id !== index?.food._id)
            state.totalOrderCustomer = sumTotal(state.foodsCustomer)
        },
        setQuantityFoodInCard: (state, action: PayloadAction<{ quantityFood: number }>) => {
            state.quantityFoodInCard = action.payload.quantityFood
            console.log("quantityFoodInCard redux", state.quantityFoodInCard);

        },
    }
})
export const { deleteAllFoodsCustomer,createFoodCustomerArr, deleteOneFoodCustomer, changeQuantityInputCustomer, increaseQuantityCustomer, decreaseQuantityCustomer, setQuantityFoodInCard } = foodsCustomer.actions;
export default foodsCustomer.reducer