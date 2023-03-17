import { createAsyncThunk } from '@reduxjs/toolkit';

// definir la acción asincrónica
export const createNewUser = createAsyncThunk(
  'user/createNewUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/user', {
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
