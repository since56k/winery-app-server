const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ROLES = require('./types/roles');

const AdminSchema = new Schema({
  name       : { type: String, required: true },
  surname    : { type: String, required: true },
  email      : { type: String, required: true },
  password   : { type: String, required: true },
  role       : { type: String, enum: ROLES, required: true, default: 'Admin' },
  note       : { type: String },
  log        : { type: String },
  message    : { type: String }
});

const collectionName = 'admin';
module.exports = mongoose.model('Admin', AdminSchema, collectionName);






