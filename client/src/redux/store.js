import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postSlice from './slices/postSlices'
import userRegisterSlice from './slices/userRegisterSlice'
import recruiterSlice from './slices/recruiterSlice'


export default configureStore({
    reducer: {
        postSlice,
        userRegisterSlice,
        recruiterSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})