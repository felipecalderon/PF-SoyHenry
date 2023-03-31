
import React from "react";
import { useState } from "react";

function Curriculum() {
  const message =
    "Aún no has cargado tu curriculum. ¡Cárgalo ahora para aumentar tus posibilidades de conseguir un trabajo en FusionaJob!";
  const pdf = "";
  const [file, setFile] = useState(null);
  const [isPdf, SetIsPdf] = useState(false);
  const [error, setError] = useState({
    size: false,
    type: false,
  });
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
      return;
    }

    if (!["application/pdf"].includes(selectedFile.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setError({
        size:false,
        type: true,
      });
      setFile(null);
      SetIsPdf(false);

      return;
    }
    setError({
      type: false,
      size: false,
    });
    SetIsPdf(true);
    setFile(selectedFile);
  };

const handleSubmit=(event)=>{
  event.preventDefault()
}


  return (
    <div
      className=" flex justify-around flex-grow h-full "
      style={{ textAlign: "center" }}
    >
      {pdf ? (
        <div className="h-1/2">
          <object
            data={pdf}
            type="application/pdf"
            style={{ width: "100%", height: "100%" }}
          >

          </object>
        </div>
      ) : (
        <div className="h-1/2 flex flex-col justify-around">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            Aún no has cargado tu curriculum
          </h2>
          <p className="text-gray-400 text-2xl text-center">
            ¡Cárgalo ahora para aumentar tus posibilidades de conseguir un
            trabajo en FusionaJob!
          </p>

          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handlerFile} />
            <div>
              {error.size ? (
                <p>EL tamaño del archivo maximo es de 5MB</p>
              ) : null}
              {error.type ? <p>Solo puedes ingresar archivos pdfs</p> : null}
            </div>
            <button
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={!isPdf}
            >
              Subir Curriculum
            </button>
          </form>
        </div>
      )}
      {pdf ? (
        <>
          <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            <a href="./profile/pdf" target="_blank">
              Ver Curriculum
            </a>
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Descargar Curriculum
          </button>
          <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Cambiar curriculum
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Curriculum;
