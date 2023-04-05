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
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola <b>${names}</b></h1>
							<p style="color: #fff; margin-top: 0">¡Nos complace informarte que hemos recibido tu aplicación para la oferta <b>${offerTitle}</b>. 
							<br />
							<br />
							Tu aplicación ha sido registrada en nuestro sistema y será evaluada por el equipo de reclutamiento de la empresa.
							<br />
							<br />
							Te agradecemos por utilizar nuestra plataforma como un medio para aplicar a estas oportunidades laborales. Te estaremos notificando como vas en el proceso de selección.</p>
							<p style="color: #fff;">Pronto la empresa se pondra en contacto contigo. <br/> <br/> Si te interesa buscar más ofertas laborales no dudes en seguir usando <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer"><b>¡FusionaJob!</b></a> </p>
							<br />
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">No dudes en contactarnos si tienes alguna pregunta o inquietud..</p>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
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
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola <b>${names}</b></h1>
							<p style="color: #fff; margin-top: 0"> Cancelaste la aplicacion a la oferta <b>${offerTitle}</b>, sigue buscando ofertas y aplicando en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡FusionaJob!</a>  </a></p>
							<br />
							<br />
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">No dudes en contactarnos si tienes alguna pregunta o inquietud..</p>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
						</div>
					</body>
					`,
				});
				break;
			case 'viewed':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Actualización del estado de tu aplicación en la oferta!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola <b>${names}</b></h1>
							<p style="color: #fff;"> 
								Esperamos que te encuentres muy bien. Queremos informarte que hemos recibido una actualización sobre el estado de tu postulación de la oferta <b>${offerTitle}</b>. Nos complace informarte que tu postulación ha sido <b> ¡vista! </b> por el equipo de selección de la empresa.
								<br/>
								<br/>
								Recuerda que nuestra plataforma es solo un intermediario entre los candidatos y las empresas. La decisión final depende del equipo de selección de la empresa, pero nos esforzamos por ayudarte en todo el proceso de búsqueda de empleo.
								<br/>
								<br/>
								Te deseamos mucha suerte y te agradecemos por confiar en nuestra plataforma. 
							</p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
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
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola <b>${names}</b></h1>
							<p style="color: #fff;"> 
								Esperamos que te encuentres muy bien. Queremos darte la gran noticia que hemos recibido una actualización sobre el estado de tu postulación de la oferta <b>${offerTitle}</b>. Nos complace informarte que tu postulación ha sido <b> ¡seleccionada! </b> por el equipo de selección de la empresa.
								<br/>
								<br/>
								Recuerda que nuestra plataforma es solo un intermediario entre los candidatos y las empresas. La decisión final depende del equipo de selección de la empresa, pero nos esforzamos por ayudarte en todo el proceso de búsqueda de empleo.
								<br/>
								<br/>
								Te deseamos mucha suerte y te agradecemos por confiar en nuestra plataforma. 
							</p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
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
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola <b>${names}</b></h1>
							<p style="color: #fff;"> 
								Lamentamos informarte que no has sido seleccionado para la oferta laboral <b>${offerTitle}</b>. Agradecemos tu interés y te animamos a seguir buscando oportunidades laborales que se ajusten a tus habilidades y perfil.
								<br/>
								<br/>
								No dudes en seguir revisando las ofertas laborales disponibles en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer"><b>¡FusionaJob!</b></a> y aplicar a aquellas que te interesen. <b>¡Te deseamos mucho éxito en tu búsqueda laboral!</b>
							</p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
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