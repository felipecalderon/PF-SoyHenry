import React from 'react'
function Pdf() {
  return (
    <>
        <object 
        data={require("./curriculumejemplo.pdf")}
        type="application/pdf"
      style={{width: "100%",
        height: "100vh"}}>
            
        </object>
    </>
  )
}

export default Pdf