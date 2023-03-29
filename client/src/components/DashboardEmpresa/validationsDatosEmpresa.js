const validationsDatosEmpresa = (info) => {

    let errors = {};

    if(!info.companyname) {
        errors.companyname = 'Se necesita un nombre.'
    }
    if(!info.logo) {
        errors.logo = 'El logo tiene que ser una direccion URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(info.logo)) {
        errors.logo = 'La URL es inválida.'
    }  
    if(!info.website) {
        errors.website = 'El website tiene que ser una direccion URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(info.website)) {
        errors.website = 'La URL es inválida.'
    }  
    if(!info.location){
        errors.location = 'Se necesita una ubicación.'
    }
    if(!info.description){
        errors.description = 'Se necesita descripcion.'
    } 
    return errors;
}

export default validationsDatosEmpresa;