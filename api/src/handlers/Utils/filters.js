const { DateTime } = require('luxon');

const filters = ( offers, dt, exp, mty, sly ) => {
    let offersFiltered = [ ...offers ];
    if( dt ){
        const filter = date( offersFiltered, dt )
        offersFiltered = [...filter]
    } ;
    if( exp ){
        const filter = experience( offersFiltered, exp )
        offersFiltered = [...filter]
    };
    if( mty ){
        const filter = modality( offersFiltered, mty )
        offersFiltered = [...filter]
    };
    if( sly ){
        const filter = salary( offersFiltered, sly )
        offersFiltered = [...filter]
    };
    return offersFiltered;
}

const date = (offers, dt) => {
    // Con Luxon genera la fecha actual
    const currentDate = DateTime.now();
    
    // Le resta la cantidad de días que se mande por query
    const daysAgo = currentDate.minus({ days: Number(dt) });
    
    // Filtra las ofertas que tengan una fecha igual o posterior a la fecha traida por query
    const filteredOffers = offers.filter((offert) => {
        // Con Luxon convierte la fecha de la oferta a un objeto DateTime para poder compararse
        const offerDate = DateTime.fromFormat(offert.date_post, 'dd/MM/yyyy HH:mm:ss');
        
        // Compara la fecha de la oferta con la fecha límite
        return offerDate >= daysAgo;
    });    
    return filteredOffers;
};
const experience = (offers, exp) => {
    // Filtra por el valor de exp y siempre va a mostrar los que tengan null como valor en experience ( valor por defecto de las ofertas de la api )
    const filteredOffers = offers.filter((offert) => offert.experience === exp || offert.experience === null );
    return filteredOffers;
};
const modality = (offers, mty) => {
    // Evalua el caso dependiendo del valor de mty y lo filtra
    switch (mty) { // modalidad
        case "fr": // fully_remote
        return filteredOffersByfr = offers.filter((offert) => offert.modality === 'fully_remote');
        case "rl": // remote_local
        return filteredOffersByfr = offers.filter((offert) => offert.modality === 'remote_local');
        case "h": // hybrid
        return filteredOffersByfr = offers.filter((offert) => offert.modality === 'hybrid');
        case "nr": // no_remote
        return filteredOffersByfr = offers.filter((offert) => offert.modality === 'no_remote');
        default:
        break;
    }
};
const salary = (offers, sly) => {
    switch (sly) { // modalidad
        case '1': // menos de 200
        return filteredOffersByfr = offers.filter((offert) => offert.max_salary < 200);
        case "2": // mas de 200
        return filteredOffersByfr = offers.filter((offert) => offert.max_salary >= 200);
        case "3": // mas de 500
        return filteredOffersByfr = offers.filter((offert) => offert.max_salary >= 1000);
        case "4": // mas de 1000
        return filteredOffersByfr = offers.filter((offert) => offert.max_salary >= 1000);
        default:
        break;
    }
};

module.exports = filters