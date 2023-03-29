const {crearPlan, crearSuscripcion} = require('../controllers/paymentController')

const planRoute = async (req, res) => {
    try {
        const suscripcion = await crearPlan(req.body)
          res.json(suscripcion);
      } catch (error) {
        console.log(error);
      }
}

const subscriptionRoute = async (req, res) => {
    try {
        const suscripcion = await crearSuscripcion(req.body)
          res.json(suscripcion);
      } catch (error) {
        console.log(error);
      }
}

const respuestasMP = async (req, res) => {
    try {
        res.json(req.body)
    } catch (error) {
        console.log(error);
    }
  }

module.exports = {planRoute, subscriptionRoute, respuestasMP}