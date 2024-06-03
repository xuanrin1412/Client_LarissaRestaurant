// import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// export interface UserState {
//     userName?: string | undefined;
//     userRole?: string | undefined;
//     phoneNumber?: string | undefined;
//     address?: string | undefined;
//     userId?: string | undefined;
// }
// interface userInfo {
//     userAccount: UserState
// }

// const initialState: userInfo = {
//     userAccount: {},

// }
// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         setUserAccount: (state, action: PayloadAction<UserState>) => {
//             state.userAccount.userId = action.payload.userId
//             state.userAccount.userName = action.payload.userName
//             state.userAccount.phoneNumber = action.payload.phoneNumber
//             state.userAccount.address = action.payload.address
//             state.userAccount.userRole = action.payload.userRole
//         },
//         setUserNameEmty: (state)=>{
//             state.userAccount.userName=""
//         },
//         setUserRoleEmty: (state)=>{
//             state.userAccount.userRole=""
//         }
//         // setUserId: (state,action: PayloadAction<string>)=>{
//         //     state.userId = action.payload;
//         // },
//         // setUserRole: (state,action: PayloadAction<string>)=>{
//         //     state.userRole = action.payload;
//         // }
//     }
// })
// export const { setUserAccount,setUserNameEmty,setUserRoleEmty} = userSlice.actions;
// export default userSlice.reducer