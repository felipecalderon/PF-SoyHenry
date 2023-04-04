const validationsDatosEmpresa = (info) => {

    let errors = {};

    if(!info.companyname) {
        errors.companyname = 'Debe haber un Nombre'
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
    if(!info.email_company) {
        errors.email_company = 'Debe haber un Email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email_company)) {
            errors.email_company = 'El email es inválido'
    }
    if(!info.phone_company) {
        errors.phone_company = 'Debe haber un número telefónico'
    } else if (!/\+?\d{5,15}$/.test(info.phone_company)) {
            errors.phone_company = 'El número es inválido'
    }
    return errors;
}

export default validationsDatosEmpresa;