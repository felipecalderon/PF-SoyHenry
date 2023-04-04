const validationsDatosRecruiter = (info) => {

    let errors = {};

    if(!info.photo) {
        errors.photo = 'El logo tiene que ser una dirección URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(info.photo)) {
        errors.photo = 'La URL es inválida.'
    }
    if(!info.names) {
        errors.names = 'Se necesita un nombre.'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(info.names)) {
        errors.names = 'El nombre es inválido.'
    }
    if(!info.lastnames) {
        errors.lastnames = 'Se necesita un nombre.'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(info.lastnames)) {
        errors.lastnames = 'El nombre es inválido.'
    }
    if(!info.website) {
        errors.website = 'El website tiene que ser una dirección URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(info.website)) {
        errors.website = 'La URL es inválida.'
    } 
    if(!info.email) {
        errors.email = 'Debe haber un email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
            errors.email = 'El email es inválido.'
    }
    if(!info.phone) {
        errors.phone = 'Debe haber un número telefónico.'
    } else if (!/\+?\d{5,15}$/.test(info.phone)) {
            errors.phone = 'El número es inválido.'
    }
    return errors;
}

export default validationsDatosRecruiter;