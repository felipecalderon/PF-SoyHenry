import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const postFetchNewUsers = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);