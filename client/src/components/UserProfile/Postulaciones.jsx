import React from "react";
import logofusionajob from "../../assets/logofusionajob.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Postulaciones() {
  const navigate = useNavigate();
  const idUser = JSON.parse(localStorage.getItem("userLogin")).Postulants[0]
    .userId;
  const [data, SetData] = useState([]);
  const [allData, SetAllData] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: "",
    fecha: "",
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;

    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  const aplicarFiltros = (filtros) => {
    let objetosFiltrados = [...allData];
    //filtro de estado aun no funciona
    if (filtros.fecha === "") {
      objetosFiltrados = [...allData];
    }
    if (filtros.fecha === "mas reciente") {
      objetosFiltrados = objetosFiltrados.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (filtros.fecha === "mas antiguo") {
      objetosFiltrados = objetosFiltrados.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (filtros.estado) {
      if (filtros.estado === "Sin especificar")
        objetosFiltrados = objetosFiltrados.filter(
          (el) => !el.status && filtros.estado === "Sin especificar"
        );
      else
        objetosFiltrados = objetosFiltrados.filter(
          (objeto) => objeto.status === filtros.estado
        );
    }

    return objetosFiltrados;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`/aplicates/${idUser}`);
        const res2 = await axios.get(`/applyapioffer/${idUser}`);
        SetData([...res1.data, ...res2.data]);
        //   console.log([...res1.data, ...res2.data])
        SetAllData([...res1.data, ...res2.data]);
      } catch (err) {
        console.log(err);
        console.log("Algo salió mal dentro de Postulaciones.jsx");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-around">
        <select
          className="bg-white rounded-xl  border mb-4 text-center  flex-grow "
          name="estado"
          onChange={handleFiltroChange}
          disabled={data.length === 0}
        >
          <option value="">Filtrar por estado</option>
          <option value="send">Enviado</option>
          <option value="viewed">Visto</option>
          <option value="no_select">Descartado</option>
          <option value="select">Seleccionado</option>
          <option value="Sin especificar">Sin especificar</option>
        </select>
        <select
          className="bg-white rounded-xl  border mb-4 text-center flex-grow"
          name="fecha"
          onChange={handleFiltroChange}
          disabled={data.length === 0}
        >
          <option value="">Ordenar por fecha</option>
          <option value="mas reciente">mas recientes a mas antiguos</option>
          <option value="mas antiguo">mas antiguos a mas recientes</option>
        </select>
      </div>

      {data?.length ? (
        <>
          <div
            className="h-1043px overflow-y-auto"
            style={{ maxHeight: " 1040px" }}
          >
            {aplicarFiltros(filtros).map((el) => (
              <div className="bg-white rounded-xl p-4 border mb-4 text-center flex justify-around">
                <h2
                  className="text-lg font-bold cursor-pointer hover:underline"
                  onClick={() => navigate( `/detail/${el.offerId}?title=${el.Offer ? el.Offer.title : el.title}`)}
                >
                  {el.Offer ? el.Offer.title : el.title}
                </h2>
                <div className="text-sm text-gray-400" name="estado">
  <h2 class=" font-bold text-blue-500">Estado</h2>
  <h2 class=" font-medium text-green-500 text-center">
      {el.status
        ? el.status[0].toUpperCase() + el.status.slice(1)
        : "Sin especificar"}
  </h2>
</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-start w-full h-2/3">
          <h2 className="text-3xl font-bold text-white mt-3 mb-3 text-center">
            Aún no te has postulado a ningún trabajo
          </h2>
          <p className="text-gray-400 text-2xl mt-3 mb-3 text-center">
            ¡Explora las oportunidades de trabajo disponibles y postúlate para
            empezar a construir tu carrera!
          </p>
          <img src={logofusionajob} alt="logo" className="text-center mt-3 mb-3" />
        </div>
      )}
    </>
  );
}

export default Postulaciones;

