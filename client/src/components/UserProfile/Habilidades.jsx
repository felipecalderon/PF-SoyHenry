import React from 'react';
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Tags() {

    const [skills, setSkills] = useState()

    useEffect(()=>{ if (skills?.length === 0) {
        axios("/technologies").then((res) => setSkills(res.data));
      }})
   

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
     
      <Autocomplete
        multiple
        id="tags-outlined"
        options={skills}
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
     
      
    </Stack>
  );
}


