import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffer } from "../../redux/actions/postFetchOffers";
import axios from 'axios'
import { Link } from "react-router-dom";
import styles from './FormCreateOffers.module.css'
import ModalConfirmChanges from './FormCreateOfferModal'
import { Fragment } from "react";



export default function OffersCreate () {

    const { user } = useSelector((state) => state.userRegisterSlice)   
    const [showModal, setShowModal] = useState(false); 
    const dispatch = useDispatch();
    const [technologies, setTechnologies] = useState(null)
    const [errors, setErrors] = useState ({});
    const [inputs, setInputs] = useState ({
        
        title: '',        
        description: '',
        requeriments:'',
        benefits: '',
        functions: '',
        perks: [],
        min_salary: '',
        max_salary: '',
        modality: '',
        applications_count: 0,
        experience: '',
        idRecruiterOfferCreate: user.Companies[0].id ,         
    })

    function validate(validar){        
        
        if (validar.hasOwnProperty('title')) {
            if (validar.title === '') return {...errors, title: 'se requiere un titulo *'};
            if (validar.title.length) return {...errors, title: ''};               
        }            
        if (validar.hasOwnProperty('description')) {
            if (validar.description === '') return {...errors, description:  'se requiere una descripcion *'};
            if (validar.description.length) return {...errors, description: ''};   
        }       if (validar.hasOwnProperty('requeriments')) {
            if (validar.requeriments === '') return {...errors, requeriments:  'se requiere una requeriments *'};
            if (validar.requeriments.length) return {...errors, requeriments: ''};   
        }       if (validar.hasOwnProperty('benefits')) {
            if (validar.benefits === '') return {...errors, benefits:  'se requiere una benefits *'};
            if (validar.benefits.length) return {...errors, benefits: ''};   
        }     
        if (validar.hasOwnProperty('functions')) {
            if (validar.functions === '') return {...errors, functions:  'se requiere una functions *'};
            if (validar.functions.length) return {...errors, functions: ''};   
        }
        if (validar.hasOwnProperty('modality')) {
            if (validar.modality === '') return {...errors, modality:  'se requiere una modality *'};
            if (validar.modality.length) return {...errors, modality: ''};   
        }
        if (validar.hasOwnProperty('experience')) {
            if (validar.experience === '') return {...errors, experience:  'se requiere una experience *'};
            if (validar.experience.length) return {...errors, experience: ''};   
        }
        if (validar.hasOwnProperty('min_salary')) {
            if (Number(validar.min_salary) <= 0) return {...errors, min_salary_0 :  'corregir salario minimo o reingresarlo *'};
            if (Number(validar.min_salary) > Number(inputs.max_salary)) return {...errors, min_salary :  'salario minimo mayor a maximo *'};
            if (Number(validar.min_salary) <= Number(inputs.max_salary) && Number(validar.min_salary) > 0) return {...errors, min_salary :  '',max_salary:  '', min_salary_0 :  ''};
            if (Number(validar.min_salary) > 0) return {...errors, min_salary_0 :  ''};     
            if (Number(validar.min_salary) <= Number(inputs.max_salary)) return {...errors, min_salary :  '',max_salary:  ''}      
        }
        if (validar.hasOwnProperty('max_salary')) {
            if (Number(validar.max_salary) <= 0) return {...errors, max_salary_0:  'corregir salario maximo o reingresarlo *'};
            if (Number(validar.max_salary) < Number(inputs.min_salary)) return {...errors, max_salary:  'salario minimo mayor a maximo *'};
            if (Number(validar.max_salary) >= Number(inputs.min_salary) && Number(validar.max_salary) > 0  )return {...errors, min_salary :  '',max_salary:  '', max_salary_0 :  ''};
            if (Number(validar.max_salary) > 0 ) return {...errors, max_salary_0:  ''};             
            if (Number(validar.max_salary) >= Number(inputs.min_salary)) return  {...errors, min_salary: '', max_salary:''}               
        }        
        return {...errors}            
    }
    
    useEffect(()=>{
        axios('/technologies')
            .then((response) => {
                 setTechnologies(response.data)
            })
    },[technologies])

    function handleChange(event){
        
        setInputs({
            ...inputs,
            [event.target.name]: event.target.value
        });

        setErrors(validate( {            
            [event.target.name]: event.target.value
         })); 
        
        
                  
    } 

    function controlarValoresErrors (errors, inputs){
        
        let acumulador = ''
        let acumulador2 = false
        for (const key in errors) {
            acumulador += errors[key]
        }
        for (const key in inputs) {
            if(inputs[key] === '') acumulador2 = true
        }

        
        if (acumulador === '' && acumulador2 === false) {
            acumulador = false
        } else {
            acumulador = true
        }
        return acumulador

    }

    

    function handleSelect(event){
        if (inputs.perks.includes(event.target.value)) return
        setInputs({
            ...inputs,
            perks: [...inputs.perks,event.target.value]
        })
    }

    function handleDelete(event){        
        setInputs({
            ...inputs,
            perks: inputs.perks.filter(techno => techno !== event)
        })
    }

    function handleSubmit(event){
        event.preventDefault();        
        dispatch(createOffer(inputs))
        alert('oferta creada')
        setShowModal(false)
        setInputs({
            title: '',        
            description: '',
            requeriments:'',
            benefits: '',
            functions: '',
            perks: [],
            min_salary: '',
            max_salary: '',
            modality: '',
            applications_count: 0,
            experience: '',
            idRecruiterOfferCreate: user.Companies[0].id ,
        })
    }
    
    return(     
        <Fragment>   
        <div className={styles.contenedor}>
            <h1 className={styles.titulo}>Publicacion oferta laboral</h1>
            <form className="" onSubmit={(event) => handleSubmit(event)}>
                <div className={styles.contenedor_inputs}>
            {errors.title && <p className={styles.p_formulario_error}>{errors.title} </p> }
                    <label >Titulo: </label>
                    <input className={styles.inputs_strings} type='text' onChange={(event) => handleChange(event)} value={inputs.title} name='title'  placeholder="Ingrese un titulo de la oferta"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.description && <p className={styles.p_formulario_error}>{errors.description} </p> }
                    <label >Descripcion: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.description} name='description'  placeholder="Describa la oferta laboral"/>                        
                </div>
                
                <div className={styles.contenedor_inputs}>
                {errors.requeriments && <p className={styles.p_formulario_error}>{errors.requeriments} </p>}
                    <label >Requisitos: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.requeriments} name='requeriments'  placeholder="Describa los requesitos necesarios para aplicar"/> 
                </div>
                
                <div className={styles.contenedor_inputs}>
                    {errors.benefits && <p className={styles.p_formulario_error}>{errors.benefits} </p>}
                    <label >Beneficios: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.benefits} name='benefits'  placeholder="ingrese los benefecios de pertenecer a la empresa"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.functions && <p className={styles.p_formulario_error}>{errors.functions} </p>}
                    <label >Funciones: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.functions} name='functions'  placeholder="ingrese las funciones a cumplir"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.perks && <p className={styles.p_formulario_error}>{errors.perks}</p> }
                    <label >Tecnologias requeridas:</label>                    
                    <select className={styles.perks_select} onChange={(event) => handleSelect(event)} >
                        <option id="perks_select" >Seleccione</option>
                        {technologies?.map(techno => {
                            return (
                                <option value={techno.Technology}>{techno.Technology}</option>
                                )
                            })}
                    </select>                    
                </div>

                <div className={styles.contenedor_inputs}>                   
                    
                    <span className={styles.perks_information}> {inputs.perks.map(techno => {
                        return (
                            <span>
                                <span className={styles.technologies_selected} onClick={()=>handleDelete(techno)} >{techno}</span>
                                <button className={styles.technologies_selected_btn} type='button'onClick={()=>handleDelete(techno)}>x</button>
                            </span>
                        )
                    })} </span>
                
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.modality && <p className={styles.p_formulario_error}>{errors.modality} </p>}            
                    <label >Modalidad: </label>
                    <select name="modality" onChange={(event) => handleChange(event)} >
                        <option value="">Seleccione</option>
                        <option value="no_remote">Presencial</option>
                        <option value="hybrid">Hybrido</option>
                        <option value="fully_remote">Remoto</option>
                        <option value="remote_local">Remoto local</option>
                    </select>            
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.experience && <p className={styles.p_formulario_error}>{errors.experience} </p>}            
                    <label >Experiencia requerida: </label>
                    <select name="experience" onChange={(event) => handleChange(event)} >
                        <option value="">Seleccione</option>
                        <option value="0">sin experiencia</option>
                        <option value="1">1 año</option>
                        <option value="2-4">2 a 4 años</option>
                        <option value="5">5 años</option>
                    </select>            
                </div>

                <div className={styles.contenedor_inputs}>
                    {(errors.min_salary || errors.max_salary || errors.min_salary_0 || errors.max_salary_0 ) && <p className={styles.p_formulario_error}>{errors.min_salary} {errors.max_salary} {errors.min_salary_0}{errors.max_salary_0}</p>} 
                    <label >Salario: </label>
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.min_salary} name='min_salary' id="min_salary"  placeholder="minimo"/>                        
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.max_salary} name='max_salary' id="max_salary" placeholder="maximo"/>
                </div>                
                   
                <div className={styles.contenedor_inputs}>
                    <button className={styles.boton_submit} type='button' disabled = {controlarValoresErrors(errors, inputs)} onClick={()=> setShowModal(true)}> Publicar oferta</button>              
                    <Link to='/dashboardempresa'> <button className={styles.boton_volver}> Volver a dashboard</button></Link>                    
                    
                </div>   
            </form>
        </div>
        <ModalConfirmChanges isVisible={showModal} onClose={()=> setShowModal(false)} >
            <h1 className={styles.titulo_confirmacion}>Antes de confirmar la oferta, verifique los datos</h1>
            <h1>Titulo: {inputs.title}</h1>
            <h1>Descripcion: {inputs.description}</h1>
            <h1>Requisitos: {inputs.requeriments}</h1>
            <h1>Beneficios: {inputs.benefits}</h1>
            <h1>Funciones: {inputs.functions}</h1>
            <h1>Tecnologias: {inputs.perks}</h1>
            <h1>Modalidad: {inputs.modality}</h1>
            <h1>Experiencia requerida: {inputs.experience} años</h1>
            <h1>Salario minimo: {inputs.min_salary} dolares</h1>
            <h1>Salario maximo: {inputs.max_salary} dolares</h1>
            <button className={styles.boton_confirmacion} type='submit' onClick={handleSubmit}>confirmar</button>
            
        </ModalConfirmChanges> 
        </Fragment>
    )
}