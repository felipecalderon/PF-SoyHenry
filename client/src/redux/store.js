import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postSlice from './slices/postSlices'
import userRegisterSlice from './slices/userRegisterSlice'


export default configureStore({
    reducer: {
        postSlice,
        userRegisterSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})