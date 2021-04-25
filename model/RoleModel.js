const mongoose = require('mongoose')

const ruleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('RuleModel', ruleSchema)