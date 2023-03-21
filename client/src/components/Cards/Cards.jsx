import Card from "./Card"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostList } from '../../redux/slices/postSlices';
import { spinnerPurple } from './spinner';
import useFetch from '../Hooks/useFetch';
import ReactPaginate from 'react-paginate'; // libreria para hacer el paginado


const Cards = () => {
  const dispatch = useDispatch()
  const { postJobs } = useSelector((state) => state.postSlice) 
  const [filters, setFilters] = useState({});

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

  return (
    <div>
      {/* Muestra los filtros */}
      <div className="m-5 flex justify-center items-center">
        <form>
          {/* <p> Filtros: </p> */}
          <select id="date" onChange={(e) => handleFilterChange('dt', e.target.value)} defaultValue={'DEFAULT'} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-purple-600 peer">
              <option value="DEFAULT" disabled> Por Fecha: </option>
              <option value="1"> Hoy </option>
              <option value="4"> Últimos 3 dias </option>
              <option value="16"> Últimos 15 dias </option>
              <option value="31"> Último mes </option>
          </select>
          <select id="experience" onChange={(e) => handleFilterChange('exp', e.target.value)} defaultValue={'DEFAULT'} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-purple-600 peer">
              <option value="DEFAULT" disabled> Por Experiencia: </option>
              <option value="0"> Sin experiencia </option>
              <option value="1"> 1 año de experiencia </option>
              <option value="2-4"> 2-4 años de experiencia </option>
              <option value="5"> Más de 5 años </option>
          </select>
          <select id="modality" onChange={(e) => handleFilterChange('mty', e.target.value)} defaultValue={'DEFAULT'} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-purple-600 peer">
              <option value="DEFAULT" disabled> Por Modalidad: </option>
              <option value="fr"> Remoto </option>
              <option value="rl"> Remoto local </option>
              <option value="h"> Híbrido </option>
              <option value="nr"> Presencial </option>
          </select>
          <select id="salary" onChange={(e) => handleFilterChange('sly', e.target.value)} defaultValue={'DEFAULT'} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-purple-600 peer">
              <option value="DEFAULT" disabled> Por Salario: </option>
              <option value="1"> Menos de 200 </option>
              <option value="2"> Más de 200 </option>
              <option value="3"> Más de 500 </option>
              <option value="4"> Más de 500 </option>
          </select>
          <button id="btn-reset" type='reset' onClick={() => handleFilterChange('resetFilter')} className="mx-5 my-2.5 py-0 px-0 w-50 text-l text-red-500 bg-transparent border-0 border-b-2 border-red-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-red-600 peer"> 
            Limpiar filtros 
          </button>
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
        containerClassName="flex justify-center my-4"
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