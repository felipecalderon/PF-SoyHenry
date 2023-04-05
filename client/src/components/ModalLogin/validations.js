const validations = (form) => {

    let errors = {};

    if(!form.email) {
        errors.email = 'Se necesita un email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'El email es invalido.';
    }
    if(!form.password.match(/\d/)){
        errors.password = "La contraseña debe contener al menos un número";
    }
    if(form?.password?.length < 6 || form?.password?.length > 20){
        errors.password = "La contraseña debe contener entre 6 y 20 caracteres";
    }
    return errors;
}

export default validations;