import React from 'react';


function SpanFiltros() {
    const userData = JSON.parse(localStorage.getItem('userLogin'));
    if(!userData?.premium && userData.rol === 'Postulante'){
    return (
    <div>
      <span style={{
                  display: 'block',
                  padding: '0.5rem',
                  backgroundColor: 'orange',
                  color: 'white',
                  border: '1px solid orange',
                  borderRadius: '0.25rem',
                  fontWeight: 'bold'
                }}
                  > Solo puedes usar estos filtros si tienes una cuenta premium</span>
      
    </div>
  );
      }
}

export default SpanFiltros;
