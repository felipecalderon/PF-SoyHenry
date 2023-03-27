import React from "react";
import { useState, useEffect } from "react";
import  {useSelector} from "react-redux"

import user from "../../assets/user.png";
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
  const [data, SetData] = useState({
    username:"",
    apellido:"",
    edad:"",
    ubicacion:"",
    descripcion:"",
    idioma:"",
    habilidades:[],
    favoritos:[],
    postulaciones:[],
    tel:"",
    mail:"",
    linkedin:"",
    facebook:"",
    github:""
    
  });
  const {user}= useSelector(state=>state.userRegisterSlice)
/**
 * Postulants
: 
[{…}]
active
: 
true
createdAt
: 
"2023-03-27T01:45:55.276Z"
email
: 
"francovz@live.com.ar"
id
: 
"6e7c1fdb-657a-48f2-8e1f-440912f08426"
password
: 
"$2b$10$tzKXgn0Zt.LZR40NsXLtHeZR4YlT.Y2BR9sQiq0lDLktX/j0pJIhe"
rol
: 
"Postulante"
state_aplication
: 
null
updatedAt
: 
"2023-03-27T01:45:55.276Z"
username
: 
"franco"
 */
  useEffect(() => {
    const dataUserLocal = localStorage.getItem("userLogin");
    const dataUser = JSON.parse(dataUserLocal);
    SetData({
    
      ...dataUser
    });
    console.log(dataUser);
  }, []);

  return (
    <ul className="flex flex-col justify-between items-start p-8 h-full ">
      <li>
        <img
          src={user}
          alt=""
          width="150px"
          className="border rounded-full m-1 "
        />
      </li>

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        {data.username} {user?.Postulants[0].lastnames} , {data.edad}
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
          consequatur nisi perspiciatis earum neque aspernatur recusandae
          numquam, corrupti quasi explicabo alias placeat libero cumque ad
          repellat adipisci aut! Obcaecati, quasi!
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
        Datos de contacto :
        <ul>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            tel:
          </li>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            mail:{" "}
          </li>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            redes sociales:{" "}
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default User;
