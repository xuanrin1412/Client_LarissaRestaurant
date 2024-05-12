import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
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
    total: number
}
const initialState: IState = {
    foods: [],
    order: [],
    categoryWFood:[],
    total: 0

};
const foodsSlice = createSlice({
    name: "foods",
    initialState,
    reducers:{
        createFoodArr: (state,action: PayloadAction<{food:IFood, quantity:number ,arrIdTableHaveOrder?:IOrder|undefined}>)=>{
            const test= action.payload.arrIdTableHaveOrder
            console.log("action.payload.arrIdTableHaveOrder",test?.tableId);
            const index = state.foods.findIndex(item=>item.food._id === action.payload.food._id)
            console.log("index",index);

            if(test?.tableId){
                const newFood = {
                    food : action.payload.food ,
                     quantity: action.payload.quantity,
                     totalEachFood: action.payload.food.revenue
                 }
                const filterOrder = state.order.find(item=>item.tableId == test?.tableId )?.food
                console.log("filterOrder",JSON.parse(JSON.stringify(filterOrder)));
                console.log("filterOrder-Foods",JSON.parse(JSON.stringify(filterOrder)));
                filterOrder?.push(newFood)
                // console.log("filterOrder",JSON.parse(JSON.stringify(state.order.filter(item=>item.tableId == test? ))));
                // state.order
            }else{
                if(index !==-1){
                    console.log("state.foods dup before",JSON.parse(JSON.stringify(state.foods)))
                     state.foods[index].quantity ++
                     state.foods[index].totalEachFood = state.foods[index].quantity * action.payload.food.revenue
                     state.total = sumTotal(state.foods)
                     console.log("state.foods dup after",JSON.parse(JSON.stringify(state.foods)))
                }else{
                    const newFood = {
                       food : action.payload.food ,
                        quantity: action.payload.quantity,
                        totalEachFood: action.payload.food.revenue
                    }
                    console.log("newFood", newFood);
                    state.foods.push(newFood)
                    state.total = sumTotal(state.foods)
                    console.log("state.foods ko dup",state.foods.slice() );
                }
            }







           


            // object order         làm sao dderd thêm  newFood => filterOrder-Foods[]]
            if(test?.tableId){
                const newFood = {
                    food : action.payload.food ,
                     quantity: action.payload.quantity,
                     totalEachFood: action.payload.food.revenue
                 }
                const filterOrder = state.order.filter(item=>item.tableId == test?.tableId )
                console.log("filterOrder",JSON.parse(JSON.stringify(filterOrder[0])));
                console.log("filterOrder-Foods",JSON.parse(JSON.stringify(filterOrder[0].food)));
                filterOrder[0].food.push(newFood)
                // console.log("filterOrder",JSON.parse(JSON.stringify(state.order.filter(item=>item.tableId == test? ))));
                // state.order
            }
        },
        deleteFoodArr: (state)=>{
           state.foods = []
        },
        deleteTotal: (state)=>{
            state.total = 0
         },
        increaseQuantity: (state, action: PayloadAction<{ _id: string}>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            console.log("increaseQuantity",index);
            console.log(state,action);
            state.foods[index].quantity ++
            state.foods[index].totalEachFood = state.foods[index].quantity * state.foods[index].food.revenue
            state.total = sumTotal(state.foods)
        },
        decreaseQuantity: (state, action: PayloadAction<{ _id: string}>) => {
            const index = state.foods.findIndex(item => item.food._id === action.payload._id);
            console.log("decreaseQuantity",index);
            if(state.foods[index].quantity >1){
                state.foods[index].quantity -- 
                state.foods[index].totalEachFood -= state.foods[index].food.revenue
            }
            state.total = sumTotal(state.foods)
        },
        confirmOrder:(state, action: PayloadAction<{ food: IFoodSlice[], total:number, tableId:string, userName:string|undefined}>) => {
            console.log("confirmOrder resdux",action.payload.food, action.payload.total);
            const newOrder ={
                food: action.payload.food,
                total:action.payload.total,
                tableId:action.payload.tableId,
                userName: action.payload.userName
            }
            state.order.push(newOrder)
            console.log("order",JSON.parse(JSON.stringify(state.order)));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategoryWFood.fulfilled, (state, action) => {
          state.categoryWFood = action.payload
        })
      },
})
export const {createFoodArr,deleteFoodArr,deleteTotal,increaseQuantity,decreaseQuantity,confirmOrder} = foodsSlice.actions;
export default foodsSlice.reducer