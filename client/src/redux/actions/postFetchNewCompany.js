import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const postFetchNewCompany = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {      
      const response = await axios.post('/company', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);