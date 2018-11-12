const mongoose = require("mongoose")
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    ip: String,
    poll: {
    	type: Schema.Types.ObjectId, 
    	ref: 'Poll'
    },
    votedPolls: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'Poll'
    }]
}, {
  timestamps: false,
}));