const{createNewReviewControllers,getReviewControllers,putReviewsControllers,deleteReviewControllers, getReviewByIdControllers}=require('../controllers/reviewControllers')




const allReview = async (req, res) => {
    try {
        const reviews = await getReviewControllers()
        return res.status(200).json(reviews)
        
    } catch (error) {
        res.status(404).json( error )
    }
}
const allReviewById = async (req, res) => {
    try {
        const reviews = await getReviewByIdControllers(req.params)
        return res.status(200).json(reviews)
        
    } catch (error) {
        res.status(404).json( error )
    }
}
//el post
const newReview = async (req, res) => {
    try {
        const reviews = await createNewReviewControllers(req.body)
        return res.status(200).json( reviews )
        
    } catch (error) {
        res.status(404).json( error )
        console.log(error)
    }
}

const putReviews = async (req, res) => {
    try {
        const data = await  putReviewsControllers (req.params, req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}


const deleteReviews = async (req, res) => {
    try {
        const data = await deleteReviewControllers(req.params,req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}
module.exports={allReview,newReview,putReviews,deleteReviews,allReviewById};