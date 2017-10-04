const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ROLES = require('./types/roles');

const AdminSchema = new Schema({
  username   : { type: String, required: true },
  email      : { type: String, required: true },
  password   : { type: String, required: true },
  role       : { type: String, enum: ROLES, required: true, default: 'Admin' },
  
 
});

const collectionName = 'admin';
module.exports = mongoose.model('Admin', AdminSchema, collectionName);






