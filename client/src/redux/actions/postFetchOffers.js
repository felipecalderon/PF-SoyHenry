import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

// definir la acción asincrónica
export const createOffer = createAsyncThunk(
  'offers/createOffer',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/jobs', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
