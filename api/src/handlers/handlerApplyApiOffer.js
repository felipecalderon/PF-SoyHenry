const {
    SaveApplyApiOfferController
,GetApplyApiOfferController}=require("../controllers/ApplyApiOfferController")

const handlerSaveApplyApiOffer =async (req,res)=>{
const {userId,offerId,title}=req.query

if (!userId || !offerId || !title) {
return res.status(400).send("Faltan datos") 
}
try {
    
const results=await  SaveApplyApiOfferController(userId,offerId,title)

    res.status(200).json(results)

} catch (error) {
    res.status(400).json({message:error.message})
}


}
const handlerGetApplyApiOffer =async (req,res)=>{
    const {userId}=req.params
    if(!userId) res.status(400).json({message:"debe ingresar el userId"})
    try {
    
        const results=await  GetApplyApiOfferController(userId)
        
            res.status(200).json(results)
        
        } catch (error) {
            res.status(400).json({message:error.message})
        }
        
}




module.exports = {
    handlerSaveApplyApiOffer,
    handlerGetApplyApiOffer
}