import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface IFoodSlice {
    _id: string;
    quantity: number;
}

export interface IState {
    foods: IFoodSlice[];
}

const initialState: IState = {
    foods: []
};
const foodsSlice = createSlice({
    name: "foods",
    initialState,
    reducers:{
        createFoodArr: (state,action: PayloadAction<{_id:string, quantity:number}>)=>{
            const newFood = {
                _id : action.payload._id ,
                quantity: action.payload.quantity
            }
            state.foods.push(newFood)
        },
        increaseQuantity: (state, action: PayloadAction<{ _id: string}>) => {
            const { _id } = action.payload;
            const index = state.foods.findIndex(item => item._id === _id);
            console.log("index",index);
            
            if (index !== -1) {
                state.foods[index].quantity = 5;
            }
        }
        
    }
})
export const {createFoodArr,increaseQuantity} = foodsSlice.actions;
export default foodsSlice.reducer