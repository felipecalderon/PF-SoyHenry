import React from 'react'



function Favoritos() {

    const SVG_FAV = <svg width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>

const data = [
    "Desarrollador Frontend",
    "Desarrollador Backend",
    "Diseñador UX/UI",
    "Desarrollador Fullstack",
    "Ingeniero de Software",
    "Analista de Datos",
    "Arquitecto de Software",
    "Desarrollador de Aplicaciones Móviles",
    "Ingeniero DevOps",
  ];
  return (
    <>{data.reverse().map((el)=><h2 className="bg-white rounded-xl p-4 border mb-4 text-center flex justify-between">{el.title}</h2>)}</>
  )
}

export default Favoritos