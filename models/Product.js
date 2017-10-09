const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const CAT = require('./types/categories');

const ProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name   				: { type: String, required: true },
  category      : { type: String, required: true, default: '' },
  type          : { type: String, required: true },
  year   				: { type: Date, required: false, default: Date.now }, 
  organic    		: { type: Boolean, required: false, default: false },
  image         : { type: String, required: false, default: '../uploads' },
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});



module.exports = mongoose.model('Product', ProductSchema);








