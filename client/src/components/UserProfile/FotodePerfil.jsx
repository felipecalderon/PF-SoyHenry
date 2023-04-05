import React, { useState } from "react";
import usuario from "../../assets/user.png";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

function FotodePerfil({ photo }) {
  const [imageToRender, setImageToRender] = useState(null);
  const [imagetosend, setImageTosend] = useState(null);
  const [notValidImage, setNotValidImage] = useState(true);
  const dataUserLocalStorage = JSON.parse(localStorage.getItem("userLogin"));
  const idUser = dataUserLocalStorage.id;
  const [loading, setLoading] = useState(false);

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
      setImageTosend(selectedImage);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("imagenes", imagetosend);
    axios
      .post(`/upload-photo-user/${idUser}`, formData)
      .then((response) => {
        console.log(response.data);
        alert("se modifico la foto de perfil");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <img
        src={imageToRender || photo || usuario}
        alt=""
        width="150px"
        className="border rounded-full m-4"
      />
      <input
        type="file"
        className="text-white font-bold py-2 px-4 rounded"
        onChange={handleImageInputChange}
      />

      <Box sx={{ "& > button": { m: 1, width: "150px", height: "60px", fontWeight: "700" } }}>
        <LoadingButton
          className={`${notValidImage ? "cursor-not-allowed pointer-events-none" : ""}`}
          onClick={handleSubmit}
          loading={loading}
          color="warning"
          loadingPosition="center"
          variant="contained"
          disabled={notValidImage || loading}
        >
          {loading ? "Subiendo..." : "Subir imagen"}
        </LoadingButton>
      </Box>
    </div>
  );
}

export default FotodePerfil;
