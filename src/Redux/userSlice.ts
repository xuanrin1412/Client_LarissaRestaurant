import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface UserState {
    userName: string | undefined;
    userRole: string  | undefined;
    userId: string  | undefined;
}

const initialState:UserState = {
    userName: "",
    userRole: "",
    userId: ""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserName: (state,action: PayloadAction<string>)=>{
            state.userName = action.payload;
        },
        setUserId: (state,action: PayloadAction<string>)=>{
            state.userId = action.payload;
        },
        setUserRole: (state,action: PayloadAction<string>)=>{
            state.userRole = action.payload;
        }
    }
})
export const {setUserName,setUserId, setUserRole} = userSlice.actions;
export default userSlice.reducer