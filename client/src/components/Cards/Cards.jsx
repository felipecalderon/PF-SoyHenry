import Card from "./Card"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostList } from '../../redux/slices/postSlices';
import { spinnerPurple } from './spinner';
import useFetch from '../Hooks/useFetch';
import ReactPaginate from 'react-paginate'; // libreria para hacer el paginado

const url = '/jobs'

const Cards = () => {
  const dispatch = useDispatch()
  const { postJobs } = useSelector((state) => state.postSlice) 
  const {data, isLoading, error} = useFetch(url)

  const [pageNumber, setPageNumber] = useState(0);
  const [perPage] = useState(10);
    
  useEffect(() => {
      if(data) dispatch(getPostList(data))
  }, [dispatch, data])

  if(isLoading) return spinnerPurple() 

  // Paginado
  const getPaginatedData = () => {
    const startIndex = pageNumber * perPage;
    const endIndex = startIndex + perPage;
    return postJobs.slice(startIndex, endIndex);
  };
  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected);
  };
    
  const handleDate = ( event ) => {
    const value = event.target.value;
    console.log(`dt=${value}`);
  }
  const handleExperience = ( event ) => {
    const value = event.target.value;
    console.log(`exp=${value}`);
  }
  const handleModality = ( event ) => {
    const value = event.target.value;
    console.log(`mty=${value}`);
  }
  const handleSalary = ( event ) => {
    const value = event.target.value;
    console.log(`sly=${value}`);
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
      {/* Muestra las cards */}
      <div className="flex flex-wrap gap-3 justify-center dark:bg-slate-600 py-6">
        { 
          getPaginatedData().map((card) => (
            <Card key={card.id} title={card.title} description={card.description} id={card.id} salary={card.min_salary}/>
          ))
        }
      </div>
      {/* Muestra el paginado */}
      <ReactPaginate
        previousLabel={'Prev'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(postJobs.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-4"
        pageClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        pageLinkClassName="px-4 py-2 text-sm"
        activeClassName="bg-blue-500 text-yellow-500 font-bold"
        previousClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        nextClassName="mx-2 rounded-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
        previousLinkClassName="px-4 py-2 font-bold text-sm"
        nextLinkClassName="px-4 py-2 font-bold text-sm"
        breakClassName="mx-2"
      />
    </div>
  )
}

export default Cards