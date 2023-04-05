import React from "react";
import { useState } from "react";
import axios from "axios"
import LoadingButton from '@mui/lab/LoadingButton';
import Box from "@mui/material/Box";

function Curriculum() {
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const idPostulante=dataUserLocalStorage.Postulants[0].id
  const [file, setFile] = useState(null);
  const pdf = dataUserLocalStorage.Postulants[0].curriculum_pdf ;
  const [isPdf, SetIsPdf] = useState(false);
  const [error, setError] = useState({
    size: false,
    type: false,
  });
  const [loading, setLoading] = useState(false);

  const handlerFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 5 * 1024 * 1024) {
      // manejar el caso en el que el archivo seleccionado es demasiado grande
      setError({
        type:false,
        size: true,
      });
      setFile(null);
      SetIsPdf(false);
   return ;
    }

    if (!["application/pdf"].includes(selectedFile.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setError({
        size:false,
        type: true,
      });
      setFile(null);
      SetIsPdf(false);

      return ;
    }else{
  setError({
  type: false,
  size: false,
});
SetIsPdf(true);
setFile(selectedFile);
    }

  };

const handleSubmit=(event)=>{
  event.preventDefault()
  setLoading(true); 
  const formData = new FormData();
  formData.append("pdf", file);
  axios.post(`/upload-cv-user/${idPostulante}`,formData)
  .then((respose)=>{
    alert("Se Agrego el nuevo curriculum a la base de datos")
    window.location.reload();

  })
  .catch((error)=>{
    console.log(error)
    alert("Algo salio mal  </3")
  })
  .finally(() => {
    setLoading(false); // establecer el estado de carga en false después de completar la solicitud
  });
}
const visualizar=()=>{
  if (pdf) {
    return pdf
  }
  if (!pdf && file) {
    return file
  }
  if (!pdf && !file) {
    return false;
  }
}



  return (
    <div
      className=" flex justify-start flex-grow   flex-col"  style={{ textAlign: "center" }}>
      {pdf ? (
        <div  className="mb-9">
          <object
            data={visualizar() }
            type="application/pdf"
            style={{ width: "100%", height: "700px" }}
          >
          </object>

        </div>
      ) : (
        <div className=" flex flex-col justify-around mb-9 ">
          <h2 className="text-3xl font-bold text-white  text-center">
            Aún no has cargado tu curriculum
          </h2>
          <p className="text-gray-400 text-2xl text-center">
            ¡Cárgalo ahora para aumentar tus posibilidades de conseguir un
            trabajo en FusionaJob!
          </p>

         
        </div>
      )} <form
      onSubmit={handleSubmit}
      className="mb-9">
       <input type="file"
        onChange={handlerFile}
        className="mb-9"
         />
       <div>
         {error.size ? (
           <p className="text-red-600 select-none font-bold  mb-1">EL tamaño del archivo maximo es de 5MB</p>
         ) : null}
         {error.type ? <p className="text-red-600 select-none font-bold  mb-1">Solo puedes ingresar archivos pdfs</p> : null}
       </div>
       <Box sx={{ "& > button": { m: 1, width: "150px", height: "60px", fontWeight: "700" } }}>
        <LoadingButton
          className={`${!isPdf &&  'cursor-not-allowed'}`}
          onClick={handleSubmit}
          loading={loading}
          color="warning"
          loadingPosition="center"
          variant="contained"
          disabled={!isPdf || loading}
        >
       {pdf ? 'Cambiar Curriculum' : 'Subir Curriculum'}
        </LoadingButton>
      </Box>

     </form>
       
       { pdf?    <a href={pdf} 
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              Ver Curriculum
            </a>:null}
          

          
     
    </div>
  );
}

export default Curriculum;

{/* <a 
className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
href={pdf} download>
  Descargar Curriculum
</a>
*/}

