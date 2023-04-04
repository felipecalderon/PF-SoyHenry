const { Op } = require('sequelize');
const { mercadopago } = require('../configs/mercadopago/mpconfig');
const { User, Postulant, Payment } = require("../models/relations.js");
const { DateTime } = require('luxon');
const sequelize = require('../database');

const controlarListaPagos = async ({ email }) => {
  try {
    if (!email) {
      const postulants = await User.findAll({ include: 'payments' });
      return postulants
    }
    const postulant = await User.findOne({ where: { email }, include: 'payments' });
    return postulant.payments
  } catch (error) {
    console.log(error);
    throw { message: 'Error fetching payments for postulant' }
  }
}

const controlarPagoStripe = async ({ estado, email }) => {
  try {
    if (estado !== 'pagado') throw 'Pago fallido por alguna razón misteriosa 👀'
    const usuario = await User.findOne({
      where: { email }
    })
    console.log(usuario)
    await User.update({premium: true},{where: { id: usuario.dataValues.id }})
    await usuario.createPayment({
      inicio_plan: new Date(),
      fin_plan: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después de hoy
      plan: 'Premium',
    })
    return 'Pago exitoso'
  } catch (error) {
    throw error
  }
}

const crearPlan = async ({ email }) => {
  try {
    const plan = await mercadopago.preapproval.create({
      reason: "Plan Premium",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 1000,
        currency_id: "CLP",
      },
      payer_email: email,
      back_url: "https://fusionajobs-back-production.up.railway.app/mercadopago",
    });
    return plan;
  } catch (error) {
    throw error
  }
}

const crearSuscripcion = async ({ idPlan, email }) => {
  try {
    console.log({ idPlan });
    const suscripcion = await mercadopago.preapproval.create({
      reason: "Plan Premium",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10000,
        currency_id: "CLP"
      },
      back_url: "https://fusionajobs-back-production.up.railway.app/mercadopago",
      payer_email: email,
      preapproval_plan_id: idPlan
    });
    return suscripcion;
  } catch (error) {
    throw error
  }
}

const statisticspaymentsController = async () => {
  try {
    const now = DateTime.now(); // Obtiene la fecha y hora actuales
    const lastFourMonths = now.minus({ months: 4 }); // Resta cuatro meses a la fecha actual
    
    // Crea un array con los nombres de los meses de los últimos cuatro meses. Los nombres quedaran con el idioma establecido en el dispositivo
    const months = [];
    for (let i = 3; i >= 0; i--) {
      const fecha = DateTime.local().minus({ months: i });
      const nombreMes = fecha.toLocaleString({ month: 'long', locale: 'es' });
      months.push(nombreMes);
    }

    // Busca en la base de datos los pagos de tipo premium donde inicio_plan sea mayor o igual a hace cuatro meses por medio del operador gte → >=
    const data = await Payment.findAll({
      where: {
        plan: 'Premium',
        inicio_plan: {
          [Op.gte]: lastFourMonths.toISODate(), // Convierte la fecha a formato ISO (YYYY-MM-DD) para poder hacer la agrupacion
        },
      },
    });

    // Crea un objeto para contar las ventas de cada mes
    const groupedPayments = {};
    for (let i = 0; i < data.length; i++) {
      const month = DateTime.fromISO(data[i].inicio_plan).toFormat('MMMM'); // Obtiene el nombre del mes del pago actual
      groupedPayments[month] = groupedPayments[month] ? groupedPayments[month] + 1 : 1; // Incrementa el contador de ventas del mes actual
    }

    // Crea un array con el número de ventas de cada uno de los últimos cuatro meses de derecha a izq, el ultimo seria el mes actual
    const ventas = months.map((month) => groupedPayments[month] || 0);

    return { meses: months, ventas: ventas };
  } catch (error) {
    throw error
  }
}

module.exports = {
  crearPlan,
  crearSuscripcion,
  controlarPagoStripe,
  controlarListaPagos,
  statisticspaymentsController
}