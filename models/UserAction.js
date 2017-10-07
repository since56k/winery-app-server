const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAction = new Schema({
  'user_id': {'type': Schema.Types.ObjectId, 'ref': 'User'},
  'favourite_products': [{'type': Schema.Types.ObjectId, 'ref': 'Product'}],
  'current_cart': [{
    'productId': {'type': Schema.Types.ObjectId, 'ref': 'Product'},
    'ordered_color': String,
    'ordered_size': String,
    'quantity': Number,
  }],
  'visited_products': [{'type': Schema.Types.ObjectId, 'ref': 'Product'}],
  'sizes': {
    'tops': [],
    'trousers': [],
    'dresses': [],
    'shoes': []
  },
  'colours': [],
  'price_behaviour': {
    'full_price_frequency': Number,
    'sale_price_frequency': Number,
    'average_price': Number,
    'average_discount': Number
  }
});


module.exports = mongoose.model('Action', UserAction);