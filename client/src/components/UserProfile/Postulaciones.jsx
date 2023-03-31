import React from 'react'
import logofusionajob from '../../assets/logofusionajob.png'

function Postulaciones() {
    // const data = [
    //     "Desarrollador Frontend",
    //     "Desarrollador Backend",
    //     "Diseñador UX/UI",
    //     "Desarrollador Fullstack",
    //     "Ingeniero de Software",
    //     "Analista de Datos",
    //     "Arquitecto de Software",
    //     "Desarrollador de Aplicaciones Móviles",
    //     "Ingeniero DevOps",
    //     "Desarrollador Frontend",
    //     "Desarrollador Backend",
    //     "Diseñador UX/UI",
    //     "Desarrollador Fullstack",
    //     "Ingeniero de Software",
    //     "Analista de Datos",
    //     "Arquitecto de Software",
    //     "Desarrollador de Aplicaciones Móviles",
    //     "Ingeniero DevOps",  "Desarrollador Frontend",
    //     "Desarrollador Backend",
    //     "Diseñador UX/UI",
    //     "Desarrollador Fullstack",
    //     "Ingeniero de Software",
    //     "Analista de Datos",
    //     "Arquitecto de Software",
    //     "Desarrollador de Aplicaciones Móviles",
    //     "Ingeniero DevOps",];
    const data=[]
return (

    <>
        {
            data?.length ? <>
<div className='h-1043px overflow-y-auto'  style={{maxHeight:" 1040px"}}>{data.map((el)=><h2 className="bg-white rounded-xl p-4 border mb-4 text-center">{el}</h2>)}</div>
            
            </>:<div className='flex flex-col justify-around w-full h-2/3'>
      <h2 className="text-3xl font-bold text-white mb-3 text-center">Aún no te has postulado a ningún trabajo </h2>
    <p className='text-gray-400 text-2xl text-center'>¡Explora las oportunidades de trabajo disponibles y postúlate para empezar a construir tu carrera!</p>
    <img src={logofusionajob} alt='logo' className="text-center" />
    </div>
    
        }
        
    </>
)
}

export default Postulaciones