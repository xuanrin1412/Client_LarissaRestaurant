import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFood, IFoodSlice, IMenu, IOrder } from "../common/type";
import { apiGetCategoryWFood } from "../API/api";
import { sumTotal } from "./common";

export const getCategoryWFood = createAsyncThunk(
    'foods/getCategoryWFood',
    async () => {
        const response = await apiGetCategoryWFood()
        return response.data
    }
)
export interface IState {
    foods: IFoodSlice[];
    order: IOrder[]
    categoryWFood: IMenu[];
    total: number;
    openModalConfirm: boolean
}
const initialState: IState = {
    foods: [],
    order: [],
    categoryWFood: [],
    total: 0,
    openModalConfirm: false

};
const foodsSlice = createSlice({
    name: "foods",
    initialState,
    reducers: {
        createFoodArr: (state, action: PayloadAction<{ food: IFood, quantity: number }>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload.food._id)
            if (index !== -1) {
                state.foods[index].quantity++
                state.foods[index].totalEachFood = state.foods[index].quantity * action.payload.food.revenue
                state.total = sumTotal(state.foods)
                // console.log("state.foods dup after", JSON.parse(JSON.stringify(state.foods)))
            } else {
                const newFood = {
                    food: action.payload.food,
                    quantity: action.payload.quantity,
                    totalEachFood: action.payload.food.revenue
                }
                state.foods.push(newFood)
                state.total = sumTotal(state.foods)
            }
        },
        deleteOneFood: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.foods.find(item=>item.food._id === action.payload.id)
            state.foods = state.foods.filter(item=>item.food._id !== index?.food._id)
            state.total = sumTotal(state.foods)
        },
        deleteFoodArr: (state) => {
            state.foods = []
        },
        deleteTotal: (state) => {
            state.total = 0
        },
        setOpenModalConfirm: (state, action: PayloadAction<boolean>) => {
            state.openModalConfirm = action.payload
            console.log("state.categoryWFood when click close board order", state.openModalConfirm);
        },
        increaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            state.foods[index].quantity++
            state.foods[index].totalEachFood = state.foods[index].quantity * state.foods[index].food.revenue
            state.total = sumTotal(state.foods)
        },
        decreaseQuantity: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            if (state.foods[index].quantity > 1) {
                state.foods[index].quantity--
                state.foods[index].totalEachFood -= state.foods[index].food.revenue
            }
            state.total = sumTotal(state.foods)
        },
        changeQuantityInput: (state, action: PayloadAction<{ _id: string, value:number }>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            if (state.foods[index].quantity ) {
                state.foods[index].quantity = action.payload.value
                state.foods[index].totalEachFood = state.foods[index].quantity * state.foods[index].food.revenue
            }
            state.total = sumTotal(state.foods)
        },
        confirmOrder: (state, action: PayloadAction<{ food: IFoodSlice[], total: number, tableId: string, userName: string | undefined }>) => {
            const newOrder = {
                food: action.payload.food,
                total: action.payload.total,
                tableId: action.payload.tableId,
                userName: action.payload.userName
            }
            state.order.push(newOrder)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryWFood.fulfilled, (state, action) => {
            state.categoryWFood = action.payload


        })
    },
})
export const { createFoodArr, deleteFoodArr, deleteTotal, increaseQuantity, decreaseQuantity,changeQuantityInput, confirmOrder, setOpenModalConfirm,deleteOneFood } = foodsSlice.actions;
export default foodsSlice.reducer