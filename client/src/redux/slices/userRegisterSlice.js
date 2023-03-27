import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        user: null
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { saveUser } = userRegisterSlice.actions
export default userRegisterSlice.reducer