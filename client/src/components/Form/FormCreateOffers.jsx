import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { createOffer } from "../../redux/actions/postFetchOffers";
import { Link } from "react-router-dom";
import styles from './FormCreateOffers.module.css'


function validate(inputs){
    let errors = {};
    if (!inputs.title) errors.title = 'se requiere un titulo *';
    if (!inputs.description) errors.description = 'se requiere una descripcion *';
    if (!inputs.requeriments) errors.requeriments = 'se requiere requisitos *';
    if (!inputs.benefits) errors.benefits = 'se requiere beneficios *';
    if (!inputs.functions) errors.functions = 'se requiere funciones a cumplir *'
    if (!inputs.modality) errors.modality = 'debe selecionar una modalidad *';
    if (!inputs.perks.length) errors.perks = 'debe ingresar perks *'
    if (!inputs.experience)  errors.experience = 'se debe seleccionar la experiencia requerida'
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
        requeriments:'',
        benefits: '',
        functions: '',
        perks: [],
        min_salary: '',
        max_salary: '',
        modality: '',
        applications_count: 0,
        experience: '',        
        
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
        console.log(inputs.modality)
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
                    {errors.title && <p className={styles.error_message}>{errors.title} </p> }
                    <label >Titulo: </label>
                    <input className={styles.inputs_strings} type='text' onChange={(event) => handleChange(event)} value={inputs.title} name='title'  placeholder="Ingrese un titulo de la oferta"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.description && <p className={styles.error_message}>{errors.description} </p> }
                    <label >Descripcion: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.description} name='description'  placeholder="Describa la oferta laboral"/>                        
                </div>
                
                <div className={styles.contenedor_inputs}>
                {errors.requeriments && <p className={styles.error_message}>{errors.requeriments} </p>}
                    <label >Requisitos: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.requeriments} name='requeriments'  placeholder="Describa los requesitos necesarios para aplicar"/> 
                </div>
                
                <div className={styles.contenedor_inputs}>
                    {errors.benefits && <p className={styles.error_message}>{errors.benefits} </p>}
                    <label >Beneficios: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.benefits} name='benefits'  placeholder="ingrese los benefecios de pertenecer a la empresa"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.functions && <p className={styles.error_message}>{errors.functions} </p>}
                    <label >Funciones: </label>
                    <textarea className={styles.inputs_strings}  type='text' onChange={(event) => handleChange(event)} value={inputs.functions} name='functions'  placeholder="ingrese las funciones a cumplir"/>                        
                </div>

                <div className={styles.contenedor_inputs}>
                    {errors.perks && <p className={styles.error_message}>{errors.perks}</p> }
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
                    {errors.modality && <p className={styles.error_message}>{errors.modality} </p>}            
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
                    {errors.experience && <p className={styles.error_message}>{errors.experience} </p>}            
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
                    {(errors.min_salary || errors.max_salary) && <p className={styles.error_message}>{errors.min_salary} </p>} 
                    <label >Salario: </label>
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.min_salary} name='min_salary'  placeholder="maximo"/>                        
                    <input className={styles.inputs_number} type='number' onChange={(event) => handleChange(event)} value={inputs.max_salary} name='max_salary'  placeholder="minimo"/>
                </div>                
                   
                <div className={styles.contenedor_inputs}>
                    <button className={styles.boton_submit} type='submit' disabled = {( Object.keys(errors).length !== 0 || inputs.title === '' )}> Publicar oferta</button>              
                    <Link to='/dashboardempresa'> <button className={styles.boton_volver}> Volver a dashboard</button></Link>
                    
                </div>   
            </form>
        </div>
    )
}