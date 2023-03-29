const {crearPlan, crearSuscripcion} = require('../controllers/paymentController')

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

module.exports = {planRoute, subscriptionRoute, respuestasMP}