import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postSlice from './slices/postSlices'


export default configureStore({
    reducer: {
        postSlice,
        
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
})