const {firebase} = require('./firebase.config')

// Registro de usuario con correo electrónico y contraseña
router.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        res.json({ message: 'Usuario creado exitosamente' });
      })
      .catch(error => {
        console.error(error);
        res.status(400).json({ message: 'Error al crear el usuario' });
      });
  });