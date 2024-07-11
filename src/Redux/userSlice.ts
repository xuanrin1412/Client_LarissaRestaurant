import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { IUserInfo } from "../common/types/userInfo"

interface IUser {
    refreshUserAccount: boolean,
    refreshAreaWithTable: boolean,
    refreshBooking: boolean,
    userInfo: IUserInfo | null,
}
const initialState: IUser = {
    refreshUserAccount: false,
    refreshAreaWithTable:false,
    refreshBooking:false,
    userInfo: null,
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRefreshUserAccount: (state, action: PayloadAction<boolean>) => {
            state.refreshUserAccount = action.payload
        },
        setRefreshBooking: (state, action: PayloadAction<boolean>) => {
            state.refreshBooking = action.payload
        },
        setRefreshAreaWithTable: (state, action: PayloadAction<boolean>) => {
            state.refreshAreaWithTable = action.payload
        },
        setUserInfo: (state, action: PayloadAction<{ userInfo: IUserInfo }>) => {
            state.userInfo = action.payload.userInfo
        },
        updateUserInfo: (state, action: PayloadAction<{ userInfo: IUserInfo }>) => {
            state.userInfo = action.payload.userInfo
        },
        updateUserAvatar: (state, action: PayloadAction<string>) => {
            console.log('Updating avatar to:', action.payload);
            if (state.userInfo) {
                state.userInfo.avatar = action.payload;
            }
            console.log('Updated state.userInfo', current(state.userInfo));
        },
        clearUserInfo: (state) => {
            state.userInfo = null
        },

    }
})
export const {setRefreshBooking, setRefreshUserAccount,setRefreshAreaWithTable, setUserInfo, updateUserInfo, clearUserInfo, updateUserAvatar } = userSlice.actions;
export default userSlice.reducer