const mongoose = require("mongoose")
const Schema = mongoose.Schema;

module.exports = mongoose.model('Poll', new Schema({
    question: String,
    options: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'PollOption'
    }]
}, {
  timestamps: false
}));