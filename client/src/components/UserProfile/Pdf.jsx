import React from 'react'
function Pdf() {
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const pdf = dataUserLocalStorage.Postulants[0].curriculum_pdf
  return (
    <>
        <object 
        data={pdf}
        type="application/pdf"
         style={{width: "100%",
           height: "100vh"}}>
            
        </object>
    </>
  )
}

export default Pdf