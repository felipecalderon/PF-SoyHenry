const paginate = ( datos, page, limit ) => {
    const data_total = datos.length;
    // realiza el paginado
    const startIndex = (page - 1) * limit;
    const endIndex = Number(startIndex) + Number(limit);
    const data = datos.slice(startIndex, endIndex);
    const per_page = limit;
    
    // Bucle para calcular y guardar el total de paginas 
    let total_page = 0
    for( let i = 1; i <= Math.ceil( data_total / limit ); i++) {
        total_page++
    }
    
    return {  page, total_page, per_page, data_total, data  };
}

module.exports = paginate
