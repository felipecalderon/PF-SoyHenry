import { createSlice } from "@reduxjs/toolkit";


const userRegisterSlice = createSlice({
    name: 'userRegisterSlice',
    initialState: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        document: ''
    },
    reducers: {
        postUserName: (state, action) => {
            state.name = action.payload
        },

        postUserLastname: (state, action) => {
            state.lastname = action.payload
        },

        postUserEmail: (state, action) => {
            state.email = action.payload
        },

        postUserPassword: (state, action) => {
            state.password = action.payload
        },

        postUserDocument: (state, action) => {
            state.document = action.payload
        },
    }
})

export const { postUserName, postUserLastname, postUserEmail, postUserPassword, postUserDocument } = userRegisterSlice.actions
export default userRegisterSlice.reducer