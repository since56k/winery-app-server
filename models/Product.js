const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const CAT = require('./types/categories');

const ProductSchema = new Schema({
  name   				: { type: String, required: true },
  category      : { type: String, enum: CAT, required: true, default: '' }
  type          : { type: String, required: true },
  year   				: { type: Number, required: true },
  organic    		: { type: Boolean, required: false, default: false },
  date          : { type: Date, default: Date.now },
  
 
});

module.exports = mongoose.model('Product', ProductSchema);






