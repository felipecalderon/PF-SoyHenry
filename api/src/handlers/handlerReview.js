const { User, Admin, Postulant, Company,Review } = require("../models/relations.js");


//traer todos los reviews activos.
const getReview = async () => {
    const review = await Review.findAll({
        where: {
            active: true
        },
    });
    return review;
};


//fijarse si esta biem hecho el post que tengo dudas..
const createReview= async ({username, email, rol,password,usuario,comentario,puntuacion,active }) => {
    try {

    

    const newReview = await Review.create({
            usuario,comentario,puntuacion,active,
           
        });

        return newReview;

    } catch(err) {
      throw err
    }
}

const putReviews = async ( {id}, {usuario,comentario,puntuacion,active}) => {
    

    try {
        const review = await Review.findByPk( id );
    if( !review ) throw Error( `la review con id: ${id} no existe` );
    
    
    await Review.update(
        {  usuario,comentario,puntuacion,active },
        {
            where: { id }
        }
    )
    return `review has been updated`;
    } catch (error) {
        throw error
    }
    
};

const deleteReview = async ( { id }, { active }) => {
    

    try {
       
        const review = await Review.findByPk( id );
        if( !review ) throw Error( `La review con id: ${id} no existe` );
        
        
        await Review.update(
            { active },
            {
                where: { id }
            }
        )
        
        return active === true ?  'La review ha sido re-activada': 'la compania ha sido desactivada' ;
    } catch (error) {
        throw error
    }
};


module.exports={getReview,createReview,putReviews,deleteReview}