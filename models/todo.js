const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  surname: {
    type: String,
    required: [true, 'description is required']
  },
  role: String,
});

module.exports = mongoose.model('Todo', TodoSchema);
