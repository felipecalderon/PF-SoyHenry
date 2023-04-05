import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffer } from "../../redux/actions/postFetchOffers";
import axios from 'axios'
import { Link } from "react-router-dom";
import styles from './FormCreateOffers.module.css'
import ModalConfirmChanges from './FormCreateOfferModal'
import { Fragment } from "react";
import { Button, Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Slider, TextField, TextareaAutosize } from "@mui/material";

export default function FormOfferClean() {
    const userData = JSON.parse(localStorage.getItem('userLogin'))
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userRegisterSlice)
    const [showModal, setShowModal] = useState(false);
    const [technologies, setTechnologies] = useState(null)
    const [perksApi, setPerksApi] = useState([])
    const [selectedPerks, setSelectedPerks] = useState([]);
    const [selectedTech, setSelecteTech] = useState([]);
    const [errors, setErrors] = useState({});
    const [salario, setSalario] = useState([100, 500]);

    const [inputs, setInputs] = useState({
        title: '',
        requeriments: '',
        benefits: '',
        functions: '',
        perks: [],
        technologies: [],
        min_salary: '',
        max_salary: '',
        expiration: 5,
        modality: '',
        applications_count: 0,
        experience: '',
        idRecruiterOfferCreate: user?.Companies instanceof Array ? user?.Companies[0].id : user?.Companies?.id,
        by: user?.id // dato que se necesita en postuland
    })
    
    function validate(validar) {

        if (validar.hasOwnProperty('title')) {
            if (validar.title === '') return { ...errors, title: 'se requiere un titulo *' };
            if (validar.title.length) return { ...errors, title: '' };
        }

        if (validar.hasOwnProperty('technologies')) {
            if (validar.technologies.length === 0) return { ...errors, technologies: 'se requiere una tecnologia al menos *' };
            if (validar.technologies.length > 0) return { ...errors, technologies: '' };
        }

        if (validar.hasOwnProperty('perks')) {
            if (validar.perks.length === 0) return { ...errors, perks: 'se requiere una tecnologia al menos *' };
            if (validar.perks.length > 0) return { ...errors, perks: '' };
        }

        if(validar.hasOwnProperty('expiration')) {
            
            if (Number (validar.expiration <= 0)) return { ...errors, expiration: 'ingrese los dias correctos *' };
            if (Number(validar.expiration > 0)) return { ...errors, expiration: '' };
        }

        if (validar.hasOwnProperty('description')) {
            if (validar.description === '') return { ...errors, description: 'se requiere una descripcion *' };
            if (validar.description.length) return { ...errors, description: '' };
        } if (validar.hasOwnProperty('requeriments')) {
            if (validar.requeriments === '') return { ...errors, requeriments: 'se requieren los requisitos *' };
            if (validar.requeriments.length) return { ...errors, requeriments: '' };
        } if (validar.hasOwnProperty('benefits')) {
            if (validar.benefits === '') return { ...errors, benefits: 'se requiere un beneficio *' };
            if (validar.benefits.length) return { ...errors, benefits: '' };
        }
        if (validar.hasOwnProperty('functions')) {
            if (validar.functions === '') return { ...errors, functions: 'se requiere una functions *' };
            if (validar.functions.length) return { ...errors, functions: '' };
        }
        if (validar.hasOwnProperty('modality')) {
            if (validar.modality === '') return { ...errors, modality: 'se requiere una modality *' };
            if (validar.modality.length) return { ...errors, modality: '' };
        }
        if (validar.hasOwnProperty('experience')) {
            if (validar.experience === '') return { ...errors, experience: 'se requiere una experience *' };
            if (validar.experience.length) return { ...errors, experience: '' };
        }
        if (validar.hasOwnProperty('min_salary')) {
            if (validar.min_salary === '') return { ...errors, min_salary: '', min_salary_0: '' };
            if (Number(validar.min_salary) <= 0) return { ...errors, min_salary_0: 'corregir salario minimo o reingresarlo *' };
            if (Number(validar.min_salary) > Number(inputs.max_salary)) return { ...errors, min_salary: 'salario minimo mayor a maximo *' };
            if (Number(validar.min_salary) <= Number(inputs.max_salary) && Number(validar.min_salary) > 0) return { ...errors, min_salary: '', max_salary: '', min_salary_0: '' };
            if (Number(validar.min_salary) > 0) return { ...errors, min_salary_0: '' };
            if (Number(validar.min_salary) <= Number(inputs.max_salary)) return { ...errors, min_salary: '', max_salary: '' }
        }
        if (validar.hasOwnProperty('max_salary')) {
            if (validar.max_salary === '') return { ...errors, max_salary: '', max_salary_0: '' };
            if (Number(validar.max_salary) <= 0) return { ...errors, max_salary_0: 'corregir salario maximo o reingresarlo *' };
            if (Number(validar.max_salary) < Number(inputs.min_salary)) return { ...errors, max_salary: 'salario minimo mayor a maximo *' };
            if (Number(validar.max_salary) >= Number(inputs.min_salary) && Number(validar.max_salary) > 0) return { ...errors, min_salary: '', max_salary: '', max_salary_0: '' };
            if (Number(validar.max_salary) > 0) return { ...errors, max_salary_0: '' };
            if (Number(validar.max_salary) >= Number(inputs.min_salary)) return { ...errors, min_salary: '', max_salary: '' }
        }
        return { ...errors }
    }

    function handleChange(event) {
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });

        setErrors(validate({
            [event.target.name]: event.target.value
        }));
    }

    function controlarValoresErrors(errors, inputs) {
        let acumulador = ''
        let acumulador2 = false
        for (const key in errors) {
            acumulador += errors[key]
        }
        for (const key in inputs) {
            if (inputs[key].length === 0) acumulador2 = true
            if (key === 'min_salary' && inputs[key].length === 0) acumulador2 = false
            if (key === 'max_salary' && inputs[key].length === 0) acumulador2 = false
        }

        if (inputs.min_salary.length && !inputs.max_salary.length) acumulador2 = true
        if (inputs.max_salary.length && !inputs.min_salary.length) acumulador2 = true
        if (!inputs.expiration.length) acumulador2 = true
        if (!inputs.technologies.length) acumulador2 = true
        if (!inputs.perks.length) acumulador2 = true


        if (acumulador === '' && acumulador2 === false) {
            acumulador = false
        } else {
            acumulador = true
        }
        return acumulador

    }

    function handleSelect(event) {
        const selectedValue = event.target.value;
        setSelectedPerks(selectedValue);
        setInputs({
            ...inputs,
            perks: selectedValue
        })
    }

    function handleSelectTechnologies(event) {
        const selectedValue = event.target.value;
        setSelecteTech(selectedValue);
        setInputs({
            ...inputs,
            technologies: selectedValue   
        })
    }

    function handleDeleteTechnologies(event) {
        setInputs({
            ...inputs,
            technologies: inputs.technologies.filter(techno => techno !== event)
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(createOffer(inputs))
        alert('oferta creada')
        setShowModal(false)        
        setInputs({
            title: '',
            requeriments: '',
            benefits: '',
            functions: '',
            perks: [],
            technologies: [],
            min_salary: '',
            max_salary: '',
            expiration: 0,
            modality: '',
            applications_count: 0,
            experience: '',
            idRecruiterOfferCreate: user.Companies[0].id,
            by: user?.id // necesario para mostrar info de la empresa en postuland
        })
    }

    const handleSalario = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;
    
        const newMin = Math.max(100, Math.round(newValue[0] / 100) * 100);
        const newMax = Math.min(5000, Math.round(newValue[1] / 100) * 100);

        setSalario([newMin, newMax]);
        setInputs({
            ...inputs,
            min_salary: salario[0],
            max_salary: salario[1]
        })
      }

    function precio(value) {
        return `$${value} (USD)`;
      }
    useEffect(() => {
        axios('/technologies')
            .then((response) => {
                setTechnologies(response.data)
            })
        axios('https://www.getonbrd.com/api/v0/perks')
            .then(res => setPerksApi(res.data.data))
    }, [])

    return (
            <Fragment>
                    <form className="flex flex-col gap-2 w-full px-20" onSubmit={(event) => handleSubmit(event)}>
                        <TextField 
                            className="w-full"
                            label="Título"
                            placeholder="Ej: Junior React Redux Senior Developer"
                            value={inputs.title} 
                            onChange={handleChange} 
                            error={!!errors.title} 
                            helperText={errors.title} 
                            variant="standard" 
                            name='title'
                        />

                        <TextField 
                            className="w-full rounded-xl"
                            label="Requisitos"
                            placeholder="Ej: TailwindCSS excluyente, AWS Cloud Hosting, Inglés"
                            value={inputs.requeriments} 
                            onChange={handleChange} 
                            error={!!errors.requeriments} 
                            helperText={errors.requeriments} 
                            variant="standard" 
                            name='requeriments'
                        />
                        <TextField 
                            className="w-full rounded-xl"
                            label="Beneficios laborales"
                            placeholder="Ej: Almuerzo buffet en oficina"
                            value={inputs.benefits} 
                            onChange={handleChange} 
                            error={!!errors.benefits} 
                            helperText={errors.benefits} 
                            variant="standard" 
                            name='benefits'
                        />
                        <TextField 
                            className="w-full rounded-xl"
                            label="Funciones del empleo"
                            placeholder="Ej: Encargado de mantener los servidores actualizados"
                            value={inputs.functions} 
                            onChange={handleChange} 
                            error={!!errors.functions} 
                            helperText={errors.functions} 
                            variant="standard" 
                            name='functions'
                        />

                        <FormControl>
                        <InputLabel id="dias">Cantidad de dias de la oferta disponible: </InputLabel>
                        <Slider
                            id='dias'
                            label="Días"
                            defaultValue={5}
                            value={inputs.expiration}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={5}
                            max={30}
                            name='expiration'
                            onChange={handleChange}
                        />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="ventajas">Ventajas</InputLabel>
                            <Select
                                multiple
                                className="w-96"
                                value={selectedPerks}
                                onChange={handleSelect}
                                input={<OutlinedInput label="Ventajas" />}
                                renderValue={(selected) => {
                                    if(selected.length > 2) return selected.slice(0,2).join(', ') + '...'
                                    return selected.join(', ')
                                }}
                            >
                                <MenuItem value={'Seleccione'}>Seleccione</MenuItem>
                                {perksApi?.map(perk => (
                                    <MenuItem key={perk.attributes.name} value={perk.attributes.name}>
                                        <Checkbox
                                            checked={selectedPerks.includes(perk.attributes.name)}
                                            onChange={() => handleSelect({
                                                target: {
                                                    value: selectedPerks.includes(perk.attributes.name)
                                                        ? selectedPerks.filter(selected => selected !== perk.attributes.name)
                                                        : [...selectedPerks, perk.attributes.name]
                                                }
                                            })}
                                        />
                                        <ListItemText primary={perk.attributes.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="tecnologias">Tecnologias</InputLabel>
                            <Select
                                multiple
                                value={selectedTech}
                                onChange={handleSelectTechnologies}
                                input={<OutlinedInput label="tecnologias" />}
                                renderValue={(selected) => {
                                    if(selected.length > 2) return selected.slice(0,2).join(', ') + '...'
                                    return selected.join(', ')
                                }}
                            >
                                <MenuItem value={'Seleccione'}>Seleccione</MenuItem>
                                {technologies?.map(techno => (
                                    <MenuItem key={techno.Technology} value={techno.Technology}>
                                        <Checkbox
                                            checked={selectedTech.includes(techno.Technology)}
                                            onChange={() => handleSelectTechnologies({
                                                target: {
                                                    value: selectedTech.includes(techno.Technology)
                                                        ? selectedTech.filter(selected => selected !== techno.Technology)
                                                        : [...selectedTech, techno.Technology]
                                                }
                                            })}
                                        />
                                        <ListItemText primary={techno.Technology} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                        <FormControl error={false}>
                            <InputLabel id="modality">Modalidad: </InputLabel>
                            <Select
                            labelId="modality"
                            value={inputs.modality}
                            label="Age"
                            name="modality"
                            onChange={handleChange}
                            renderValue={(value) => `${value}`}
                            >
                                <MenuItem value="no_remote">Presencial</MenuItem>
                                <MenuItem value="hybrid">Hibrido</MenuItem>
                                <MenuItem value="fully_remote">Remoto</MenuItem>
                                <MenuItem value="remote_local">Remoto/Local</MenuItem>
                            </Select>
                            {errors.modality && <FormHelperText>{errors.modality}</FormHelperText>}
                        </FormControl>

                        <FormControl error={false}>
                            <InputLabel id="experience">Experiencia Requerida: </InputLabel>
                            <Select
                            labelId="experience"
                            value={inputs.experience}
                            label="Age"
                            name="experience"
                            onChange={handleChange}
                            renderValue={(value) => `${value}`}
                            >
                                <MenuItem value="0">Trainee</MenuItem>
                                <MenuItem value="1">Junior</MenuItem>
                                <MenuItem value="2-4">MidSenior</MenuItem>
                                <MenuItem value="5">Senior</MenuItem>
                            </Select>
                            {errors.experience && <FormHelperText>{errors.experience}</FormHelperText>}
                        </FormControl>

                        <FormControl error={false}>
                        <InputLabel id="salario">Espectativa salarial: {precio(salario)}</InputLabel>
                        <Slider
                            className="mb-3"
                            id='salario'
                            value={salario}
                            onChange={handleSalario}
                            valueLabelDisplay="auto"
                            getAriaValueText={precio}
                            min={100}
                            max={5000}
                            step={100}
                            disableSwap
                        />
                        </FormControl>
                        {/* <div className='flex'>
                            {(errors.min_salary || errors.max_salary || errors.min_salary_0 || errors.max_salary_0) && <p className={styles.p_formulario_error}>{errors.min_salary} {errors.max_salary} {errors.min_salary_0}{errors.max_salary_0}</p>}
                            <label >Salario en dolares americanos: </label>
                            <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.min_salary} name='min_salary' id="min_salary" placeholder="minimo" />
                            <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.max_salary} name='max_salary' id="max_salary" placeholder="maximo" />
                        </div> */}
                        <Button variant="contained" onClick={() => setShowModal(true)} >Previsualizar Oferta</Button>
                    </form>
                <ModalConfirmChanges isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className="bg-white px-20 py-6 rounded-xl">
                    <h1 className="py-3 text-xl font-bold">Antes de confirmar la oferta, verifique los datos</h1>
                    <h1>Titulo: {inputs.title}</h1>
                    <h1>Requisitos: {inputs.requeriments}</h1>
                    <h1>Beneficios: {inputs.benefits}</h1>
                    <h1>Funciones: {inputs.functions}</h1>
                    <h1>Dias disponible: {inputs.expiration}</h1>
                    <h1>Ventajas: {inputs.perks} </h1>
                    <h1>Tecnologias: {inputs.technologies}</h1>
                    <h1>Modalidad: {inputs.modality}</h1>
                    <h1>Experiencia requerida: {inputs.experience} años</h1>
                    <h1>Salario minimo: {!inputs.min_salary.length ? 'Sin informar' : inputs.min_salary + ' dolares'} </h1>
                    <h1>Salario maximo: {!inputs.max_salary.length ? 'Sin informar' : inputs.max_salary + ' dolares'} </h1>
                    <button className={styles.boton_confirmacion} type='submit' onClick={handleSubmit}>confirmar</button>
                    <button className={styles.boton_confirmacion} type='button' onClick={() => setShowModal(false)}>volver</button>
                </div>

                </ModalConfirmChanges>
            </Fragment>
        )
}