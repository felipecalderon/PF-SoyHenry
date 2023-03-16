const{getCompanyAPI,
    postCompany,
    getCompanywithDb,
    searchCompanyAPI,
    putCompany,
    deleteCompany,
}=require('../handlers/handlerCompany');

const getAllCompanyControllers = async () => {
    try {
        // Db
        const companyDB = await getCompanywithDb();
        
        //API
        const companyApi= await getCompanyAPI();

        //junto la api y la base de datos
        companyDatBandApi = [  ...companyDB, ...companyApi ] 
        
        return companyDatBandApi;
    } catch (error) {
        return error
    }
}

const createNewCompanyControllers = async (body) => {
    try {
        const newCompany = await postCompany(body);
        return newCompany
    } catch (error) {
        throw error
    }
}

const getCompanyByIdControllers = async ({id}) => {
    try {
        const companies = await searchCompanyAPI(id)
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

const putCompanyControllers = async ( { id } ) => {
    const { name,description,location,website,logo } = req.body;
    try {
        const response = await putCompany( id,name,description,location,website,logo);
        return response;
    } catch (error) {
        throw { error: error.message }
    }
};

const deleteCompanyControllers = async ( { id } ) => {
    try {
        const response = await deleteCompany( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};





module.exports={
    getAllCompanyControllers,
    createNewCompanyControllers,
    getCompanyByIdControllers,
    putCompanyControllers,
    deleteCompanyControllers,

    
}