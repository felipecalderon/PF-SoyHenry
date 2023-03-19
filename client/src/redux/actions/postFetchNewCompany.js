import { createAsyncThunk } from '@reduxjs/toolkit';

export const postFechNewCompany = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {      
      const response = await fetch('http://localhost:3001/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);