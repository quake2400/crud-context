const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crea el servidor express
const app = express();

//Conectar a la base de datos
conectarDB();

//puerto de la app
const port = process.env.PORT || 4000;

//Habilitar los cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(opcionesCors));

//Habilitar leer los valores de un body
app.use(express.json());

//Habilitar carpeta publica
app.use(express.static('uploads'));

//Rutas de la app
app.use('/api/empresas',require('./routes/empresas.js'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () =>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});