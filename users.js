const express = require('express');
const User = require('./User');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { correo } = req.body; // Obtén el correo electrónico del cuerpo de la solicitud

    // Busca un usuario por su correo electrónico
    const usuario = await User.findOne({ correo });

    if (usuario) {
      res.json(usuario); // Si se encuentra el usuario, devuélvelo como respuesta
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});


// Ruta para registrar un usuario
router.post('/users', async (req, res) => {
  try {
    const { nombre, correo, contrasena } = req.body;

    // Verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const usuario = new User({
      nombre,
      correo,
      contrasena,
    });

    await usuario.save();

    res.json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

router.post('/ingreso-verificar', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    
    const usuario = await User.findOne({ correo });
    if (usuario) {
      res.json({ mensaje: 'Usuario registrado' });
    }
    if (usuario.contrasena !== contrasena) {
      return res.status(400).json({ mensaje: 'El correo o la contraseña son incorrectos' });
    } else {
      res.json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Hubo un error al verificar el usuario' });
  }
});

module.exports = router;
