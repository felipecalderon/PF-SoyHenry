const searchQueryOnBoardAPI = require('../handlers/searchQueryOnBoardAPI')

const getSearchByLanguage = async (search) => {
    try {
        const jobs = await searchQueryOnBoardAPI(search)
        
        return jobs.data.map(job => {
            return {
                title: job.attributes.title,
                description: job.attributes.description
            } } )

    } catch (error) {
        return error
    }
}

module.exports = getSearchByLanguage;

