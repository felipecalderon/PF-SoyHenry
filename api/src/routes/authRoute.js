const { authCreatePostulant } = require('../controllers/authControllers');

// Registro de usuario con correo electrónico y contraseña
const authUserCreate = async (req, res) => {
    try {
      const data = await authCreatePostulant(req.body)
      res.json({ message: 'Usuario creado exitosamente' });

    } catch (error) {

      console.error(error);
      if(error.code === 'auth/email-already-in-use') return res.status(400).json({ message: 'El usuario ya existe' });
      res.status(400).json({ message: 'Error al crear el usuario' });

    }
  };

  module.exports = {authUserCreate}