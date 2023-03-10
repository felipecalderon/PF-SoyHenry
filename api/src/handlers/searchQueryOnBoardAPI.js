const axios = require('axios')

const searchQueryOnBoardAPI = async (search) => {
    try {
        let dataAPI = await axios(`https://www.getonbrd.com/api/v0/search/jobs?query=${search}`)
        
        return dataAPI.data
    } catch (error) {
        return error
    }
}

module.exports = searchQueryOnBoardAPI;