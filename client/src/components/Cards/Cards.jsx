import Card from "./Card"
import useFetch from "../Hooks/useFetch";
import {getPostList} from '../../redux/slices/postSlices'
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { spinnerPurple } from "./spinner";

const url = '/jobs'

const Cards = () => {
    const dispatch = useDispatch()
    const { postJobs } = useSelector((state) => state.postSlice) 
    const {data, isLoading, error} = useFetch(url)
    
    useEffect(() => {
        if(data) dispatch(getPostList(data.data))
    }, [dispatch, data])

    if(isLoading) return spinnerPurple() 
    
    const handleDate = ( event ) => {
      const value = event.target.value;
      console.log(`page=${value}`);
    }
    const handleExperience = ( event ) => {
      const value = event.target.value;
      console.log(`page=${value}`);
    }
    const handleModality = ( event ) => {
      const value = event.target.value;
      console.log(`page=${value}`);
    }
    const handleSalary = ( event ) => {
      const value = event.target.value;
      console.log(`page=${value}`);
    }
    
    return (
      <div className="cards">
        <div className="filters">
          <form className="date">
            <select className='dateList' onChange={ handleDate } defaultValue={'DEFAULT'} >
                <option className='orderOptionsD' value="DEFAULT" disabled> Por Fecha: </option>
                <option className='orderOptions' value="1"> Hoy </option>
                <option className='orderOptions' value="4"> Últimos 3 dias </option>
                <option className='orderOptions' value="16"> Últimos 15 dias </option>
                <option className='orderOptions' value="31"> Último mes </option>
            </select>
            <select className='experienceList' onChange={ handleExperience } defaultValue={'DEFAULT'} >
                <option className='orderOptionsD' value="DEFAULT" disabled> Por Experiencia: </option>
                <option className='orderOptions' value="0"> Sin experiencia </option>
                <option className='orderOptions' value="1"> 1 año de experiencia </option>
                <option className='orderOptions' value="2-4"> 2-4 años de experiencia </option>
                <option className='orderOptions' value="5"> Más de 5 años </option>
            </select>
            <select className='modalityList' onChange={ handleModality } defaultValue={'DEFAULT'} >
                <option className='orderOptionsD' value="DEFAULT" disabled> Por Modalidad: </option>
                <option className='orderOptions' value="fr"> Remoto </option>
                <option className='orderOptions' value="rl"> Remoto local </option>
                <option className='orderOptions' value="h"> Híbrido </option>
                <option className='orderOptions' value="nr"> Presencial </option>
            </select>
            <select className='salaryList' onChange={ handleSalary } defaultValue={'DEFAULT'} >
                <option className='orderOptionsD' value="DEFAULT" disabled> Por Salario: </option>
                <option className='orderOptions' value="1"> Menos de 200 </option>
                <option className='orderOptions' value="2"> Más de 200 </option>
                <option className='orderOptions' value="3"> Más de 500 </option>
                <option className='orderOptions' value="4"> Más de 500 </option>
            </select>
            <button className='btnReset' type='reset' > Limpiar filtros </button>
          </form>
        </div>
        <div className="flex flex-wrap gap-3 justify-center dark:bg-slate-600 py-6">
          { 
            postJobs.map((card) => (
              <Card key={card.title} title={card.title} description={card.description} id={card.id} salary={card.min_salary}/>
            ))
          }
        </div>
      </div>
    )
  }
  
  export default Cards