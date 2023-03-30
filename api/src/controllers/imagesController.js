
const {  User, Postulant } = require("../models/relations");
/**
 * { 
  public_id: 'cr4mxeqx5zb8rlakpfkg',
  version: 1571218330,
  signature: '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
  width: 864,
  height: 576,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2017-06-26T19:46:03Z',
  bytes: 120253,
  type: 'upload',
  url: 'http://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg',
  secure_url: 'https://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg' 
}
 */
const SendPhotoToUser=async(idUser,cloudinary_image)=>{
const { secure_url}=cloudinary_image
let results =await User.findByPk(idUser)
if (!results) {
    throw Error("No se reconoce el id ingresado")
}


await User.update({ photo: secure_url }, { where: { id: idUser } });
 results =await User.findByPk(idUser)
  
    return results

}



const SendPdfToPostulante=async(idPostulante,cloudinary_pdf)=>{
    const { secure_url}=cloudinary_pdf
    let results =await Postulant.findByPk(idPostulante)
    if (!results) {
        throw Error("No se reconoce el id ingresado del postulante")
    }
    await Postulant.update({ curriculum_pdf: secure_url }, { where: { id: idPostulante } });

    results=await Postulant.findByPk(idPostulante)

    return results
}


module.exports={
    SendPhotoToUser
,SendPdfToPostulante
}