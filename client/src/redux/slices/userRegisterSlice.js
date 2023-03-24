import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        user: null,
        favorites: []

    },
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload
        },
        addFavorites:(state, action) => {
            state.favorites.push = action.payload
        }
    }
})

export const { getUser, addFavorites } = userRegisterSlice.actions
export default userRegisterSlice.reducer