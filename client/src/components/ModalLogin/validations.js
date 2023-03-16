const validations = (form) => {

    let errors = {};

    if(!form.email) {
        errors.email = 'Se necesita un email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'El email es invalido.';
    }
    if(!form.contraseña.match(/\d/)){
        errors.contraseña = "La contraseña debe contener al menos un número";
    }
    if(form.constraseña.length < 6 || form.contraseña.length > 12){
        errors.contraseña = "La contraseña debe contener entre 6 y 12 caracteres";
    }
    return errors;
}

export default validations;