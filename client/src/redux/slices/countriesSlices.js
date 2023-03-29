import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async () => {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
      const countryData = response.data.data;
      const countryCities = countryData.map((country) => {
        return {
          country: country.country,
          cities: country.cities.map((city) => city),
        };
      });
      return countryCities;
    }
  );
