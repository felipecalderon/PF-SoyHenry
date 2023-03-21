import Card from "./Card"
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPostList } from '../../redux/slices/postSlices';
import { spinnerPurple } from './spinner';
import logofusionajob from '../../assets/logofusionajob.png'
import useFetch from '../Hooks/useFetch';
import dia from '../../assets/sun.png'
import noche from '../../assets/moon.png'
import ReactPaginate from 'react-paginate'; // libreria para hacer el paginado


const Cards = () => {
  const dispatch = useDispatch()
  const { postJobs } = useSelector((state) => state.postSlice) 
  const [filters, setFilters] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filtrado  
  const queryString = new URLSearchParams(filters).toString(); // "page=1&dt=15&exp=2-4&mty=fr&sly=4"

  const urlFilters = `/jobs?${queryString}`;

  const handleFilterChange = ( name, value ) => {
    name === 'resetFilter'? 
    setFilters({}) 
    : setFilters({
      ...filters,
      [name]: value,
    });
  }

  const {data, isLoading, error} = useFetch(urlFilters)

  const [pageNumber, setPageNumber] = useState(0);
  const [perPage] = useState(9);

    
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

  // Guardado local para que se mantengan los filtros en el select
  //  Obtiene el elemento select del filtro
  const dateFilter = document.getElementById('date');
  const experienceFilter = document.getElementById('experience');
  const modalityFilter = document.getElementById('modality');
  const salaryFilter = document.getElementById('salary');

  //  Escucha cambios en el select del filtro y guardar el valor seleccionado en localStorage si existen los select
  if ( dateFilter || experienceFilter || modalityFilter || salaryFilter ) {
    dateFilter.addEventListener('change', (event) => {
      localStorage.setItem('dateFilterSelect', event.target.value);
    });
    experienceFilter.addEventListener('change', (event) => {
      localStorage.setItem('expFilterSelect', event.target.value);
    });
    modalityFilter.addEventListener('change', (event) => {
      localStorage.setItem('mtyFilterSelect', event.target.value);
    });
    salaryFilter.addEventListener('change', (event) => {
      localStorage.setItem('slyFilterSelect', event.target.value);
    });
  }

  //  Restablece el valor seleccionado en el select del filtro desde localStorage si existe los select
  const dateFilterSelect = localStorage.getItem('dateFilterSelect');
  const expFilterSelect = localStorage.getItem('expFilterSelect');
  const mtyFilterSelect = localStorage.getItem('mtyFilterSelect');
  const slyFilterSelect = localStorage.getItem('slyFilterSelect');

  if (dateFilterSelect ) {
    if (dateFilter) dateFilter.value = dateFilterSelect;
  }
  if (expFilterSelect ) {
    if (experienceFilter) experienceFilter.value = expFilterSelect;
  }
  if (mtyFilterSelect ) {
    if (modalityFilter) modalityFilter.value = mtyFilterSelect;
  }
  if (slyFilterSelect ) {
    if (salaryFilter) salaryFilter.value = slyFilterSelect;
  }

  //  Escucha el evento click en el botón de eliminar filtros y borra los datos almacenados en localStorage
  const botonEliminarFiltros = document.getElementById('btn-reset');
  if(botonEliminarFiltros){
  botonEliminarFiltros.addEventListener('click', () => {
    localStorage.clear();
  });
  }

  const handleToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='bg-primary-light dark:bg-secondary-dark transition-all'>
      {/* Muestra los filtros */}
      <nav className='bg-secondary-light dark:bg-primary-dark h-16'>
      <div className="flex">
      <Link to='userprofile'><button className='absolute font-medium py-[.1rem] px-2 h-[2.5rem] top-3 rounded-md ml-[75rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white shadow-md hover:bg-gray-400'>Perfil</button></Link>
      <div onClick={handleToggle} className="cursor-pointer absolute py-2 px-2 top-3 ml-[79rem] bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-secondary-light">{isDarkMode 
            ? <img className="w-6" src={dia} alt='dia'/>
            : <img className="w-6" src={noche} alt='noche'/>
            }</div>
      <Link to='/'><button className='absolute top-3 left-14 py-[.1rem] px-2 h-[2.5rem] bg-gray-300 text-black dark:bg-slate-500 dark:text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2'>← Home</button></Link>
      <div className="flex-shrink-0">
      <img src={logofusionajob} alt='logo' className="h-10 top-3 w-auto relative ml-[9rem]"/>
      </div>
        <form>
          {/* <p> Filtros: </p> */}
          <select id="date" onChange={(e) => handleFilterChange('dt', e.target.value)} defaultValue={'DEFAULT'} className="relative top-5 w-50 text-l text-text-light dark:text-text-dark bg-transparent mr-[1rem] ml-[1rem]">
              <option value="DEFAULT" disabled className='dark:bg-secondary-dark bg-secondary-light'> Fecha de publicación: </option>
              <option value="1" className='dark:bg-secondary-dark bg-secondary-light'> Hoy </option>
              <option value="4" className='dark:bg-secondary-dark bg-secondary-light'> Últimos 3 dias </option>
              <option value="16" className='dark:bg-secondary-dark bg-secondary-light'> Últimos 15 dias </option>
              <option value="31" className='dark:bg-secondary-dark bg-secondary-light'> Último mes </option>
          </select>
          <select id="experience" onChange={(e) => handleFilterChange('exp', e.target.value)} defaultValue={'DEFAULT'} className="relative top-5 w-50 text-l text-text-light dark:text-text-dark bg-transparent mr-[1rem]">
              <option value="DEFAULT" disabled className='dark:bg-secondary-dark bg-secondary-light'> Experiencia: </option>
              <option value="0" className='dark:bg-secondary-dark bg-secondary-light'> Sin experiencia </option>
              <option value="1" className='dark:bg-secondary-dark bg-secondary-light'> 1 año </option>
              <option value="2-4" className='dark:bg-secondary-dark bg-secondary-light'> 2-4 años </option>
              <option value="5" className='dark:bg-secondary-dark bg-secondary-light'> Más de 5 años </option>
          </select>
          <select id="modality" onChange={(e) => handleFilterChange('mty', e.target.value)} defaultValue={'DEFAULT'} className="relative top-5 w-50 text-l text-text-light dark:text-text-dark bg-transparent mr-[1rem]">
              <option value="DEFAULT" disabled className='dark:bg-secondary-dark bg-secondary-light'> Modalidad: </option>
              <option value="fr" className='dark:bg-secondary-dark bg-secondary-light'> Remoto </option>
              <option value="rl" className='dark:bg-secondary-dark bg-secondary-light'> Remoto local </option>
              <option value="h" className='dark:bg-secondary-dark bg-secondary-light'> Híbrido </option>
              <option value="nr" className='dark:bg-secondary-dark bg-secondary-light'> Presencial </option>
          </select>
          <select id="salary" onChange={(e) => handleFilterChange('sly', e.target.value)} defaultValue={'DEFAULT'} className="relative top-5 w-50 text-l text-text-light dark:text-text-dark bg-transparent mr-[1rem]">
              <option value="DEFAULT" disabled className='dark:bg-secondary-dark bg-secondary-light'> Salario: </option>
              <option value="1" className='dark:bg-secondary-dark bg-secondary-light'> Menos de 200 </option>
              <option value="2" className='dark:bg-secondary-dark bg-secondary-light'> Más de 200 </option>
              <option value="3" className='dark:bg-secondary-dark bg-secondary-light'> Más de 500 </option>
              <option value="4" className='dark:bg-secondary-dark bg-secondary-light'> Más de 500 </option>
          </select>
          <button id="btn-reset" type='reset' onClick={() => handleFilterChange('resetFilter')} className="relative top-5 w-50 text-l font-semibold text-red-600 dark:text-text-red-600 bg-transparent mr-[1rem]"> 
            Limpiar filtros 
          </button>
        </form>
      </div>
      </nav>
      {/* Muestra las cards */}
      <div className="flex flex-wrap gap-3 justify-center dark:bg-secondary-dark bg-primary-light py-6">
        { 
          getPaginatedData().map((card) => (
            <Card key={card.id} 
            title={card.title} 
            description={card.functions} 
            id={card.id} 
            salario_minimo={card.min_salary}
            salario_maximo={card.max_salary}
            modality={card.modality}
            
            />
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
        containerClassName="flex justify-center pb-[1rem] dark:bg-secondary-dark"
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