const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Struturation des champs du modèle User
const userSchema = mongoose.Schema({
  firstname: {type : String, required: true },
  lastname: {type : String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//Export du modèle
module.exports = mongoose.model('User', userSchema);