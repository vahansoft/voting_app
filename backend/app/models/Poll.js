const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const schema = new Schema({
    question: String,
    options: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'PollOption'
    }]
}, {
  timestamps: false
})

// schema.pre('remove', {
// 	query: true,
// 	document: true
// }, function(next) {
// 	console.log("removing", this);
// 	this.model('User').update({}, { $pull: {poll: this._id}}, { safe: true }, next);
	
// 	this.model('PollOption').deleteMany({
// 		_id: {
// 			$in: this.options
// 		}
// 	}, next);
// });

module.exports = mongoose.model('Poll', schema);