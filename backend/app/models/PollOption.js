const mongoose = require("mongoose")
const Schema = mongoose.Schema;

module.exports = mongoose.model('PollOption', new Schema({
    answer: String
}, {
  timestamps: false
}));