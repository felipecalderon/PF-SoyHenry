import Card from "./Card"
import ReactPaginate from 'react-paginate'; // libreria para hacer el paginado
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostList } from '../../redux/slices/postSlices';
import useFetch from '../Hooks/useFetch';

// Components
import { spinnerPurple } from './spinner';
import { NavLanding } from "../NavLanding/NavLanding";
import { useNavigate } from 'react-router-dom';
import PremiumButtonComponent from "../BotonPremium/BotonPremium";
import SpanFiltros from "../BotonPremium/SpanFiltros";

import Footer from "../Footer/Footer";


const Cards = () => {
  const navigate = useNavigate()
  const dataUserLocal = JSON.parse(localStorage.getItem("userLogin"))
  const dataUserGoogle = JSON.parse(localStorage.getItem("usergoogle"))

  const dispatch = useDispatch()
  const { postJobs } = useSelector((state) => state.postSlice)
  const [filters, setFilters] = useState({});
  const [title, setTitle] = useState('a');
  const [search, setSearch] = useState('');


  // Filtrado  
  const queryString = new URLSearchParams(filters).toString();

  const urlFilters = `/jobs?title=${title}&${queryString}`;

  const handleFilterChange = (name, value) => {
    if (dataUserLocal?.premium) {
      name === 'resetFilter' ?
        setFilters({})
        : setFilters({
          ...filters,
          [name]: value,
        });
    }
  }

  const { data, isLoading } = useFetch(urlFilters)

  const [pageNumber, setPageNumber] = useState(0);
  const [perPage] = useState(9);

  const currentPage = parseInt(localStorage.getItem('currentPage')); // pagina actual

  useEffect(() => {
    if (data) dispatch(getPostList(data))
    const objetoJSON = JSON.stringify(filters) // vuelve el objeto un JSON para poder guardarse en localStorage
    localStorage.setItem('filtersLocalStorage', objetoJSON); //  Guardado local para que se mantengan la pagina en la que estaba el usuario
    setPageNumber(currentPage ? currentPage : 0);
    window.addEventListener('beforeunload', handleUnload); // Agregar evento beforeunload para limpiar localStorage
    return () => {
      window.removeEventListener('beforeunload', handleUnload); // Eliminar evento beforeunload al desmontar el componente
    }
  }, [dispatch, data, filters, currentPage])

  // Paginado
  const getPaginatedData = () => {
    const startIndex = pageNumber * perPage;
    const endIndex = startIndex + perPage;
    return postJobs.slice(startIndex, endIndex);
  };
  const handlePageClick = (selectedPage) => {
    localStorage.setItem('currentPage', selectedPage.selected); //  Guardado local para que se mantengan la pagina en la que estaba el usuario
    setPageNumber(selectedPage.selected);
    window.scrollTo(0, 0); // Llamamos a scrollTo() para desplazarnos al inicio
  };

  // SearchBar
  const handleSearch = (event) => {
    event.preventDefault();
    setTitle(search)
    localStorage.setItem('title', search);
  };

  // Guardado local para que se mantengan los filtros en el select
  //  Obtiene el elemento select del filtro
  const dateFilter = document.getElementById('date');
  const experienceFilter = document.getElementById('experience');
  const modalityFilter = document.getElementById('modality');
  const salaryFilter = document.getElementById('salary');

  //  Escucha cambios en el select del filtro y guardar el valor seleccionado en localStorage si existen los select
  if (dateFilter || experienceFilter || modalityFilter || salaryFilter) {
    dateFilter?.addEventListener('change', (event) => {
      localStorage.setItem('dateFilterSelect', event.target.value);
    });
    experienceFilter?.addEventListener('change', (event) => {
      localStorage.setItem('expFilterSelect', event.target.value);
    });
    modalityFilter?.addEventListener('change', (event) => {
      localStorage.setItem('mtyFilterSelect', event.target.value);
    });
    salaryFilter?.addEventListener('change', (event) => {
      localStorage.setItem('slyFilterSelect', event.target.value);
    });
  }

  //  Restablece el valor seleccionado en el select del filtro desde localStorage si existe los select
  const dateFilterSelect = localStorage.getItem('dateFilterSelect');
  const expFilterSelect = localStorage.getItem('expFilterSelect');
  const mtyFilterSelect = localStorage.getItem('mtyFilterSelect');
  const slyFilterSelect = localStorage.getItem('slyFilterSelect');
  const titleSearchbar = localStorage.getItem('title') // titulo buscado en la searchbar
  const filtersLocalStorage = localStorage.getItem("filtersLocalStorage"); // filtros aplicados
  const filtros = JSON.parse(filtersLocalStorage); // Convertir el objeto JSON en un objeto JavaScript

  if (titleSearchbar && title !== 'a')//setTitle(titleSearchbar)
    if (filtersLocalStorage && Object.keys(filtros).length !== 0 && Object.keys(filters).length === 0) setFilters(filtros) // Si hay filtros guardados los aplica
  if (dateFilterSelect && dateFilter) dateFilter.value = dateFilterSelect;
  if (expFilterSelect && experienceFilter) experienceFilter.value = expFilterSelect;
  if (mtyFilterSelect && modalityFilter) modalityFilter.value = mtyFilterSelect;
  if (slyFilterSelect && salaryFilter) salaryFilter.value = slyFilterSelect;

  //  Escucha el evento click en el botón de eliminar filtros, borra los datos almacenados en localStorage y los filtros aplicados 
  const botonEliminarFiltros = document.getElementById('btn-reset');
  if (botonEliminarFiltros) {
    botonEliminarFiltros.addEventListener('click', () => {
      localStorage.removeItem("dateFilterSelect");
      localStorage.removeItem('expFilterSelect');
      localStorage.removeItem("slyFilterSelect");
      localStorage.removeItem("filtersLocalStorage");
      localStorage.removeItem("mtyFilterSelect");
      localStorage.removeItem("currentPage");
      localStorage.removeItem("title");
      setFilters({})
      setTitle('a')
    });
  }
  const handleUnload = () => {
    localStorage.removeItem("dateFilterSelect");
    localStorage.removeItem('expFilterSelect');
    localStorage.removeItem("slyFilterSelect");
    localStorage.removeItem("filtersLocalStorage");
    localStorage.removeItem("mtyFilterSelect");
    localStorage.removeItem("currentPage");
    localStorage.removeItem("title");

    setFilters({})
    setTitle('a')
  };

  useEffect(() => {
    if (!dataUserLocal && !dataUserGoogle) navigate('/')
  }, []) // eslint-disable-line

  // if (isLoading) return spinnerPurple()
  const menuOffers = [
    {
      name: "Inicio",
      link: "/"
    },
  ]
  return (
    <>
      <NavLanding menu={menuOffers} />

      <div className="bg-primary-light dark:bg-secondary-dark pt-20">

        {/* Muestra la Searchbar */}
        <form onSubmit={handleSearch}>
          <div className="relative mx-10 my-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="default-search" onChange={(event) => setSearch(event.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca tu empleo soñado..." required />
            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        {
          titleSearchbar ? <p className="m-5 flex justify-center items-center text-2xl font-semibold tracking-tight text-gray-900 dark:text-white" > Buscando las ofertas por: {titleSearchbar} </p> : <p></p>
        }
        <div class="flex justify-center items-center">
          <PremiumButtonComponent />
        </div>

        {/* Muestra los filtros */}
        <div class="flex justify-center items-center">
          < SpanFiltros />
        </div>
        <form className="flex flex-wrap justify-center">
          <select id="date" onChange={(e) => handleFilterChange('dt', e.target.value)} defaultValue={'DEFAULT'} disabled={!dataUserLocal?.premium} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer">
            <option value="DEFAULT" disabled> Por Fecha: </option>
            <option value="1"> Hoy </option>
            <option value="4"> Últimos 3 dias </option>
            <option value="16"> Últimos 15 dias </option>
            <option value="31"> Último mes </option>
          </select>
          <select id="experience" onChange={(e) => handleFilterChange('exp', e.target.value)} defaultValue={'DEFAULT'} disabled={!dataUserLocal?.premium} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer">
            <option value="DEFAULT" disabled> Por Experiencia: </option>
            <option value="0"> Sin experiencia </option>
            <option value="1"> 1 año de experiencia </option>
            <option value="2-4"> 2-4 años de experiencia </option>
            <option value="5"> Más de 5 años </option>
          </select>
          <select id="modality" onChange={(e) => handleFilterChange('mty', e.target.value)} defaultValue={'DEFAULT'} disabled={!dataUserLocal?.premium} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer">
            <option value="DEFAULT" disabled> Por Modalidad: </option>
            <option value="fr"> Remoto </option>
            <option value="rl"> Remoto local </option>
            <option value="h"> Híbrido </option>
            <option value="nr"> Presencial </option>
          </select>
          <select id="salary" onChange={(e) => handleFilterChange('sly', e.target.value)} defaultValue={'DEFAULT'} disabled={!dataUserLocal?.premium} className="mx-5 py-2.5 px-0 w-50 text-l text-yellow-500 bg-transparent border-0 border-b-2 border-purple-300 appearance-none focus:outline-none focus:ring-0 focus:border-purple-600 peer">
            <option value="DEFAULT" disabled> Por Salario: </option>
            <option value="1"> Menos de 200 </option>
            <option value="2"> Más de 200 </option>
            <option value="3"> Más de 500 </option>
            <option value="4"> Más de 500 </option>
          </select>
          <button id="btn-reset" type='reset' onClick={() => handleFilterChange('resetFilter')} disabled={!dataUserLocal?.premium} className="mx-5 my-2.5 py-0 px-0 w-50 text-l text-red-500 bg-transparent border-0 border-b-2 border-red-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer">
            Limpiar filtros
          </button>
        </form>
        {/* Muestra las cards */}
        <div className="flex flex-wrap gap-3 justify-center py-6">
          {
            isLoading
              ? spinnerPurple()
              : getPaginatedData().map((card) => (
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
        <div className="pb-3">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(postJobs.length / perPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={currentPage ? currentPage : 0}
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
        < Footer />
      </div>
    </>
  )
}

export default Cards