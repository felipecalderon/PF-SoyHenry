import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPremium: false,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    setPremium: (state) => {
      state.isPremium = true;
    },
    setBasic: (state) => {
      state.isPremium = false;
    },
  },
});

export const { setPremium, setBasic } = premiumSlice.actions;
export default premiumSlice.reducer;
