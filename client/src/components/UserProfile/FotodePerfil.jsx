import React, { useState } from "react";
import usuario from "../../assets/user.png";

function FotodePerfil() {
  const [image, setImage] = useState(null);
  const [notValidImage, setNotValidImage] = useState(true);

  const handleImageInputChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage.size > 5 * 1024 * 1024) {
      // manejar el caso en el que la imagen seleccionada es demasiado grande
      setImage(null);
      setNotValidImage(true);
    }

    if (!["image/png", "image/jpeg"].includes(selectedImage.type)) {
      // manejar el caso en el que el tipo de archivo seleccionado no es compatible
      setImage(null);
      setNotValidImage(true);
    } else {
      setNotValidImage(false);
      setImage(URL.createObjectURL(selectedImage));
    }
  };

  return (
    <div>
      <img src={image || usuario} alt="" width="150px" className="border rounded-full m-4" />
      <input type="file" className="w-1/2" onChange={handleImageInputChange} />
      <button
        onClick={(event) => {
          event.preventDefault();
        }}
        className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed"
        disabled={notValidImage}
      >
        Subir imagen
      </button>
    </div>
  );
}

export default FotodePerfil;