const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "fusionajobs@gmail.com",//hacer variables de entorno
		pass: "jvocooswsqcttbmg",
	},
});

transporter.verify().then(() => {
	console.log("Lista la configuracion para enviar correos");
});

module.exports={transporter}