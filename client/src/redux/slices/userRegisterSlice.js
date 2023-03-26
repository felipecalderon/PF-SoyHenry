import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        user: {
            nombre:"",
            apellido:"",
            edad:"",
            ubicacion:"",
            descripcion:"",
            idioma:"",
            habilidades:[],
            tel:"",
            mail:"",
            linkedin:"",
            facebook:"",
            github:""
        },
        favorites: []

    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload
        },
        addFavorites:(state, action) => {
            state.favorites = action.payload
        }
    }
})

export const { saveUser, addFavorites } = userRegisterSlice.actions
export default userRegisterSlice.reducer