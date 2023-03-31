import { createSlice } from '@reduxjs/toolkit'


export const recruiterSlice = createSlice({
    name: 'recruiterSlice',
     initialState: {
        offers: null,

    },
    reducers: {
        saveOffers: (state, action) => {
            state.offers = action.payload
        },
    }
});   

export const { saveOffers } = recruiterSlice.actions
export default recruiterSlice.reducer