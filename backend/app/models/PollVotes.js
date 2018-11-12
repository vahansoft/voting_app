const mongoose = require("mongoose")
const Schema = mongoose.Schema;

module.exports = mongoose.model('PollVotes', new Schema({
	poll: {
    	type: Schema.Types.ObjectId, 
    	ref: 'Poll'
    },
    votes: [{
    	user: {
    		type: Schema.Types.ObjectId, 
    		ref: 'User'
    	},
    	option: {
    		type: Schema.Types.ObjectId, 
    		ref: 'PollOption'
    	}
    }],
    results: Object
}, {
  timestamps: false,
}));