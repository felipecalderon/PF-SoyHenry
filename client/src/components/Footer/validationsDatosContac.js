const validationsDatosContac = (validar) => {
    let errors = {};

    if (validar.hasOwnProperty('usuario')) {
        if (validar.usuario === '') return { ...errors, usuario: 'Se requiere al menos un nombre *' };
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(validar.usuario)) return { ...errors, usuario: 'El nombre es inválido.' }
        if (validar.usuario.length) return { ...errors, usuario: '' };
    }
    if (validar.hasOwnProperty('correo')) {
        if (validar.correo === '') return { ...errors, correo: 'Se requiere un correo *' };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validar.correo)) return { ...errors, correo: 'Se requiere un correo válido. Ej: correo@gmail.com' }
        if (validar.correo.length) return { ...errors, correo: '' };
    }
    if (validar.hasOwnProperty('asunto')) {
        if (validar.asunto === '') return { ...errors, asunto: 'Se requiere al menos un apellido *' };
        if (validar.asunto.length) return { ...errors, asunto: '' };
    }
    if (validar.hasOwnProperty('mensaje')) {
        if (validar.mensaje === '') return { ...errors, mensaje: 'Se requiere al menos un apellido *' };
        if (validar.mensaje.length) return { ...errors, mensaje: '' };
    }

    return { ...errors }
}

export default validationsDatosContac;