const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");
dotenv.config();

// Configuration 
//pasarlo a procees env
cloudinary.config({
    cloud_name: "dlxlac365",
    api_key: "882976543797725",
    api_secret: "M_dOsQu90E7tqvtDGAPlB1jLpB0"
  });

module.exports = { cloudinary };

