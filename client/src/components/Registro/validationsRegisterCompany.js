const validationsRegisterCompany = (validar) => {

    let errors = {};

    if (validar.hasOwnProperty('names')) {
        if (validar.names === '') return { ...errors, names: 'Se requiere al menos un nombre' };
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.names)) return { ...errors, names: 'El nombre es inválido.' }
        if (validar.names.length) return { ...errors, names: '' };
    }
    if (validar.hasOwnProperty('lastnames')) {
        if (validar.lastnames === '') return { ...errors, lastnames: 'Se requiere al menos un apellido *' };
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.lastnames)) return { ...errors, lastnames: 'El apellido es inválido.' }
        if (validar.lastnames.length) return { ...errors, lastnames: '' };
    }
    if (validar.hasOwnProperty('companyname')) {
        if (validar.companyname === '') return { ...errors, companyname: 'Se requiere el nombre de la empresa *' };
        if (validar.companyname.length) return { ...errors, companyname: '' };
    }
    if (validar.hasOwnProperty('email_company')) {
        if (validar.email_company === '') return { ...errors, email_company: 'Se requiere un correo de la empresa *' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validar.email_company)) return { ...errors, email_company: 'El email es inválido.' }
        if (validar.email_company.length) return { ...errors, email_company: '' };
    }
    if (validar.hasOwnProperty('phone_company')) {
        if (validar.phone_company === '') return { ...errors, phone_company: 'Se requiere un número de celular para contactar con la empresa *' };
        if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(validar.phone_company)) return { ...errors, phone_company: 'El número de celular es inválido.' }
        if (validar.phone_company.length) return { ...errors, phone_company: '' };
    }
    if (validar.hasOwnProperty('email')) {
        if (validar.email === '') return { ...errors, email: 'Se requiere un email *' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validar.email)) return { ...errors, email: 'El email es inválido.' }
        if (validar.email.length) return { ...errors, email: '' };
    }
    if (validar.hasOwnProperty('website')) {
        if (validar.website === '') return { ...errors, website: 'El website tiene que ser una direccion URL.' };
        if (!/\b((?:https?|ftp):\/\/(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w~#-]*)*(?:\?\S+)?)\b/.test(validar.website)) return { ...errors, website: 'La URL es inválida..' }
        if (validar.website.length) return { ...errors, website: '' };
    }
    if (validar.hasOwnProperty('password')) {
        if (validar.password === '') return { ...errors, password: 'Se requiere una contraseña' };
        if (!validar.password.match(/\d/)) return { ...errors, password: 'La contraseña debe contener al menos un número' }
        if (validar?.password?.length < 6 || validar?.password?.length > 20) return { ...errors, password: "La contraseña debe contener entre 6 y 20 caracteres" }
        if (validar.password.length) return { ...errors, password: '' };
    }
    if (validar.hasOwnProperty('city')) {
        if (validar.city === '') return { ...errors, city: 'Escoge la ciudad de residencia' }
        if (validar.city.length) return { ...errors, city: '' };
    }
    if (validar.hasOwnProperty('country')) {
        if (validar.country === '') return { ...errors, country: 'Escoge la pais de residencia' }
        if (validar.country.length) return { ...errors, country: '' };
    }
    if (validar.hasOwnProperty('description')) {
        if (validar.description === '') return { ...errors, description: 'Se necesita una descipcion de la empresa' }
        if (validar.description.length) return { ...errors, description: '' };
    }

    return { ...errors }
}

export default validationsRegisterCompany;
