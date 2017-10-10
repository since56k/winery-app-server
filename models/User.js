const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ROLES = require('./types/roles');

const UserSchema = new Schema({
  username   : { type: String, required: true },
  email      : { type: String, required: true },
  password   : { type: String, required: false },
  organic    : { type: Boolean, required: false, default: false },
  amount: { type: Number, default: 0 },
  cartItems :   [{
    productId:  {type: Schema.Types.ObjectId, ref: 'Product'},
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  image      : { type: String, default: '' },
  role       : { type: String, enum: ROLES, required: false, default: 'Guest'},
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  address: {
    'street': String,
    'postal_code': String,
    'city': String,
  },
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.asData = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    role: this.role
  }
};

//const collectionName = 'User';
module.exports = mongoose.model('User', UserSchema);

