import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILodaing {
    loadingImage: boolean
}


const initialState: ILodaing = {
    loadingImage: false,
}
const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setLoadingImage: (state, action: PayloadAction<boolean>) => {
            state.loadingImage = action.payload
        }
    }
})
export const { setLoadingImage } = imageSlice.actions;
export default imageSlice.reducer