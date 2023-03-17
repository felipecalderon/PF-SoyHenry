const validationsRegister = (form) => {

    let errors = {};

    if(!form.nombre) {
        errors.nombre = 'Se necesita un nombre'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.nombre)) {
        errors.nombre = 'El nombre es inválido.'
    }
    if(!form.apellido) {
        errors.apellido = 'Se necesita un apellido'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.apellido)) {
        errors.apellido = 'El apellido es inválido.'
    }
    if(!form.documento) {
        errors.documento = 'Se necesita un documento'
    } else if (!/^[1-9]\d*$/.test(form.documento)) {
        errors.documento = 'El documento es inválido'
    }  
    if(!form.email) {
        errors.email = 'Se necesita un email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'El email es inválido.';
    }
    if(!form.nombreEmpresa){
        errors.nombreEmpresa = 'Se necesita nombre de la empresa'
    }
    if(!form.cuit){
        errors.cuit = 'Se necesita número de CUIT'
    } else if (!/^[1-9]\d*$/.test(form.cuit)) {
        errors.cuit = 'El CUIT es inválido'
    } 
    if(!form.contraseña.match(/\d/)){
        errors.contraseña = "La contraseña debe contener al menos un número";
    }
    if(form?.constraseña?.length < 6 || form?.contraseña?.length > 12){
        errors.contraseña = "La contraseña debe contener entre 6 y 12 caracteres";
    }
    return errors;
}

export default validationsRegister;