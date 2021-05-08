const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('RoleModel', roleSchema)