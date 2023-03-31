import React, { useState } from "react";
import usuario from "../../assets/user.png";
import axios from "axios"

function FotodePerfil({photo}) {
  const [imageToRender, setImageToRender] = useState(null);
  const [imagetosend,setImageTosend]=useState(null)
  const [notValidImage, setNotValidImage] = useState(true);
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = dataUserLocalStorage.id

  const handleImageInputChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage.size > 5 * 1024 * 1024) {
      // manejar el caso en el que la imagen seleccionada es demasiado grande
      setImageToRender(null);
      setNotValidImage(true);
    }
    if (!["image/png", "image/jpeg"].includes(selectedImage.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setImageToRender(null);
      setNotValidImage(true);
    } else {
      setNotValidImage(false);
      setImageToRender(URL.createObjectURL(selectedImage));
      setImageTosend(selectedImage)
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imagenes", imagetosend);
    axios
      .post(`/upload-photo-user/${idUser}`, formData)
      .then((response) => {
        console.log(response.data);
        alert("se modifico la foto de perfil")
        window.location.reload();

        
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className="w-full flex flex-col items-center" >
      <img src={imageToRender || photo || usuario} alt="" width="150px" className="border rounded-full m-4" />
      <input type="file" className="w-1/2" onChange={handleImageInputChange} />
      <button
        onClick={handleSubmit}
        className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-2 rounded disabled:cursor-not-allowed"
        disabled={notValidImage}
      >
        Subir imagen
      </button>
    </div>
  );
}

export default FotodePerfil;