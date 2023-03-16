const cleaningGetonbrdCompany = ( companyGetonbrd ) => {
    return companyGetonbrd.data.map((comp) => {
        return {
            
            name:comp.attributes.name,
            description: comp.attributes.description,
            location: comp.attributes.country,
            website:comp.attributes.web,
            logo: comp.attributes.logo,
            
        } 
    })
}

module.exports = {
    cleaningGetonbrdCompany,
}