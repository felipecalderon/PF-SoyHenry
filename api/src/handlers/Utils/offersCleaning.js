const { DateTime } = require('luxon');
const cleaningGetonbrd = ( jobsGetonbrd, current = 0 ) => {
    return jobsGetonbrd.data.map((job) => {
        current++
        // opciones para dejar la fecha en el formato → dia-mes-año hora
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            second: 'numeric', 
        };
        return {
            id: current, // Genera un nuevo id
            idEmpresa: job.attributes.company.data.id,
            title: job.attributes.title,
            date_post: DateTime.fromMillis(job.attributes.published_at * 1000).toFormat('dd/MM/yyyy HH:mm:ss'), // la api manda la fecha en formato unix y con este metodo se pasa a formato UTC.
            requeriments:  job.attributes.description,
            functions:  job.attributes.functions,
            benefits: job.attributes.benefits,
            modality: job.attributes.remote_modality,
            perks: job.attributes.perks,
            experience: null, 
            min_salary: job.attributes.min_salary,
            max_salary: job.attributes.max_salary,
            applications_count: job.attributes.applications_count,
            link: job.links.public_url,
            bd_create: false
        } 
    })
}

module.exports = {
    cleaningGetonbrd,
}