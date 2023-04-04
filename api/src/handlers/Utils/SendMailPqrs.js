const { transporter } = require('../../Nodemailer/nodemailerConfig')
//aca van el cuerpo de lo que seria el mail que se envia...

const mailPqrs = async (usuario, correo, asunto, mensaje) => {
  try {
    await transporter.sendMail({
      from: `${correo}`,
      to: 'waha0522@gmail.com',
      subject: `${asunto}`,
      html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">El usuario ${usuario} hizo una ¡PQRS!.</h1>
							<h1 style="color: #fff; font-size: 20px; font-weight: bold; margin-top: 0">¡Debemos responderla lo mas pronto posible!</h1>
							<p style="color: #fff;">${mensaje}</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
    });
  } catch (error) {
    console.log("Error en nodemailer activate account", error);
    return error
  }
};

module.exports = { transporter, mailPqrs }