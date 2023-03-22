const{getCompanyAPI,
    postCompany,
    getCompanywithDb,
    searchCompanyAPI,
    putCompany,
    deleteCompany,
    getCompanywithDbId
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
// trae id de la api
const getCompanyByIdControllers = async ({id}) => {
    try {
        
        const companies =  await searchCompanyAPI  (id);
       
        
        return {
            name: companies.name,
            description: companies.description,
            benefits: companies.benefits,
            web: companies.web,
            logo: companies.logo,
        }
  

    } catch (error) {
        return error
    }
}
//solucion momentanea o nose traigo de la db las id
const getCompanyByIdDatBasControllers = async ({id}) => {
    try {
        
        const companies =  await getCompanywithDbId  (id); 
        return {
            name: companies.name,
            description: companies.description,
            benefits: companies.benefits,
            web: companies.web,
            logo: companies.logo,
        }

    } catch (error) {
        return error
    }
}

const putCompanyControllers = async ( id , body ) => {
    
    try {
        const response = await putCompany( id , body);
        return response;
    } catch (error) {
        return error
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
    getCompanyByIdDatBasControllers,

    
}