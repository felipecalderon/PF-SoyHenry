import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import usuario from "../../assets/user.png";

//mui
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Perks from "../JobDetail/Perks";

const skills = [

];
function User() {
  const { user } = useSelector(state => state.userRegisterSlice)
  const dataUserLocal = localStorage.getItem("userLogin");
  const dataUser = JSON.parse(dataUserLocal);
  const dataUserGoogle = JSON.parse(localStorage.getItem('usergoogle'))
  const dataUserLocalStorage = JSON.parse(localStorage.getItem('userLogin'))

  const [data, SetData] = useState(dataUser);
  console.log(data)
  // useEffect(() => {
  //traer datos de redux
  // }, []);
  return (
    <ul className="w-full flex flex-col justify-between items-start px-8 py-4 h-full ">
      <li className="w-full flex flex-col items-center">
        <img
          src={dataUser?.photo || dataUserGoogle?.photo || usuario}
          alt=""
          width="150px"
          className="border rounded-full m-1 "
        />
      </li>

      <li className="w-full mb-2 flex justify-center text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
        {data.names} {data.lastnames} , {data?.Postulants instanceof Array ? data.Postulants[0].age : data.Postulants.age}
      </li>
      <hr className="border border-b-gray-100  w-full " />

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
        <p style={{ fontWeight: "bold" }}> Ubicación: </p>   {dataUserLocalStorage?.city},{dataUserLocalStorage?.country}
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
        <p style={{ fontWeight: "bold" }}> Titulo: </p>  {dataUserLocalStorage?.Postulants[0].title}
      </li>

      <li className="">
        <h2 className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
          <p style={{ fontWeight: "bold" }}> Descripción: </p>
        </h2>
        <p className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
          {dataUserLocalStorage?.Postulants[0].description_postulant}
        </p>
      </li>
      <hr className="border border-b-gray-100  w-full " />

      <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
        <p style={{ fontWeight: "bold" }}> Idioma/s: </p>  {dataUserLocalStorage?.Postulants[0].languages}
      </li>

      <hr className="border border-b-gray-100  w-full " />

      <li className="">
        <h2 className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
          <p style={{ fontWeight: "bold" }}> Habilidades: </p>
        </h2>
        <div className="flex flex-row flex-wrap gap-3">
          {dataUserLocalStorage?.Postulants[0].tecnology?.map((habilidades) => {
            return <Perks perk={habilidades} />
          })}
        </div>
        <ul
          className="flex flex-wrap justify-start overflow-y-auto"
          style={{ maxHeight: "90px" }}
        >
          {dataUserLocalStorage?.Postulants[0].tecnology?.length ?
            skills.map((el) => (
              <li className="m-2 p-2 rounded-xl bg-white border text-sm text-center flex justify-between items-center"> {el}</li>))
            : <><p className={` select-none font-bold  mb-1 text-white text-xl text-center`}>La lista de habilidades está vacía.</p><br />
              <p className="select-none text-gray-400 text-sm text-center"> Seleccione una habilidad para continuar</p>
            </>
          }

        </ul>
      </li>
      <hr className="border border-b-gray-100  w-full " />
      <li className="w-full mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
        <p style={{ fontWeight: "bold" }}> Datos de contacto </p>
        <ul className="w-full">
          <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
            <p style={{ fontWeight: "bold" }}> Celular: </p>
            <p>{dataUserLocalStorage?.phone}</p>
          </li>
          <div className="flex flex-row w-full justify-center">
            <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white h-8">
              {
                dataUserLocalStorage?.Postulants[0].facebook
                  ? <a href={dataUserLocalStorage?.Postulants[0].facebook} target="_blank" rel="noreferrer"  > <FacebookIcon sx={{ fontSize: 70 }} /> </a>
                  : null
              }

            </li>
            <li className="mb-2 text-lg font-normal text-gray-800 lg:text-xl dark:text-white">
              {
                dataUserLocalStorage?.Postulants[0].linkedin
                  ? <a href={dataUserLocalStorage?.Postulants[0].linkedin} target="_blank" rel="noreferrer"  > <LinkedInIcon sx={{ fontSize: 70 }} /> </a>
                  : null
              }

            </li>
          </div>
        </ul>
      </li>
    </ul>
  );
}

export default User;
