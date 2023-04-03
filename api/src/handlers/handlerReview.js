const { Review, Company } = require("../models/relations.js");
//feedback para la pagina..



//traer todos los reviews activos.
const getReview = async () => {
    try {
        const review = await Review.findAll({
            where: {
                active: true
            },
            include: { model: Company }
        });
        return review;
    } catch (error) {
        throw error
    }
};
const getReviewById = async (id) =>{
    try {
        const reviewById = await Review.findOne({
            where: { idUser: id } 
        })
        if(!reviewById) throw Error('El Usuario no existe en la bd')
        return reviewById
    } catch (error) {
        
    }
}



//comentario para la pagina
const createReview = async ({ usuario, comentario, puntuacion, active, companyid, photo, idUser }) => {
    const user = await Review.findByPk(idUser)
    console.log(user)
    if (user) throw Error('El Usuario ya comento en la oferta')
    try {
        ///revisar esta parte si esta bien y la relacion !!!!!!
        const newReview = await Review.create({
            usuario, comentario, puntuacion, active, photo, idUser,
            // companyId: companyid
        });

        return newReview;

    } catch (err) {
        throw err
    }
}

const putReviews = async ({ id }, { usuario, comentario, puntuacion, active }) => {


    try {
        const review = await Review.findByPk(id);
        if (!review) throw Error(`la review con id: ${id} no existe`);


        await Review.update(
            { usuario, comentario, puntuacion, active },
            {
                where: { id }
            }
        )
        return `review has been updated`;
    } catch (error) {
        throw error
    }

};

const deleteReview = async ({ id }, { active }) => {


    try {

        const review = await Review.findByPk(id);
        if (!review) throw Error(`La review con id: ${id} no existe`);


        await Review.update(
            { active },
            {
                where: { id }
            }
        )

        return active === true ? 'La review ha sido re-activada' : 'la compania ha sido desactivada';
    } catch (error) {
        throw error
    }
};


module.exports = { getReview, createReview, putReviews, deleteReview, getReviewById }