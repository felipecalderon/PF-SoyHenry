import React from "react";

export const ResumenOfertas = ({offers}) => {

    const totalApplications = offers.reduce((total, offer) => total + offer.applications_count, 0);

    return (
        <div className="bg-secondary-light dark:bg-primary-dark p-2 rounded-2xl border border-slate-900 dark:border-white dark:text-text-dark">
            <h2 className="flex items-center justify-center text-lg font-bold">Resumen de ofertas</h2>
            {offers.length === 1
            ? <h3 className="flex items-center justify-center">{offers.length} Oferta creada</h3>
            : <h3 className="flex items-center justify-center">{offers.length} Ofertas creadas</h3>}
            {totalApplications === 1
            ? <h3 className="flex items-center justify-center">{totalApplications} Postulante</h3>
            : <h3 className="flex items-center justify-center">{totalApplications} Postulantes</h3>}
            <h3 className="flex items-center justify-center">Ofertas vencidas</h3>
            <h3 className="flex items-center justify-center">Ofertas por caducar</h3>
        </div>
    )
}