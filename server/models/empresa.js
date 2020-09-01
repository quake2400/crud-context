const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type:String,
        required:true
    },
    url:{
        type: String,
        required: true 
    },
    nombre_imagen:{
        type: String,
        required: true
    },
    creado:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Empresas', empresaSchema);