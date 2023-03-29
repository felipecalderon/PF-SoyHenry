import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import usuario from "../../assets/user.png";

const skills = [
  "Desarrollo web",
  "Desarrollo móvil",
  "Bases de datos",
  "Seguridad informática",
  "Redes de computadoras",
  "Inteligencia artificial",
  "Aprendizaje automático",
  "Ciencia de datos",
  "Gestión de proyectos",
  "Diseño UX/UI",
  "Análisis de negocios",
  "Cloud computing",
  "DevOps",
  "Automatización de pruebas",
  "Ingeniería de software",
  "Realidad virtual y aumentada",
  "Blockchain",
  "Ciberseguridad",
  "Arquitectura de software",
  "Gestión de la información",
];
function User() {
  const { user } = useSelector(state => state.userRegisterSlice)
  const dataUserLocal = localStorage.getItem("userLogin");
  const dataUser = JSON.parse(dataUserLocal);
  const [data, SetData] = useState(dataUser);
  console.log(data)
  // useEffect(() => {
  // }, []);
  return (
    <ul className="flex flex-col justify-between items-start p-8 h-full ">
      <li>
        <img
          src={usuario}
          alt=""
          width="150px"
          className="border rounded-full m-1 "
        />
      </li>

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        {data.names} {data.lastnames} , {data?.Companies instanceof Array ? data.Postulants[0].age : data.Postulants.age}
      </li>
      <hr className="border border-b-gray-100  w-full " />

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Ubicacion{" "}
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Titulo{" "}
      </li>

      <li className="">
        <h2 className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
          Descripcion
        </h2>
        <p className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
          Describa sus habilidades, experiencia y objetivos profesionales relacionados con el sector de TI. Incluya detalles sobre sus conocimientos en lenguajes de programación, tecnologías y herramientas, así como su capacidad para trabajar en equipo y resolver problemas técnicos complejos.
        </p>
      </li>
      <hr className="border border-b-gray-100  w-full " />

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Idioma
      </li>

      <hr className="border border-b-gray-100  w-full " />

      <li className="">
        <h2 className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
          Habilidades:
        </h2>
        <ul
          className="flex flex-wrap justify-start overflow-y-auto"
          style={{ maxHeight: "90px" }}
        >
          {skills.map((el) => (
            <li className="m-2 p-2 rounded-xl bg-white border text-sm text-center flex justify-between items-center">
              {el}
            </li>
          ))}
        </ul>
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Datos de contacto
        <ul>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            Telefono
          </li>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            Fabook
          </li>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            Linkedin
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default User;
