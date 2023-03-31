import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCountries } from "../../redux/slices/countriesSlices";

import validacionConfig from "./validacionconfig";
import FotodePerfil from "./FotodePerfil";

// mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from '@mui/material/Modal';
// import Autocomplete from "@mui/material/Autocomplete";
// import Stack from "@mui/material/Stack";
// import { Chip, Grid } from "@mui/material";
// import FormHelperText from "@mui/material/FormHelperText";



function Configuracion() {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [showErrors, SetShowErrors] = useState(false);
  const dataUserGoogle = JSON.parse(localStorage.getItem("usergoogle"));
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));

  // config para los datos de los select
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [form, SetForm] = useState({
    rol: "Postulante",
    email: dataUserLocalStorage.email,
    names: dataUserLocalStorage.names,
    lastnames: dataUserLocalStorage.lastnames,
    age: dataUserLocalStorage.Postulants[0].age,
    gender: dataUserLocalStorage.Postulants[0].gender,
    experience: dataUserLocalStorage.Postulants[0].experience,
    disability: dataUserLocalStorage.Postulants[0].disability,
    city: dataUserLocalStorage.city,
    country: dataUserLocalStorage.country,
    title: dataUserLocalStorage.Postulants[0].title,
    description_postulant: dataUserLocalStorage.Postulants[0].description_postulant,
    languages: dataUserLocalStorage.Postulants[0].languages,
    tecnology: dataUserLocalStorage.Postulants[0].tecnology,
    phone: dataUserLocalStorage.phone,
    linkedin: dataUserLocalStorage.Postulants[0].linkedin,
    facebook: dataUserLocalStorage.Postulants[0].facebook,
  });
  const [error, SetError] = useState({
    names: "",
    lastnames: "",
    age: "",
    title: "",
    gender: "",
    experience: "",
    disability: "",
    city: "",
    country: "",
    description_postulant: "",
    idiomas: "",
    tecnology: "",
    phone: "",
    linkedin: "",
    facebook: "",
  });

  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    dispatch(fetchCountries()).then((response) =>
      setCountryData(response.payload)
    );
  }, [dispatch]);

  // const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(form.country || '');
  const [selectedCity, setSelectedCity] = useState(form.city || '');

  const handleCountryChange = (event) => {
    SetForm({
      ...form,
      country: event.target.value,
    });
    setSelectedCountry(event.target.value);
    setSelectedCity("");
  };
  const handleCityChange = (event) => {
    SetForm({
      ...form,
      city: event.target.value,
    });
    setSelectedCity(event.target.value);
  };

  const filteredCities = selectedCountry && countryData.length > 0
    ? countryData?.find((country) => country.country === selectedCountry)?.cities
    : [];

  const handleSelectSkills = (event) => {
    const { value } = event.target;
    if (form.tecnology.includes(value)) {
      SetForm({
        ...form,
        tecnology: [...form.tecnology].filter((element) => element !== value),
      });
    } else if (value !== "") {
      SetForm({ ...form, tecnology: [...form.tecnology, value] });
    }
  };
  const handleButtonSkill = (event) => {
    SetForm({
      ...form,
      tecnology: [...form.tecnology].filter((el) => el !== event.target.value),
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const errorsValue = Object.values(error);
  const isErrorsEmpty = errorsValue.every(value => value === '');

  const handleSubmit = async (event) => {
    handleOpen()
    if (isErrorsEmpty) {
      const update = await axios.post("/auth/register", form)
      console.log(update)
      window.location.reload()
      window.scrollTo(0, 0); // Llamamos a scrollTo() para desplazarnos al inicio
    }
  };

  const actualizarData = (event) => {
    const { name, value } = event.target;
    SetForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    if (skills.length === 0) {
      axios("/technologies").then((res) => setSkills(res.data));
    }
    validacionConfig(form, SetError);
  }, [form, skills]);

  return (
    <>
      <form className="w-full flex flex-col justify-between items-start px-3 pb-5">
        <div className="w-full flex flex-col mb-8">
          <FotodePerfil photo={dataUserGoogle.photo} />
        </div>

        <Box
          className="w-full flex flex-col "
          component="form"
          sx={{
            '& > :not(style)': { marginY: 1 },
            '& .MuiInputBase-input': { color: '#f5f5f5' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#f5f5f5',
              },
            },
            '& .MuiInputLabel-root': { color: '#f5f5f5' }
          }}
          noValidate
          autoComplete="on"
        >

          <div className=" text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 w-full flex justify-between">
            <TextField id="names" label="Nombre" className="w-1/3" name="names" value={form.names} onChange={actualizarData} error={!!error.names} helperText={error.names} />
            <TextField id="lastnames" label="Apellido" className="w-1/3 " name="lastnames" value={form.lastnames} onChange={actualizarData} error={!!error.lastnames} helperText={error.lastnames} />
            <TextField id="age" label='Edad' type="number" className="w-1/4" value={form.age} onChange={actualizarData} error={!!error.age} helperText={error.age}
              inputProps={{
                min: "18",
                max: "120",
                name: "age",
              }}
            />
          </div>

          <div className=" text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full ">
            <FormControl fullWidth sx={{ marginRight: 1 }}>
              <InputLabel id="gender-label">Genero</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                id="gender"
                label="Genero"
                onChange={actualizarData}
                value={form.gender}
                error={!!error.gender}
                helperText={error.gender}
              >
                <MenuItem value="">Seleccione genero</MenuItem>
                <MenuItem value="Prefiero no decirlo">
                  Prefiero no decirlo
                </MenuItem>
                <MenuItem value="Masculino">Hombre</MenuItem>
                <MenuItem value="Femenino">Mujer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="disability-label">¿Posee alguna discapacidad?</InputLabel>
              <Select
                labelId="disability-label"
                id="disability"
                label="¿Posee alguna disability?"
                name="disability"
                onChange={actualizarData}
                value={form.disability}
                error={!!error.disability}
                helperText={error.disability}
              >
                <MenuItem value="">¿Tienes alguna disability?</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Visual">Visual</MenuItem>
                <MenuItem value="Auditiva">Auditiva</MenuItem>
                <MenuItem value="Física">Física</MenuItem>
                <MenuItem value="Inphoneectual">Inphoneectual</MenuItem>
              </Select>
            </FormControl>
          </div>

          <FormControl fullWidth>
            <InputLabel id="country-label">País</InputLabel>
            <Select
              labelId="country-label"
              id="country-select"
              name="country"
              value={selectedCountry}
              label="Pais"
              onChange={handleCountryChange}
              MenuProps={MenuProps}
              error={!!error.country}
              helperText={error.country}
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
              name="city"
              value={selectedCity}
              label="Ciudad"
              onChange={handleCityChange}
              disabled={!selectedCountry}
              MenuProps={MenuProps}
              error={!!error.city}
              helperText={error.city}
            >
              <MenuItem value="">Seleccione city</MenuItem>
              {filteredCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full">
            <TextField
              type="text"
              name="title"
              label="Titulo"
              onChange={actualizarData}
              value={form.title}
              placeholder="Por ejemplo: Desarrollador Web Full Stack con experiencia en React y Node.js"
              id="title"
              variant="outlined"
              fullWidth
              size="medium"
              error={!!error.title}
              helperText={error.title}
            />
          </div>

          <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-col">
            <TextField
              id="description_postulant"
              name="description_postulant"
              value={form.description_postulant}
              label="Descripcion"
              onChange={actualizarData}
              placeholder="Describa sus tecnology, experiencia y objetivos profesionales relacionados con el sector de TI. Incluya detalles sobre sus conocimientos en lenguajes de programación, tecnologías y herramientas, así como su capacidad para trabajar en equipo y resolver problemas técnicos complejos."
              multiline
              rows={5}
              variant="outlined"
              fullWidth
              size="medium"
              error={!!error.description_postulant}
              helperText={error.description_postulant}
            />
          </div>
          <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full justify-center">
            <FormControl fullWidth>
              <InputLabel id="experience-label"> Experiencia en el sector IT </InputLabel>
              <Select
                labelId="experience-label"
                id="experience"
                name="experience"
                label="Experiencia en el sector IT"
                onChange={actualizarData}
                variant="outlined"
                size="medium"
                value={form.experience}
                error={!!error.experience}
                helperText={error.experience}
              >
                <MenuItem value="">Seleccione</MenuItem>
                <MenuItem value="0">Sin experience</MenuItem>
                <MenuItem value="1">1 año</MenuItem>
                <MenuItem value="2-4">2 a 4 años</MenuItem>
                <MenuItem value="5">más de 5 años</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-col flex-grow w-full ">
            <TextField
              type="text"
              name="languages"
              label="Idioma"
              onChange={actualizarData}
              value={form.languages}
              placeholder="Ej: Inglés - Avanzado, Español - Nativo, Francés - Básico"
              id="languages"
              variant="outlined"
              fullWidth
              size="medium"
              error={!!error.languages}
              helperText={error.languages}
            />
          </div>
          <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-col flex-grow w-full ">
            <hr className="border border-purple-900 dark:border-white mt-4" />
            <p className=" m-4 text-2xl font-bold text-center dark:text-white" > Habilidades </p>
            <Select
              id="tecnology"
              name="tecnology"
              variant="outlined"
              onChange={handleSelectSkills}
              size="medium"
              className="w-full form-input mt-1 block  rounded-md border-gray-300 shadow-sm text-base flex-grow "
              MenuProps={MenuProps}
              error={!!error.tecnology}
              helperText={error.tecnology}
            >
              {skills?.map((el) => (
                <MenuItem value={el.Technology}>{el.Technology}</MenuItem>
              ))}
            </Select>

            <div
              className="flex flex-wrap justify-center overflow-y-auto"
              style={{
                height: " 90px",
                width: "100%",
                alignContent: "start",
              }}
            >
              {form.tecnology?.length ? (
                form.tecnology.map((skill, index) => (
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
              ) : (
                <>
                  <p
                    className={` select-none font-bold  mb-1 ${showErrors && error.tecnology
                      ? "text-red-600"
                      : "text-white"
                      } text-xl text-center`}
                  >
                    La lista de tecnology está vacía.
                  </p>
                  <br />
                  <p className="select-none text-gray-400 text-sm text-center">
                    {" "}
                    Seleccione una habilidad para continuar
                  </p>
                </>
              )}
            </div>
          </div>

          <div className=" text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 w-full">
            <hr className="border border-purple-900 dark:border-white my-6" />
            <p className=" m-4 text-2xl font-bold text-center dark:text-white" > Datos de contacto </p>
            <div>
              <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-wrap">
                <TextField
                  type="phone"
                  name="phone"
                  label="Telefono"
                  value={form.phone}
                  onChange={actualizarData}
                  placeholder="Por ejemplo: +1 555-123-4567"
                  id="phone"
                  variant="outlined"
                  fullWidth
                  size="medium"
                  error={!!error.phone}
                  helperText={error.phone}
                />
              </div>
              <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-wrap">
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
                  error={!!error.facebook}
                helperText={error.facebook}
                />
              </div>
              <div className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400 flex flex-grow w-full flex-wrap">
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
                  error={!!error.linkedin}
                helperText={error.linkedin}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly  w-full my-6">
            <button
            onClick={handleSubmit}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Aceptar Cambios
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  "
              onClick={() => { }}
            >
              Cancelar
            </button>
          </div>
        </Box>
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box class="flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 bg-primary-light dark:bg-primary-dark border-2 shadow-24 p-4 h-1/2 rounded-2xl flex-col justify-center items-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
                !Estamos actualizando tus datos!
              </h1>
              <h2 className="text-2xl  text-center dark:text-white">
                Esto nos tomara unos segundos...
              </h2>
              <h3 className="mt-8  text-2xl font-bold text-center dark:text-white">
                !Manten tus datos siempre actualizados!
              </h3>
            </Box>
          </Modal>
        </div>
      </form>
    </>
  );
}

export default Configuracion;
