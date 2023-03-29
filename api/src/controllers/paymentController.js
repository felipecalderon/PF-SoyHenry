const {mercadopago} = require('../mercadopago/mpconfig')

const crearPlan = async ({email}) => {
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
  
 const crearSuscripcion = async ({idPlan, email}) => {
    try {
        console.log({idPlan});
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

  module.exports = {crearPlan, crearSuscripcion}