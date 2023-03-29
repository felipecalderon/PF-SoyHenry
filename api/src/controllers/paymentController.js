const {mercadopago} = require('../mercadopago/mpconfig')

const crearPlan = async ({id}) => {
    try {
        const fecha = new Date();
        const tzOffset = fecha.getTimezoneOffset() * 60000;
        const fechaLocal = new Date(fecha.getTime() - tzOffset);
        const fechaInicial = fechaLocal.toISOString();

        const fechaFinal = new Date(fechaLocal.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

        console.log({fechaInicial, fechaFinal});
        const plan = await mercadopago.preapproval.create({
        reason: "Yoga classes",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 10000,
          currency_id: "CLP",
          billing_day: 28
        },
        payer_email: 'felipe.calderon321@gmail.com',
        back_url: "https://fusionajobs-back-production.up.railway.app/mercadopago",
      });
  
      console.log(plan);
  
      return plan;
    } catch (error) {
      console.log(error);
    }
  }
  
 const crearSuscripcion = async ({planId, emailCliente}) => {
    try {
      const suscripcion = await mercadopago.preapproval.create({
        payer_email: emailCliente,
        back_url: "https://fusionajobs-back-production.up.railway.app/mercadopago",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 100,
          currency_id: "CLP",
          start_date: new Date().toISOString().slice(0, 10)
        },
        preapproval_plan_id: planId
      });
  
      console.log(suscripcion);
  
      return suscripcion;
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = {crearPlan, crearSuscripcion}