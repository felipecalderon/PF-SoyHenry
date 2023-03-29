const{transporter}=require('../../Nodemailer/nodemailerConfig')
//aca van el cuerpo de lo que seria el mail que se envia...
const mailRegisterUser = async (email,username) => {
	try {
		await transporter.sendMail({
			from: "Fusionajobs <fusionajobs@gmail.com>",
			to: email,
			subject: `Gracias  por registrarte!!!`,
			html: `
				<h2>Hola ${username}  </h2>
				<h4>Gracias por registrarte en nuestra pagina. </h4>
				<hr />
				<div>
				<p>Ante cualquier duda o consulta no dudes en contactarnos.</p>
				
				<p>Atentamente</p>
				<p>Tus amigos de fusiona-jobs</p>
				</div> 
			`,
		});
	} catch (error) {
		console.log("Error en nodemailer activate account", error);
		return error 
		
	}
};

module.exports={transporter,mailRegisterUser}