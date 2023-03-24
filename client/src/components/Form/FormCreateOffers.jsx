import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOffer } from "../../redux/actions/postFetchOffers";

import { Link } from "react-router-dom";
import styles from './FormCreateOffers.module.css'


export default function OffersCreate () {

    const { user } = useSelector((state) => state.userRegisterSlice)    
    const dispatch = useDispatch();
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

    

    function handlePerks(event){
        
        let perks = document.getElementById('perks')        
        if (perks.value === '') return
           
        setInputs({
            ...inputs,
            perks: [...inputs.perks, perks.value]
        })
        perks.value = '';
    }
    
    function handlePerksDelete(event){
        
        alert('perks eliminado')        
        setInputs({
            ...inputs,
            perks: inputs.perks.filter(perk => perk !== event.target.value)
        })
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
                    <label >Perks:</label>
                    <input type="text" name='perks'  id='perks' className={styles.perks_input} placeholder='ingrese perks' />
                    <button className={styles.perks_button} type='button' onClick={(event) => handlePerks(event)}>agregar perks</button>
                    <select className={styles.perks_select} onChange={(event => handlePerksDelete(event))} >
                        <option id="perks_select" >perks agregados</option>
                        {inputs.perks.map(perk => {
                            return (
                                <option value={perk}>{perk}</option>
                            )
                        })}
                    </select>                    
                </div>

                <div className={styles.contenedor_inputs}>
                    <span className={styles.perks_information}>* beneficio resumido en una palabra, ej: prepaga, click sobre perk en la lista para eliminar</span>
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
                    <button className={styles.boton_submit} type='submit' disabled = {controlarValoresErrors(errors, inputs)}> Publicar oferta</button>              
                    <Link to='/dashboardempresa'> <button className={styles.boton_volver}> Volver a dashboard</button></Link>
                    
                </div>   
            </form>
        </div>
    )
}