import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postJobs: [],
  postData: null,
  jobId: null,
  empresa: null,
}

export const postSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    getPostList: (state, action) => {
      state.postJobs = action.payload
    },

    orderPostListAZ: (state) => {
      state.postJobs = state.postJobs.sort((a, b) => {
        let nombre1 = a.name.toUpperCase();
        let nombre2 = b.name.toUpperCase();
        return (nombre1 < nombre2) ? -1 : (nombre1 > nombre2) ? 1 : 0;
      });
    },

    orderPostListZA: (state) => {
      state.postJobs = state.postJobs.sort((a, b) => {
        let nombre1 = a.name.toUpperCase();
        let nombre2 = b.name.toUpperCase();
        return (nombre1 > nombre2) ? -1 : (nombre1 < nombre2) ? 1 : 0;
      });
    },

    getDataPostulacion: (state, action) => {
      state.jobId = action.payload
    },

    getDataEmpresa: (state, action) => {
      state.empresa = action.payload
    }
  },
})







export const { getPostList, getPostData, orderPostListAZ, orderPostListZA, getDataPostulacion, getDataEmpresa } = postSlice.actions
export default postSlice.reducer;

