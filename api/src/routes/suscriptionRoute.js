const { crearPlan, crearSuscripcion, controlarPagoStripe, controlarListaPagos, statisticspaymentsController } = require('../controllers/paymentController')
const stripe = require('../configs/stripe/stripeConfig');
const { getUsersByEmail } = require('../handlers/handlerUserModels');
const planRoute = async (req, res) => {
  try {
    const suscripcion = await crearPlan(req.body)
    res.json(suscripcion);
  } catch (error) {
    console.log(error);
    res.status(404).json('No se pudo crear el plan')
  }
}

const subscriptionRoute = async (req, res) => {
  try {
    const suscripcion = await crearSuscripcion(req.body)
    res.json(suscripcion);
  } catch (error) {
    console.log(error);
    res.status(404).json('No se pudo crear la suscripción')
  }
}

const respuestasMP = async (req, res) => {
  try {
    console.log(req.body);
    res.json(req.body)
  } catch (error) {
    console.log(error);
    res.status(404).json('Hubo un error en el pago')
  }
}

const pagoStripe = async (req, res) => {
  try {
    const { customerEmail } = req.body;
    const product = await stripe.products.retrieve('prod_NcONWlS4sUtxG6');
    console.log(product);
    console.log(customerEmail)
    const usuario = await getUsersByEmail( customerEmail )
    if (!usuario) throw Error( 'No se puede contratar el plan sin tener una cuenta creada 👀👀')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: product.default_price,
        quantity: 1,
      }],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: `https://fusionajobs-back-production.up.railway.app/pago?estado=pagado&email=${customerEmail}`,
      cancel_url: 'https://fusionajobs-back-production.up.railway.app/pago?estado=fallido',
    });
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

const recepcionPago = async (req, res) => {
  try {
    await controlarPagoStripe(req.query)
    res.redirect(302, 'http://localhost:3002/offers');
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const rutaVerPagos = async (req, res) => {
  try {
    const estadoDelPago = await controlarListaPagos(req.query)
    res.json(estadoDelPago)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

const statisticspayments = async (req, res) => {
  try {
    const estaditica = await statisticspaymentsController()
    res.status(200).json(estaditica)
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  planRoute,
  subscriptionRoute,
  respuestasMP,
  pagoStripe,
  recepcionPago,
  rutaVerPagos,
  statisticspayments
}