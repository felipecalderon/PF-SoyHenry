import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import usuario from "../../assets/user.png";

const skills = [

];
function User() {
  const { user } = useSelector(state => state.userRegisterSlice)
  const dataUserLocal = localStorage.getItem("userLogin");
  const dataUser = JSON.parse(dataUserLocal);
  const [data, SetData] = useState(dataUser);
  console.log(data)
  // useEffect(() => {
    //traer datos de redux
  // }, []);
  return (
    <ul className="flex flex-col justify-between items-start p-8 h-full ">
      <li>
        <img
          src={dataUser.photo || usuario}
          alt=""
          width="150px"
          className="border rounded-full m-1 "
        />
      </li>

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        {data.names} {data.lastnames} , {data?.Postulants instanceof Array ? data.Postulants[0].age : data.Postulants.age}
      </li>
      <hr className="border border-b-gray-100  w-full " />

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Ubicacion
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Titulo
      </li>

      <li className="">
        <h2 className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
          Descripcion
        </h2>
        <p className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400" style={{minHeight:"300px"}}>
   
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
          { skills.length ? 
          skills.map((el) => (
            <li className="m-2 p-2 rounded-xl bg-white border text-sm text-center flex justify-between items-center"> {el}</li>))
            :<><p className={` select-none font-bold  mb-1 text-white text-xl text-center`}>La lista de habilidades está vacía.</p><br/>
            <p className="select-none text-gray-400 text-sm text-center"> Seleccione una habilidad para continuar</p>
            </>
            }

        </ul>
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
        Datos de contacto
        <ul>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            Telefono
            <p>{data.phone}</p>
          </li>
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-gray-400">
            Facebook
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
