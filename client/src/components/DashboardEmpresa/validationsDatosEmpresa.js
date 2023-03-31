const validationsDatosEmpresa = (info) => {

    let errors = {};

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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email_company)) {
            errors.email_company = 'El email es inválido'
        }
    }
    if(!info.phone_company) {
        if (!/^\+(?:\d{1,3})?(?:\d{9,15})$/.test(info.phone_company)) {
            errors.phone_company = 'El número es inválido'
        }
    }
    return errors;
}

export default validationsDatosEmpresa;