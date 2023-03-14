const cleaningGetonbrd = ( jobsGetonbrd ) => {
    return jobsGetonbrd.data.map((job) => {
        return {
            idEmpresa: job.attributes.company.data.id,
            title: job.attributes.title,
            description: job.attributes.description,
            modality: job.attributes.remote_modality,
            benefits: job.attributes.benefits,
            perks: job.attributes.perks,
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