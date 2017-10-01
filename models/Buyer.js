const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ROLES = require('./types/roles');

const BuyerSchema = new Schema({
  name       : { type: String, required: true },
  surname    : { type: String, required: true },
  email      : { type: String, required: true },
  password   : { type: String, required: true },
  role       : { type: String, enum: ROLES, required: true, default: 'buyer'},
  note       : { type: String },
  log        : { type: String },
  message    : { type: String }
});

//const collectionName = 'Buyer';
module.exports = mongoose.model('Buyer', BuyerSchema);