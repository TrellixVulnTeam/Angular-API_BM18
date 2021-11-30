const mongoose = require('mongoose');

//Struturation des champs du modèle Thing
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  reserv : { type: Number, required: true },
});

//Export du modèle
module.exports = mongoose.model('Thing', thingSchema);