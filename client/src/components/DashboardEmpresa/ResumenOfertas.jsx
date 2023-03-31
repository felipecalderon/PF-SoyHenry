import React from "react";

export const ResumenOfertas = ({offers}) => {

    const totalApplications = offers.reduce((total, offer) => total + offer.applications_count, 0);

    // Filtrar ofertas que han caducado (más de 20 días desde su creación)
    const ofertasCaducadas = offers.filter((offer) => {
    const fechaCreacion = new Date(offer.createdAt);
    const hoy = new Date();
    const diasDiferencia = Math.floor(
      (hoy.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasDiferencia > 20;
  });

    // Filtrar ofertas que están por caducar (menos de 5 días desde su caducidad)
    const ofertasPorCaducar = offers.filter((offer) => {
    const fechaCaducidad = new Date(offer.createdAt);
    fechaCaducidad.setDate(fechaCaducidad.getDate() + 20);
    // fechaCaducidad.setDate(fechaCaducidad.getDate() + 5); // Habilitar esta linea y deshabilitar la de arriba para hacer la prueba
    const hoy = new Date();
    const diasDiferencia = Math.floor(
      (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diasDiferencia <= 5;
  });


    return (
        <div className="relative w-[26rem] h-[15rem] bg-secondary-light dark:bg-primary-dark p-5 pt-1 rounded-2xl border border-slate-900 dark:border-white dark:text-text-dark">
            <h2 className="flex p-2 items-center justify-center text-lg font-bold">Resumen de ofertas</h2>
            {offers.length === 1
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{offers.length} Oferta creada</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{offers.length} Ofertas creadas</h3>}
            {totalApplications === 1
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{totalApplications} Postulante</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{totalApplications} Postulantes</h3>}
            {ofertasCaducadas === 1 
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasCaducadas.length} Oferta caducada</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasCaducadas.length} Ofertas caducadas</h3>}
            {ofertasPorCaducar === 1
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasPorCaducar.length} Oferta por caducar</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasPorCaducar.length} Ofertas por caducar</h3>}
        </div>
    )
}