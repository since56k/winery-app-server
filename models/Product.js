const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User         = require('./User');
const CAT = require('./types/categories');

const ProductSchema = new Schema({
  userId        : { type: Schema.Types.ObjectId, ref: 'User' },
  name   				: { type: String, required: true },
  category      : { type: String, required: true, default: '' },
  type          : { type: String, required: true },
  year   				: { type: Date, required: false, default: Date.now }, 
  organic    		: { type: Boolean, required: false, default: false },
  image      : { type: String, default: '' },
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


// ProductSchema.methods.addProductId = function(cartItems, cb){
//   var userId = this.userId;
//   mongoose.models.User.findByIdAndUpdate(userId, {
//     $push: { cartItems: this._id }
//   }, (err) => {
//     if (!err){
//       return cb()
//     } else {
//       return cb(err);
//     }
//   })
// }

module.exports = mongoose.model('Product', ProductSchema);








