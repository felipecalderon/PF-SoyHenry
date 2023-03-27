import React from 'react'

function Postulaciones() {
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
        "Desarrollador Frontend",
        "Desarrollador Backend",
        "Diseñador UX/UI",
        "Desarrollador Fullstack",
        "Ingeniero de Software",
        "Analista de Datos",
        "Arquitecto de Software",
        "Desarrollador de Aplicaciones Móviles",
        "Ingeniero DevOps",  "Desarrollador Frontend",
        "Desarrollador Backend",
        "Diseñador UX/UI",
        "Desarrollador Fullstack",
        "Ingeniero de Software",
        "Analista de Datos",
        "Arquitecto de Software",
        "Desarrollador de Aplicaciones Móviles",
        "Ingeniero DevOps",];
return (
<div className='h-1043px overflow-y-auto'  style={{maxHeight:" 1040px"}}>{data.map((el)=><h2 className="bg-white rounded-xl p-4 border mb-4 text-center">{el}</h2>)}</div>
)
}

export default Postulaciones