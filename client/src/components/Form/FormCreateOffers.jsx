import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createOffer } from "../../redux/actions/postFetchOffers";
import { Link } from "react-router-dom";
import styles from './FormCreateOffers.module.css'


function validate(inputs){
    let errors = {};
    if (!inputs.title) errors.title = 'se requiere un titulo *';
    if (!inputs.description) errors.description = 'se requiere una descripcion *';
    if (!inputs.benefits) errors.benefits = 'se requiere beneficios *';
    if (!inputs.modality) errors.modality = 'debe selecionar una modalidad *';
    if (inputs.min_salary <= 0) errors.min_salary = 'ingrese un salario correcto *';
    if (inputs.max_salary <= 0) errors.max_salary = 'ingrese un salario correcto *';

    return errors
}

export default function OffersCreate () {

    const dispatch = useDispatch();
    const [errors, setErrors] = useState ({});
    const [inputs, setInputs] = useState ({
        
        title: '',        
        description: '',
        benefits: '',
        perks: [],
        min_salary: 0,
        max_salary: 0,
        modality: '',
        applications_count: 0,
        link: '',
    })

    function handleChange(event){
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });
        setErrors(validate({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event){
        event.preventDefault();        
        dispatch(createOffer(inputs))
        alert('oferta creada')
    }
    
    return(        
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>Publicacion oferta laboral</h1>
            <form className="" onSubmit={(event) => handleSubmit(event)}>
                <div className={styles.contenedor_inputs}>
            {errors.title && <p>{errors.title} </p> }
                    <label >Titulo: </label>
                    <input className={styles.inputs_strings} type='text' onChange={(event) => handleChange(event)} value={inputs.title} name='title'  placeholder="Ingrese un titulo de la oferta"/>                        
                </div>
                <div className={styles.contenedor_inputs}>
                    {errors.description && <p>{errors.description} </p> }
                    <label >Descripcion: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.description} name='description'  placeholder="Describa la oferta laboral"/>                        
                </div>               
                <div className={styles.contenedor_inputs}>
                    {errors.benefits && <p>{errors.benefits} </p>}
                    <label >Beneficios: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.benefits} name='benefits'  placeholder="ingrese los benefecios de pertenecer a la empresa"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.modality && <p>{errors.modality} </p>}            
                    <label >Modalidad: </label>
                    <select name="modality" onChange={(event) => handleChange(event)} >
                        <option value="">Seleccione</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Hybrido">Hybrido</option>
                        <option value="Remoto">Remoto</option>
                    </select>            
                </div>

                <div className={styles.contenedor_inputs}>
                    {(errors.min_salary || errors.max_salary) && <p>{errors.min_salary} </p>} 
                    <label >Salario: </label>
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.min_salary} name='min_salary'  placeholder="maximo"/>                        
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.max_salary} name='max_salary'  placeholder="minimo"/>
                </div>
                <div className={styles.contenedor_inputs}>
                    <label >Link: </label>
                    <input className={styles.inputs_strings} type='text' onChange={(event) => handleChange(event)} value={inputs.link} name='link'  placeholder="ingrese link publicacion externa"/>                        
                </div>
                    <div>

                    </div>
                <button className={styles.boton_submit} type='submit' disabled = {( Object.keys(errors).length !== 0 || inputs.title === '' )}> Publicar oferta</button>              
            </form>
            <Link to='/'> <button className={styles.boton_volver}> Volver </button></Link>
        </div>
    )

}