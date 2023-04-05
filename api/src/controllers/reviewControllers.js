const{getReview,createReview,putReviews,deleteReview, getReviewById}=require('../handlers/handlerReview')


const getReviewControllers = async () => {
    try {
        const response =  await getReview();
        return response
    } catch (error) {
        console.log(error)
        throw { error: error.message }
    }
};
const getReviewByIdControllers = async ({id}) => {
    try {
        const response = await getReviewById(id) 
        return response
    } catch (error) {
        console.log(error)
        throw { error: error.message }
    }
};
const createNewReviewControllers = async (body) => {
    try {
        const newRev = await createReview(body);
        return newRev
    } catch (error) {
        throw error
    }
}

const putReviewsControllers = async ( {id} , {active} ) => {
    try {
        const response = await putReviews( id , active);
        return response;
    } catch (error) {
        return error
    }
};

const deleteReviewControllers = async ( { id } ) => {
    try {
        const response = await deleteReview( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};



module.exports={createNewReviewControllers,getReviewControllers,putReviewsControllers,deleteReviewControllers, getReviewByIdControllers}