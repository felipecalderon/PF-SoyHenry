const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,40}$/
const regexUbicacion=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]{1,50}$/
const regexTituloOIdioma =/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.!?()-]{1,100}$/
const regexTel=/^\+?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/
const regexFacebok=/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9\.]{1,}\/?$/
const regexLinkedin=/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-\_]{1,}\/?$/
const validacionConfig=(form,setError)=>{

let obj={}

if (regexNombreApellido.test(form.nombre)){obj.nombre=""}
else{
 obj.nombre="Ingrese Nombre Valido"
}
if (regexNombreApellido.test(form.apellido)){obj.apellido=""}
else{
 obj.apellido="Ingrese Apellido Valido"
}
if(form.edad){
    obj.edad=""
}else{ 
    obj.edad="Debes ingresar una edad"
}if (regexUbicacion.test(form.ubicacion)) {obj.ubicacion=""
} else obj.ubicacion=""
    
if(regexTituloOIdioma.test(form.titulo)){obj.titulo=""
}else obj.titulo ="Ingrese titulo Valido"

if (regexTituloOIdioma.test(form.idioma)) {obj.idioma="Ingrese un Idioma"
    
}else{
    obj.idioma=""
}
if (form.habilidades.length===0) {
    obj.habilidades="Debes Seleccionar al menos una habilidad"
} else {
    obj.habilidades=""
}
if (regexTel.test(form.tel)) {
    obj.tel=""
} else {
    obj.tel="Ingrese un telefono valido"
}
if (form.facebook) {
    if (regexFacebok.test(form.facebook)) {
        obj.facebook=""
    } else {
        obj.facebook="Debe ser una URL a tu perfil de facebook"
    }
} 

if (form.linkedin) {
    if (regexLinkedin.test(form.linkedin)) {
        obj.linkedin=""
    } else {
        obj.linkedin="Debe ser una URL a tu perfil de facebook"
    }
} 
setError({...obj})


}


export default validacionConfig