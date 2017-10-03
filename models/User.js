const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ROLES = require('./types/roles');

const UserSchema = new Schema({
  username   : { type: String, required: true },
  email      : { type: String, required: true },
  password   : { type: String, required: false },
  image      : { type: String, default: '' },
  role       : { type: String, enum: ROLES, required: true, default: 'Guest'}

});

//const collectionName = 'User';
module.exports = mongoose.model('User', UserSchema);

