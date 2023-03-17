const validationsRegister = (form) => {

    let errors = {};

    if(!form.nombre) {
        errors.nombre = 'Se necesita un nombre'
    }
    if(!form.apellido) {
        errors.apellido = 'Se necesita un apellido'
    }
    if(!form.documento) {
        errors.documento = 'Se necesita un documento'
    } else if (!/^[1-9]\d*$/.test(form.documento)) {
        errors.documento = 'El documento es invalido'
    }  
    if(!form.email) {
        errors.email = 'Se necesita un email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'El email es invalido.';
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