import React from 'react';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useEffect } from 'react';




export default function Tags() {
  const [skills, setSkills] = useState([]);

  const [showErrors, SetShowErrors] = useState(false);
  const [form, SetForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    genero: "",
    experiencia: "",
    discapacidad: "",
    ciudad:"",
    pais:"",
    titulo: "",
    descripcion: "",
    idioma: "",
    habilidades: [],
    tel: "",
    linkedin: "",
    facebook: "",
  });
  const [error, SetError] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    titulo: "",
    genero: "",
    experiencia: "",
    discapacidad: "",
    ciudad:"",
    pais:"",
    descripcion: "",
    idiomas: "",
    habilidades: "",
    tel: "",
    linkedin: "",
    facebook: "",
  });
    useEffect(()=>{ if (skills?.length === 0) {
        axios("/technologies").then((res) => setSkills(res.data));

      }})
      const handleSelectSkills = (event) => {
        const { value } = event.target;
        if (form.habilidades.includes(value)) {
          SetForm({
            ...form,
            habilidades: [...form.habilidades].filter(
              (element) => element !== value
            ),
          });
        } else if (value !== "") {
          SetForm({ ...form, habilidades: [...form.habilidades, value] });
        }
      };
      const handleChange = (event) => {
        setSkills(event.target.value);
      };

      return (
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Habilidades</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={skills}
              label="Habilidades"
              onChange={handleChange}
            >
              <MenuItem value="Habilidades">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            {/* <FormHelperText>With label + helper text</FormHelperText> */}
          </FormControl>
         
        </div>
      );

  // return (
    
  //   <Stack spacing={3} sx={{ width: 500}}>
     
  //     <Autocomplete 
  //       multiple
  //       id="tags-outlined"
  //       name="skills"
  //       options={skills}
  //       getOptionLabel={(option) => option.Technology}
  //       filterSelectedOptions
  //       renderInput={(params) => (
  //         <TextField sx={{overflow: 'auto'}}
  //           {...params}
  //           label="Habilidades"
  //           placeholder=""
  //         />
  //       )}
  //     />
     
      
  //   </Stack>
    
  // );
}


