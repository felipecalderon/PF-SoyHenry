const { where } = require("sequelize")
const applicationsOffersApi=require("../models/applicationsOffersApi")


const SaveApplyApiOfferController = async(userId,offerId,title)=>{

const result = await applicationsOffersApi.create({
    userId,
    offerId,
    title
})
return result


}


const GetApplyApiOfferController =async(userId)=>{
    const results =await applicationsOffersApi.findAll({
        where:{
            userId:userId
        }}
    )
    
if(!results.length) throw Error("no se encontro nada en la base de datos de postulaciones a la que se aplicaron de la api")

    return results
}








module.exports={
    SaveApplyApiOfferController,
    GetApplyApiOfferController
}