const {mercadopago} = require('../configs/mercadopago/mpconfig');
const { getUsersByEmail } = require('../handlers/handlerUserModels');
const { User, Postulant, Payment } = require("../models/relations.js");

const controlarListaPagos = async ({email}) => {
    try {
        if(!email){
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

const controlarPagoStripe = async ({estado, email}) => {
  try {
    if(estado !== 'pagado') throw 'Pago fallido por alguna razón misteriosa 👀'
    const usuario = await User.findOne({
      where: {email}
    })
    if(!usuario) throw 'No se puede contratar el plan sin tener una cuenta creada 👀👀'
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

  module.exports = {crearPlan, crearSuscripcion, controlarPagoStripe, controlarListaPagos}