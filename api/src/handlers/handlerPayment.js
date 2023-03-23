const axios = require("axios");
require("dotenv").config();
class PaymentService {
 

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",//razon o detalle de la suscripcion
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",//una ves que compras te direcciona a google es a modo de ejemplo
      payer_email: "TEST_USER_1496100784@testuser.com"//si o si tiene que ser el usuario comprador de prueba de mp
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return subscription.data.init_point;//retorno el link de pago solamente
  }
}

module.exports = PaymentService;