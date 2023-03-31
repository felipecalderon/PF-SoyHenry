const multer = require("multer");

//
const storage = multer.diskStorage({
  destination:__dirname+ "/uploads",

  filename:(req,file,cb)=>{
    let extension=file.originalname.slice(file.originalname.lastIndexOf("."))
    console.log(file.originalname)
    try {
      cb(null,Date.now() +"-"+file.originalname )
      
    } catch (error) {
      throw Error("problemas en multer")
    }
  }

});
//validacion 
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported file type' }, false);
  }
};

//acepta hasta 5mb 
const upload =multer({
    storage:storage,
    limits:{fileSize:1024*1024*5},
    fileFilter:fileFilter
})


module.exports=upload
