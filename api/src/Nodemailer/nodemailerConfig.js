const nodemailer = require("nodemailer");
const { GOOGLE_MAIL_USER, GOOGLE_MAIL_PASS } = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: GOOGLE_MAIL_USER,
		pass: GOOGLE_MAIL_PASS
	},
});
transporter.verify().then(() => {
	console.log("Lista la configuracion para enviar correos");
});


module.exports={transporter}