import React from 'react'

function Curriculum() {
  return (
    <div className='flex flex-col justify-between flex-grow h-full' style={{textAlign:"center"}}>

      <div className='h-4/6 '>
        <object 
        data={require("./curriculumejemplo.pdf")}
        type="application/pdf"
      style={{width: "100%",
        height: "100%"}}>
            
        </object></div>
      <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'><a href="./profile/pdf" target="_blank">ver Curriculum</a></button>
      <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>Descargar Curriculum</button>
      <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>Cambiar curriculum</button>
    </div>
  )
}

export default Curriculum