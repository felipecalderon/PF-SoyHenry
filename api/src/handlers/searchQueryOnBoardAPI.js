const axios = require('axios')

const searchQueryOnBoardAPI = async (language) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/search/jobs?query=${language}`)
        return dataAPI.data
    } catch (error) {
        return error
    }
}

const searchCompaniesAPI = async (id) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/companies/${id}`)
        return dataAPI.data.data.attributes
    } catch (error) {
        return error
    }
}

module.exports = {searchQueryOnBoardAPI, searchCompaniesAPI};