import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { apiGetCategoryWFood } from "../API/api";
import { sumTotal } from "./common";
import { IFood, IFoodSlice } from "../common/types/foods";
import { IOrder } from "../common/types/order";
import { IMenu } from "../common/types/menu";
import { ITableHaveOrders } from "../pages/order/area/Area";

export const getCategoryWFood = createAsyncThunk(
    'foods/getCategoryWFood',
    async () => {
        const response = await apiGetCategoryWFood()
        console.log("call aipi getCategoryWFood", response.data);
        
        return response.data
    }
)
export interface IState {
    foods: IFoodSlice[];
    foodsOrder: ITableHaveOrders | undefined;
    order: IOrder[]
    categoryWFood: IMenu[];
    total: number;
    openModalConfirm: boolean
    openModalPayment: boolean
}
const initialState: IState = {
    foods: [],
    foodsOrder: undefined,
    order: [],
    categoryWFood: [],
    total: 0,
    openModalConfirm: false,
    openModalPayment: false

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
            console.log("-------------New Food---------------", JSON.parse(JSON.stringify(state.foods)))

        },
        deleteOneFood: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.foods.find(item => item.food._id === action.payload.id)
            state.foods = state.foods.filter(item => item.food._id !== index?.food._id)
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
        },
        setOpenModalPayment: (state, action: PayloadAction<boolean>) => {
            state.openModalPayment = action.payload
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
        changeQuantityInput: (state, action: PayloadAction<{ _id: string, value: number }>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            if (state.foods[index].quantity) {
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
        },

        setfoodsOrder: (state, action: PayloadAction<{ foodsOrder: ITableHaveOrders | undefined }>) => {
            state.foodsOrder = action.payload.foodsOrder

        },
        addFoodInFoodsOrder: (state, action: PayloadAction<{ foodId: IFood, quantity: number, orderId: string }>) => {
            const index = state.foodsOrder?.foods?.findIndex(item => item.foodId._id === action.payload.foodId._id)
            if (index || index == 0) {
                if (state.foodsOrder?.foods[index]) {
                    state.foodsOrder.foods[index].quantity++
                    state.foodsOrder.foods[index].totalEachFood = state.foodsOrder.foods[index].quantity * action.payload.foodId.revenue
                    state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                        return acc + current.totalEachFood
                    }, 0)
                } else {
                    const newFood = {
                        foodId: action.payload.foodId,
                        orderId: action.payload.orderId,
                        quantity: action.payload.quantity,
                        totalEachFood: action.payload.foodId.revenue
                    }
                    state.foodsOrder?.foods?.push(newFood)
                    if (state.foodsOrder?.foods) {
                        state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                            return acc + current.totalEachFood
                        }, 0)
                    }
                }
            } else {
                console.log("Error addFoodInFoodsOrder ");
            }
        },
        increaseQuantityOD: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foodsOrder?.foods?.findIndex(item => item.foodId._id === action.payload._id)
            if (index || index == 0) {
                if (state.foodsOrder?.foods[index]) {
                    state.foodsOrder.foods[index].quantity++
                    state.foodsOrder.foods[index].totalEachFood = state.foodsOrder.foods[index].quantity * state.foodsOrder.foods[index].foodId.revenue
                    state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                        return acc + current.totalEachFood
                    }, 0)
                }
            }
        },
        decreaseQuantityOD: (state, action: PayloadAction<{ _id: string }>) => {
            const index = state.foodsOrder?.foods?.findIndex(item => item.foodId._id === action.payload._id)
            if (index || index == 0) {
                if (state.foodsOrder?.foods[index] && state.foodsOrder?.foods[index].quantity > 1) {
                    state.foodsOrder.foods[index].quantity--
                    state.foodsOrder.foods[index].totalEachFood -= state.foodsOrder.foods[index].foodId.revenue
                    state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                        return acc + current.totalEachFood
                    }, 0)

                }
            }
        },
        changeQuantityInputOD: (state, action: PayloadAction<{ _id: string, value: number }>) => {
            const index = state.foodsOrder?.foods?.findIndex(item => item.foodId._id === action.payload._id)
            if (index || index == 0) {
                if (state.foodsOrder?.foods[index].quantity) {
                    state.foodsOrder.foods[index].quantity = action.payload.value
                    state.foodsOrder.foods[index].totalEachFood = state.foodsOrder.foods[index].quantity * state.foodsOrder.foods[index].foodId.revenue
                    state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                        return acc + current.totalEachFood
                    }, 0)

                }

            }
        },
        deleteOneFoodOD: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.foodsOrder?.foods?.find(item => item.foodId._id === action.payload.id)
            if (index || index == 0) {
                if (state.foodsOrder?.foods) {
                    state.foodsOrder.foods = state.foodsOrder.foods.filter(item => item.foodId._id !== index.foodId._id)
                    state.total = sumTotal(state.foods)
                    state.foodsOrder.subTotal = state.foodsOrder?.foods.reduce((acc, current) => {
                        return acc + current.totalEachFood
                    }, 0)
                }
            }
        },
        closeOrder: (state) => {
          state.foodsOrder = undefined
        },
        // cancelUpdate: (state)=>{
        //     state.foodsOrder

        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryWFood.fulfilled, (state, action) => {
            state.categoryWFood = action.payload
        })
    },
})
export const { deleteOneFoodOD,closeOrder, changeQuantityInputOD, setOpenModalPayment, increaseQuantityOD, decreaseQuantityOD, setfoodsOrder, addFoodInFoodsOrder, createFoodArr, deleteFoodArr, deleteTotal, increaseQuantity, decreaseQuantity, changeQuantityInput, confirmOrder, setOpenModalConfirm, deleteOneFood } = foodsSlice.actions;
export default foodsSlice.reducer