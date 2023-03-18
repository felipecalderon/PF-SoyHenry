import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        user: null
    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { getUser } = userRegisterSlice.actions
export default userRegisterSlice.reducer