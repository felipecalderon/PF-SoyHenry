import React, {useState} from "react";
import { Link } from "react-router-dom";


function validate(inputs){
    let errors = {};
    if (!inputs.title) errors.title = 'se requiere un titulo';
    
    return errors
}

export default function OffersCreate () {

    const [errors, setErrors] = useState ({});
    const [inputs, setInputs] = useState ({
        idEmpresa:'',
        title: '',
        requeriments: '',
        functions: '',
        benefits: '',
        modality: '',
        perks: '',
        min_salary: 0,
        max_salary: 0,
        applications_count: 0,
        link: '',
        bd_create: '',
        Active: ''

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

    }

    return(        
        <div className="">
            <h1 className="">Publicacion oferta laboral</h1>
            <form className="" onSubmit={(event) => handleSubmit(event)}>
                <div className="">
                    <label >Titulo </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.title} name='title'  placeholder="Ingrese un titulo de la oferta"/>                        
                    {errors.title && <p>{errors.title} </p> }
                </div>
                <div className="">
                    <label >Requisitos </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.requeriments} name='requeriments'  placeholder="ingrese requerimientos para aplicar a la oferta"/>                        
                </div>
                <div className="">
                    <label >Funciones </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.functions} name='functions'  placeholder="ingrese las funciones a cubrir en la oferta laboral"/>                        
                </div>
                <div className="">
                    <label >Beneficios </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.benefits} name='benefits'  placeholder="ingrese los benefecios de pertenecer a la empresa"/>                        
                </div>
                <div className="">
                    <label >Modalidad </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.modality} name='modality'  placeholder="Modalidad de trabajo"/>                        
                </div>
                <div className="">
                    <label >Salario </label>
                    <input className="" type='number' onChange={(event) => handleChange(event)} value={inputs.min_salary} name='min_salary'  placeholder="Salario maximo"/>                        
                    <input className="" type='number' onChange={(event) => handleChange(event)} value={inputs.max_salary} name='max_salary'  placeholder="Salario minimo"/>
                </div>
                <div>
                    <label >Link </label>
                    <input className="" type='text' onChange={(event) => handleChange(event)} value={inputs.link} name='link'  placeholder="ingrese la url donde tiene la publicacion original"/>                        
                </div>
                
                <button className="" type='submit' disabled = {inputs.title === ''}> Publicar oferta</button>              
            </form>
            <Link to='/'> <button> Volver </button></Link>
        </div>
    )

}