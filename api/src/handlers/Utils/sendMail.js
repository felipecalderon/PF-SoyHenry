const { transporter } = require('../../Nodemailer/nodemailerConfig')
//aca van el cuerpo de lo que seria el mail que se envia...

const mailRegisterUser = async (email, names, rol) => {
	try {
		switch (rol) {
			case 'Postulante':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Gracias  por registrarte!!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<h3 style="color: #fff; font-weight: bold; margin-top: 0">¡Gracias por registrarte en FusionaJob!</h3>
							<br/>
							<p style="color: #fff;">Termina de completar tus datos para poder aplicar a las diferentes ofertas laborales que están en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a></p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<hr style="margin: 40px 0"/>
							<h3 style="color: #fff; margin-bottom: 5px ">Atentamente,</h3>
							<img src="https://fusionajob.vercel.app/static/media/logofusionajob.046e4866c501fc3dd8af.png" alt="Logo FusionaJobs" width="200" />
							<p style="color: #fff; margin: 5px 0">Tus aliados en la busqueda de empleos y candidatos.</p>
						</div>
					</body>
					`,
				});
				break;
			case 'Empresa':
				await transporter.sendMail({
					from: "Fusionajobs <fusionajobs@gmail.com>",
					to: email,
					subject: `Gracias  por registrarte!!!`,
					html: `
					<body style="background-color: #1E555C; font-family: Arial, sans-serif; color: #fff; display: flex; flex-direction: column;">
						<div style="text-align: center; background-color: #29183c; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 60px 40px; max-width: 600px; margin: 0 auto;">
							<h1 style="color: #fff; font-weight: bold; margin-top: 0">Hola ${names}</h1>
							<h3 style="color: #fff; font-weight: bold; margin-top: 0">¡Gracias por registrarte en FusionaJob!</h3>
							<br/>
							<p style="color: #fff;"> Enhorabuena, ya esta todo listo, Publica ofertas y encuentra al mejor candidato en <a style="color: #fdb813; text-decoration: none;" href="https://fusionajob.vercel.app" target="_blank" rel="noreferrer">¡Nuestra Página!</a></p>
							<hr style="width: 500px; height: 1px; background-color: #fff; margin: 20px auto;" />
							<p style="color: #fff;">Ante cualquier duda o consulta no dudes en contactarnos.</p>
							<hr style="margin: 40px 0"/>
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

module.exports = { transporter, mailRegisterUser }