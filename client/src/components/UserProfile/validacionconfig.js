const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,40}$/
const regexUbicacion=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,]{1,50}$/
const regexTituloOIdioma =/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s,.!?()-]{10,100}$/
const regexTel=/^\+?\d{1,3}[-.\s]?\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/
const regexFacebok=/^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9\.]{1,}\/?$/
const regexLinkedin=/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-\_]{1,}\/?$/
const regexdescipcion=/^.{10,250}$/
const validacionConfig=(form,setError)=>{

let obj={}

if (regexNombreApellido.test(form.names)){obj.names=""}
else{
 obj.names="Ingrese Nombre Valido"
}

if (regexNombreApellido.test(form.lastnames)){obj.lastnames=""}
else{
 obj.lastnames="Ingrese Apellido valido"
}

if(form.age){
    obj.age=""
}else{ 
    obj.age="Debes ingresar una edad"
}
if (form.disability) {
    obj.disability=""
} else {
    obj.disability="¿Posee alguna discapacidad?.Sí/No."
}

if(regexTituloOIdioma.test(form.title)){obj.title=""
}else obj.title ="Ingrese titulo Valido"

if (regexUbicacion.test(form.city)) {
    obj.city=""
} else {
    obj.city="ingrese ciudad valida"
}
if (regexUbicacion.test(form.country)) {
    obj.country=""
} else {
    obj.country="ingrese pais valido"
}


if (form.gender) {
    obj.gender=""
} else {
    obj.gender="ingrese genero"
}
if (regexTituloOIdioma.test(form.languages)) {obj.languages=""
    
}else{
    obj.languages="ingrese una descripcion de los idiomas que domina o tiene conocimientos"
}
if (regexdescipcion.test(form.description_postulant)) {
    obj.description_postulant=""
} else {
    obj.description_postulant="ingrese una descripcion maxima de 250 caracteres"
}

if (form.experience) {
    obj.experience=""
} else {
    obj.experience="Por favor, seleccione si tiene o no experiencia previa en el sector IT "
}

if (form.habilidades.length===0) {
    obj.habilidades="Debes Seleccionar al menos una habilidad"
} else {
    obj.habilidades=""
}
if (regexTel.test(form.phone)) {
    obj.tel=""
} else {
    obj.phone="Ingrese un telefono valido"
}
if (form.facebook) {
    if (regexFacebok.test(form.facebook)) {
        obj.facebook=""
    } else {
        obj.facebook="Debe ser una URL valida a tu perfil de facebook"
    }
}

if (form.linkedin) {
    if (regexLinkedin.test(form.linkedin)) {
        obj.linkedin=""
    } else {
        obj.linkedin="Debe ser una URL valida a tu perfil de linkedin"
    }
} 
setError({...obj})


}


export default validacionConfig