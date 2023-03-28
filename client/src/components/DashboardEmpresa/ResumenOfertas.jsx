import React from "react";

export const ResumenOfertas = ({offers}) => {

    const totalApplications = offers.reduce((total, offer) => total + offer.applications_count, 0);

    return (
        <div className="relative w-[26rem] h-[10rem] bg-secondary-light dark:bg-primary-dark p-5 pt-1 rounded-2xl border border-slate-900 dark:border-white dark:text-text-dark">
            <h2 className="flex items-center justify-center text-lg font-bold mb-[1rem]">Resumen de ofertas</h2>
            {offers.length === 1
            ? <h3 className="flex items-center justify-center font-semibold">{offers.length} Oferta creada</h3>
            : <h3 className="flex items-center justify-center font-semibold">{offers.length} Ofertas creadas</h3>}
            {totalApplications === 1
            ? <h3 className="flex items-center justify-center font-semibold">{totalApplications} Postulante</h3>
            : <h3 className="flex items-center justify-center font-semibold">{totalApplications} Postulantes</h3>}
            <h3 className="flex items-center justify-center font-semibold">Ofertas vencidas</h3>
            <h3 className="flex items-center justify-center font-semibold">Ofertas por caducar</h3>
        </div>
    )
}