const {searchQueryOnBoardAPI , searchCompaniesAPI} = require('../handlers/searchQueryOnBoardAPI')

const getSearchByLanguage = async ({language}) => {
    try {
        if(!language) throw 'debe agregar un language en query'

        const jobs = await searchQueryOnBoardAPI(language)

        return jobs.data.map((job) => {
            return {
                title: job.attributes.title,
                description: job.attributes.description,
                remoto: job.attributes.remote,
                postulantes: job.attributes.applications_count,
                link: job.links.public_url,
                idEmpresa: job.attributes.company.data.id
            } } )

    } catch (error) {
        return error
    }
}

const getCompanyById = async ({id}) => {
    try {
        const companies = await searchCompaniesAPI(id)
        let social = {
            facebook: companies.facebook !== '' ? companies.facebook : null,
            twitter: companies.twitter !== '' ? companies.twitter : null,
            github: companies.github !== '' ? companies.github : null,
        }

        return {
            name: companies.name,
            description: companies.description,
            benefits: companies.benefits,
            web: companies.web,
            logo: companies.logo,
            social
        }
    } catch (error) {
        return error
    }
}

module.exports = { getSearchByLanguage, getCompanyById};

