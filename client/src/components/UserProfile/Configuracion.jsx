import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import usuario from "../../assets/user.png";
import validacionConfig from "./validacionconfig";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Chip, Grid } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch } from "react-redux";
import { fetchCountries } from "../../redux/slices/countriesSlices";


function Configuracion() {
  const [skills, setSkills] = useState([]);
  const [showErrors, SetShowErrors] = useState(false);
  const [profile,setProfile]=useState({
    nombre: "",
    apellido: "",
    photo:"",
  })
  const [form, SetForm] = useState({
  nombre:"",
  apellido:"",
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

  const [inConfig, SetInConfig] = useState(false);


    const dispatch = useDispatch();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [countryData, setCountryData] = useState([]);
    
  
    useEffect(() => {
      dispatch(fetchCountries())
        .then((response) => setCountryData(response.payload));
    }, [dispatch]);
  
    const handleCountryChange = (event) => {
      const country = event.target.value;
      setSelectedCountry(country);
      setSelectedCity('');
    };
    const handleCityChange = (event) => {
      setSelectedCity(event.target.value);
    };
  
    const filteredCities = selectedCountry
      ? countryData.find((country) => country.country === selectedCountry)?.cities
      : [];


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
  const handleButtonSkill=(event) =>{
  SetForm({
    ...form,
    habilidades: [...form.habilidades].filter(
      (el) => el !== event.target.value
    ),
  });}

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in error) {
      if (error[key]) {
        SetShowErrors(true);
      }
    }
   
  };
  const actualizarData = (event) => {
    const { name, value } = event.target;
    SetForm({
      ...form,
      [name]: value,
    });
    
  };
  // const dataUserLocal = localStorage.getItem("usergoogle")? localStorage.getItem("usergoogle"):localStorage.getItem("userLogin")
  // const dataUserlocalstorage = JSON.parse(dataUserLocal);
  // const [nombre, apellido] =dataUserLocal.name? dataUserlocalstorage.name.split(" "):[dataUserlocalstorage.names,dataUserlocalstorage.lastnames]


  useEffect(() => {
    if (skills.length === 0) {
      axios("/technologies").then((res) => setSkills(res.data));
    }
    validacionConfig(form, SetError);
  }, [form, skills]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between items-start p-4"
    >
      <Box>

      <img
        src={profile.photo || usuario}
        alt=""
        width="150px"
        className="border rounded-full m-4"
        />

<div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400  w-full flex items-center justify-between">
    <TextField
      id="nombre"
      label="Nombre"
      className="form-input mt-1 block rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base "
      name="nombre"
      value={form.nombre}
     onChange={actualizarData}
    />

    <TextField
      id="apellido"
      label="Apellido"
      className="form-input mt-1 block  rounded-md border-gray-300 shadow-sm w-1/3 text-center mx-2 text-base"
      name="apellido"
      value={form.apellido}
      onChange={actualizarData}
    />
    <InputLabel htmlFor="edad">Edad</InputLabel>

    <TextField
      id="edad"
      className="form-input mt-1 block rounded-md border-gray-300 shadow-sm mx-2 text-base"
      type="number"
      inputProps={{
        min: "18",
        max: "120",
        name: "edad",
      }}
      value={form.edad}
      onChange={actualizarData}
    />
  </div>
  {showErrors ? (
    <div className="flex justify-between w-full mb-3">
      <span className=" select-none text-xs font-bold text-red-600">
        {error?.nombre}
      </span>
      <span className="  select-none text-xs font-bold text-red-600">
        {error?.apellido}
      </span>
      <span className="  select-none text-xs font-bold text-red-600">
        {error?.edad}
      </span>
    </div>
  ) : null}
  <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full ">
  <FormControl fullWidth>
  <InputLabel id="genero-label">Genero</InputLabel>
  <Select
    labelId="genero-label"
    name="genero"
    id="genero"
    label="Genero"
    onChange={actualizarData}
  >
    <MenuItem value="">Seleccione genero</MenuItem>
    <MenuItem value="Prefiero no decirlo">Prefiero no decirlo</MenuItem>
    <MenuItem value="Masculino">Hombre</MenuItem>
    <MenuItem value="Femenino">Mujer</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel id="discapacidad-label">¿Posee alguna discapacidad?</InputLabel>
  <Select
    labelId="discapacidad-label"
    id="discapacidad"
    label="¿Posee alguna discapacidad?"
    name="discapacidad"
    onChange={actualizarData}
  >
    <MenuItem value="">¿Posee alguna discapacidad?</MenuItem>
    <MenuItem value="No">No</MenuItem>
    <MenuItem value="Visual">Visual</MenuItem>
    <MenuItem value="Auditiva">Auditiva</MenuItem>
    <MenuItem value="Física">Física</MenuItem>
    <MenuItem value="Intelectual">Intelectual</MenuItem>
  </Select>
</FormControl>
</div>

   
      {showErrors ? (
        <div className="flex justify-around w-full  ">
          <span className=" select-none text-xs font-bold text-red-600 ml-4">
      {error?.genero}
    </span>
          <span className=" select-none text-xs font-bold text-red-600">
            {error?.discapacidad}
          </span>
        </div>
      ) : null}



<FormControl fullWidth>
  <InputLabel id="country-label">Pais</InputLabel>
  <Select
    labelId="country-label"
    id="country-select"
    name="pais"
    value={selectedCountry}
    label="Pais"
    onChange={handleCountryChange}
  >
    <MenuItem value="">Seleccione Pais</MenuItem>
    {countryData.map((country) => (
      <MenuItem key={country.country} value={country.country}>
        {country.country}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<FormControl fullWidth>
  <InputLabel id="city-label">Ciudad</InputLabel>
  <Select
    labelId="city-label"
    id="city-select"
    name="ciudad"
    value={selectedCity}
    label="Ciudad"
    onChange={handleCityChange}
    disabled={!selectedCountry}
  >
    <MenuItem value="">Seleccione ciudad</MenuItem>
    {filteredCities.map((city) => (
      <MenuItem key={city} value={city}>
        {city}
      </MenuItem>
    ))}
  </Select>
</FormControl>
     

      {showErrors ? (
        <div className="flex justify-around w-full ">
          
          <span className=" select-none text-xs font-bold text-red-600">
            {error?.pais}
          </span>
          <span className=" select-none text-xs font-bold text-red-600">
            {error?.ciudad}
          </span>
        </div>
      ) : null}
      
      


      <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full">
  
  <TextField
    type="text"
    name="titulo"
    label="Titulo"
    onChange={actualizarData}
    placeholder="Por ejemplo: Desarrollador Web Full Stack con experiencia en React y Node.js"
    id="titulo"
    variant="outlined"
    fullWidth
    size="medium"
  />
</div>
{showErrors ? (
  <div className="flex justify-center w-full">
    <span className="select-none text-xs font-bold text-red-600">
      {error?.titulo}
    </span>
  </div>
) : null}

     

<div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-col">
  
  <TextField
    id="descripcion"
    name="descripcion"
    label="Descripcion"
    onChange={actualizarData}
    placeholder="Describa sus habilidades, experiencia y objetivos profesionales relacionados con el sector de TI. Incluya detalles sobre sus conocimientos en lenguajes de programación, tecnologías y herramientas, así como su capacidad para trabajar en equipo y resolver problemas técnicos complejos."
    multiline
    rows={5}
    variant="outlined"
    fullWidth
    size="medium"
  />
</div>
{showErrors ? (
  <div className="flex justify-center w-full">
    <span className="select-none text-xs font-bold text-red-600">
      {error?.descripcion}
    </span>
  </div>
) : null}
 <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full justify-center">
 <FormControl fullWidth>
  <InputLabel id="experiencia-label">Experiencia en el sector IT</InputLabel>
  <Select
    labelId="experiencia-label"
    id="experiencia"
    name="experiencia"
    label="Experiencia en el sector IT"
    onChange={actualizarData}
    variant="outlined"
    size="medium"
  >
  
    <MenuItem value="0">Sin experiencia</MenuItem>
    <MenuItem value="1">1 año</MenuItem>
    <MenuItem value="2-4">2 a 4 años</MenuItem>
    <MenuItem value="5">más de 5 años</MenuItem>
  </Select>
  {showErrors && (
    <FormHelperText error>{error?.experiencia}</FormHelperText>
  )}
</FormControl>

</div>
{showErrors ? (
  <div className="flex justify-center w-full">
    <span className="select-none text-xs font-bold text-red-600">
      {error?.experiencia}
    </span>
  </div>
) : null}

       
      <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full ">
      
    <TextField
      type="text"
      name="idioma"
      label="Idioma"
      onChange={actualizarData}
      placeholder="Ej: Inglés - Avanzado, Español - Nativo, Francés - Básico"
      id="idioma"
      variant="outlined"
      fullWidth
      size="medium"
      
    />
 
        {showErrors ? (
          <div className="flex justify-center w-full ">
            <span className=" select-none text-xs font-bold text-red-600">
              {error?.idiomas}
            </span>
          </div>
        ) : null}

        <Select
          name="skills"
          id="Habilidades"
          label="Habilidades"
          onChange={handleSelectSkills}
          className="w-2/3 form-input mt-1 block  rounded-md border-gray-300 shadow-sm text-base flex-grow mx-2"
        >
          <MenuItem value="">Seleccionar Habilidad</MenuItem>

          {skills?.map((el) => (
            <MenuItem value={el.Technology}>{el.Technology}</MenuItem>
          ))}
        </Select>
      

        <div
          className="flex flex-wrap justify-center overflow-y-auto"
          style={{
            height: " 50%",
            width: "100%",
            alignContent: "start",
          }}
        >
          {form.habilidades?.length
            ? form.habilidades.map((skill, index) => (
                <button
                  className="m-2 p-1 rounded-xl bg-white border text-sm text-center flex justify-between items-center hover:bg-gray-100 active:bg-gray-200 focus:outline-none flex-shrink"
                  onClick={handleButtonSkill}
                  value={skill}
                  key={skill}
                  id={index}
                >
                  {skill}
                </button>
              ))
            : <>
              <p className={` select-none font-bold  mb-1 ${showErrors && error.habilidades?"text-red-600":"text-white"} text-xl text-center`}>La lista de habilidades está vacía.</p><br/><p className="select-none text-gray-400 text-sm text-center"> Seleccione una habilidad para continuar</p>
            </>}

        </div>
      </div>

      <div className=" text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 w-full">
        Datos de contacto
        <div>
          <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-wrap">
          <TextField
      type="tel"
      name="tel"
      label="Telefono"
      onChange={actualizarData}
      placeholder="Por ejemplo: +1 555-123-4567"
      id="tel"
      variant="outlined"
      fullWidth
      size="medium"
      
    />
            {showErrors ? (
              <div className="flex justify-center w-full ">
                <span className=" select-none text-xs font-bold text-red-600">
                  {error?.tel}
                </span>
              </div>
            ) : null}
          </div>

          <TextField
    type="url"
    name="facebook"
    label="Facebook"
    onChange={actualizarData}
    placeholder="https://www.facebook.com/tu_nombre_de_usuario"
    id="facebook"
    variant="outlined"
    fullWidth
    size="medium"
  />

          {showErrors ? (
            <div className="flex justify-center w-full ">
              <span className=" select-none text-xs font-bold text-red-600">
                {error?.facebook}
              </span>
            </div>
          ) : null}
          <TextField
    type="url"
    name="linkedin"
    label="Linkedin"
    onChange={actualizarData}
    placeholder="https://www.linkedin.com/in/tu_nombre_de_usuario"
    id="linkedin"
    variant="outlined"
    fullWidth
    size="medium"
  />
          {showErrors ? (
            <div className="flex justify-center w-full ">
              <span className=" select-none text-xs font-bold text-red-600">
                {error?.linkedin}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex justify-around  w-full mt-6">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Aceptar Cambios
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  "
          onClick={()=>{}}
        >
          Descartar Cambios
        </button>
      </div>
          </Box>
    </form>
  );
}

export default Configuracion;
