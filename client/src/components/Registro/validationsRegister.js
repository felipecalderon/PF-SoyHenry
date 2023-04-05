const validationsRegister = (validar) => {
    let errors = {};

    if (validar.hasOwnProperty('names')) {
        if (validar.names === '') return { ...errors, names: 'Se requiere al menos un nombre *' };
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.names)) return { ...errors, names: 'El nombre es inválido.' }
        if (validar.names.length) return { ...errors, names: '' };
    }
    if (validar.hasOwnProperty('lastnames')) {
        if (validar.lastnames === '') return { ...errors, lastnames: 'Se requiere al menos un apellido *' };
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.lastnames)) return { ...errors, lastnames: 'El apellido es inválido.' }
        if (validar.lastnames.length) return { ...errors, lastnames: '' };
    }
    if (validar.hasOwnProperty('email')) {
        if (validar.email === '') return { ...errors, email: 'Se requiere un email *' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validar.email)) return { ...errors, email: 'El email es inválido.' }
        if (validar.email.length) return { ...errors, email: '' };
    }
    if (validar.hasOwnProperty('phone')) {
        if (validar.phone === '') return { ...errors, phone: 'Se requiere un número de celular *' };
        if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.phone)) return { ...errors, phone: 'El número de celular es inválido.' }
        if (validar.phone.length) return { ...errors, phone: '' };
    }
    if (validar.hasOwnProperty('password')) {
        if (validar.password === '') return { ...errors, password: 'Se requiere una contraseña *' };
        if (!validar.password.match(/\d/)) return { ...errors, password: 'La contraseña debe contener al menos un número' }
        if (validar?.password?.length < 6 || validar?.password?.length > 20) return { ...errors, password: "La contraseña debe contener entre 6 y 20 caracteres" }
        if (validar.password.length) return { ...errors, password: '' };
    }

    return { ...errors }
}

export default validationsRegister;