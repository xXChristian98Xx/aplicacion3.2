const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre : String,
    apellidos : String,
    sexo : String,
    image : String

})

module.exports = mongoose.model('usuario', UsuarioSchema);