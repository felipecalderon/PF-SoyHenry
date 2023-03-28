const validationsDatosEmpresa = (form) => {

    let errors = {};

    if(!form.username) {
        errors.username = 'Se necesita un nombre.'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.username)) {
        errors.username = 'El nombre es inválido.'
    }
    if(!form.lastnames) {
        errors.lastnames = 'Se necesita un apellido.'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.lastnames)) {
        errors.lastnames = 'El apellido es inválido.'
    }
    if(!form.logo) {
        errors.logo = 'El logo tiene que ser una direccion URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(form.logo)) {
        errors.logo = 'La URL es inválida.'
    }  
    if(!form.website) {
        errors.website = 'El website tiene que ser una direccion URL.'
    } else if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(form.website)) {
        errors.website = 'La URL es inválida.'
    }  
    if(!form.email) {
        errors.email = 'Se necesita un email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'El email es inválido.';
    }
    if(!form.companyname){
        errors.companyname = 'Se necesita nombre de la empresa.'
    }
    if(!form.location){
        errors.location = 'Se necesita una ubicación.'
    }
    if(!form.description){
        errors.description = 'Se necesita descripcion.'
    } 
    return errors;
}

export default validationsDatosEmpresa;