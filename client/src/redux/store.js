import { configureStore} from '@reduxjs/toolkit'
import postSlice from './slices/postSlices'
export default configureStore({
    reducer: {
        postSlice
    }
})