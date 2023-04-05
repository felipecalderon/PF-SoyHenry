import React from "react";
import { useSelector } from "react-redux";

export const ResumenOfertas = () => {

    const  {offers} = useSelector((state) => state.recruiterSlice) 
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

    let ofertasCerradas = 0 
    offers?.map((offer) => {      
      if (offer.active === false) ofertasCerradas += 1 
    } )




    return (
        <div className="w-full bg-primary-light dark:bg-secondary-dark p-5 pt-1 rounded-2xl border border-slate-900 dark:border-white dark:text-text-dark">
            <h2 className="flex p-1 items-center justify-center text-2xl font-semibold">Resumen de ofertas</h2>
            {offers.length === 1
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{offers.length} Oferta creada</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{offers.length} Ofertas creadas</h3>}
            {totalApplications === 1
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{totalApplications} Postulante</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{totalApplications} Postulantes</h3>}
            {ofertasCerradas === 1 
            ? <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasCerradas} Oferta cerrada</h3>
            : <h3 className="flex p-2 items-center justify-center font-semibold">{ofertasCerradas} Ofertas cerradas</h3>}
        </div>
    )
}