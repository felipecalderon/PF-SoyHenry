import React from 'react'


function Configuracion() {
 

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name"  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="age">Edad:</label>
        <input type="text" id="age" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"  />
      </div>
      <div>
        <label htmlFor="location">Ubicación:</label>
        <input type="text" id="location" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"  />
      </div>
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title"  className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" ></textarea>
      </div>
      <div>
        <label htmlFor="languages">Idiomas:</label>
        <input type="text" id="languages" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
      </div>
      <div>
        <label htmlFor="skills">Habilidades:</label>
        <input type="text" id="skills" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <div>
        <label htmlFor="phone">Telefono:</label>
        <input type="text" id="phone" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"></input>
      </div>
      <div>
        <label htmlFor="mail">Mail:</label>
        <input type="mail" id="mail" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"></input>
      </div>
      <div>
        <label htmlFor="social_media">Redes sociales:</label>
        <input type="text" id="social_media" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"></input>
      </div>
      <div>
        <label htmlFor="adress">Direccion:</label>
        <input type="text" id="adress" className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"></input>
      </div>
      
      
      </form>)
}

export default Configuracion