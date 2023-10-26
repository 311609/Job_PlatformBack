const express = require('express');
const mongoose = require('mongoose');
const users = require('./users');
const cors = require('cors');
require('dotenv').config();

const app = express();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(express.json());

app.use('/api/users', users);

app.listen(3001, () => {
  console.log('Servidor corriendo en el puerto 3001');
  console.log('Conexion exitosa en mongodb Atlas');
});
