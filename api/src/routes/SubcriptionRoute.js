const PaymentController = require("../controllers/paymentController");
const PaymentService = require("../handlers/handlerPayment");

const PaymentInstance = new PaymentController(new PaymentService());



const paymentMP= function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
  };

module.exports={paymentMP}