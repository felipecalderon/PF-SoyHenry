const { transporter } = require('../../Nodemailer/nodemailerConfig')
//aca van el cuerpo de lo que seria el mail que se envia...

const mailStatusAplication = async (email, names, status, offerTitle) => {
	try {
		switch (status) {
			case 'send':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Confirmación de aplicación exitosa!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<p style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">¡Nos complace informarte que hemos recibido tu aplicación para la oferta ${offerTitle}. Tu aplicación ha sido registrada en nuestro sistema y será evaluada por el equipo de reclutamiento de la empresa.
							Te agradecemos por utilizar nuestra plataforma como un medio para aplicar a estas oportunidades laborales. Te estaremos notificando como vas en el proceso de selección.</p>
							<p style="color: #fff;">Pronto la empresa se pondra en contacto contigo, </a></p>
							<br />
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">No dudes en contactarnos si tienes alguna pregunta o inquietud..</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
				});
				break;
			case 'cancel':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Postulacion Cancelada`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<p style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0"> Cancelaste la aplicacion a la oferta ${offerTitle}, sigue buscando ofertas y aplicando en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a>  </a></p>
							<br />
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">No dudes en contactarnos si tienes alguna pregunta o inquietud..</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
				});
				break;
			case 'viewed':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Actualización del estado de tu aplicación en la oferta !!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">¡Gracias por registrarte en FusionaJob!</h1>
							<p style="color: #fff;">Termina de completar tus datos para poder aplicar a las diferentes ofertas laborales que están en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a></p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
				});
				break;
			case 'select':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Gracias  por registrarte!!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">¡Gracias por registrarte en FusionaJob!</h1>
							<p style="color: #fff;">Termina de completar tus datos para poder aplicar a las diferentes ofertas laborales que están en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a></p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
				});
				break;
			case 'no_select':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Gracias  por registrarte!!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 24px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<h1 style="color: #fff; font-size: 24px; font-weight: bold; margin-top: 0">¡Gracias por registrarte en FusionaJob!</h1>
							<p style="color: #fff;">Termina de completar tus datos para poder aplicar a las diferentes ofertas laborales que están en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a></p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff;">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
						</div>
					</body>
					`,
				});
				break;
			default:
				break;
		}
	} catch (error) {
		console.log("Error en nodemailer activate account", error);
		return error
	}
};

module.exports = { transporter, mailStatusAplication }