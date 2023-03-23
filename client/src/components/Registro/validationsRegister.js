const validationsRegister = (form) => {

    let errors = {};

    if(!form.username) {
        errors.username = 'Se necesita un nombre'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.username)) {
        errors.username = 'El nombre es inválido.'
    }
    if(!form.lastnames) {
        errors.lastnames = 'Se necesita un apellido'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.lastnames)) {
        errors.lastnames = 'El apellido es inválido.'
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
    if(!form.password.match(/\d/)){
        errors.password = "La contraseña debe contener al menos un número";
    }
    if(form?.password?.length < 6 || form?.password?.length > 12){
        errors.password = "La contraseña debe contener entre 6 y 12 caracteres";
    }
    return errors;
}

export default validationsRegister;