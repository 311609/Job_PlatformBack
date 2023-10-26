const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  contrasena: { type: String, required: true, unique: true },
});
    

module.exports =  mongoose.model('User', userSchema);