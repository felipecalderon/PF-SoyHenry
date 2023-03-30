
// const fs=require("fs")
// fs.unlinkSync("../handlers/Utils/uploads");
const {
    SendPhotoToUser,
    SendPdfToPostulante
}=require("../controllers/imagesController")
const cloudinary=require("../handlers/Utils/cloudinaryConfig")

const postImagepostulante = async(req,res)=>{
    const {idUser}=req.params
    if(!req.file)return res.status(400).json({message:"Debe ingresar archivo"})
    if(!idUser)return res.status(400).json({message:"debe ingresar por params el id del usuario"})

    try {
        //Cloudinary envia la imagen que esta en req.file.path
     const cloudinary_image=await cloudinary.uploader.upload(req.file.path,{
        folder:"PF_HENRY"
     })
     //funcion que guarda la url de la imagen que contiene cloudinary_image en el user elegido
        const results=await SendPhotoToUser(idUser,cloudinary_image)
        
        res.status(200).json(results)
    } catch (error) {
        
        res.status(400).json({error:error.message})
    }
   
}



const postCvpostulante =async(req,res)=>{
    const {idPostulante}=req.params
    if(!req.file)return res.status(400).json({message:"Debe ingresar archivo"})
    if(!idPostulante)return res.status(400).json({message:"debe ingresar por params el id del postulante"})
    try {
        //Cloudinary envia la imagen que esta en req.file.path
     const cloudinary_pdf=await cloudinary.uploader.upload(req.file.path,{
        folder:"PF_HENRY"
     })
     //funcion que guarda la url de la imagen que contiene cloudinary_image en el user elegido
        const results=await SendPdfToPostulante(idPostulante,cloudinary_pdf)
        
        res.status(200).json(results)
    } catch (error) {
        
        res.status(400).json({error:error.message})
    }


}




module.exports={
    postImagepostulante,
    postCvpostulante
}