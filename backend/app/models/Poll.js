const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const PollOption = require('./PollOption');

const schema = new Schema({
    question: String,
    options: [{
    	type: Schema.Types.ObjectId, 
    	ref: 'PollOption'
    }]
}, {
  timestamps: false
});

schema.methods.syncOptions = async function(options) {
	let currentOptions = {...this.options};
	let bulk = PollOption.collection.initializeOrderedBulkOp();
	let ids = new Set();

	options.forEach(async (o) => {
		if (o._id) {
			ids.add(o._id);

			// removing element from existing list to find out which row is removed
			currentOptions.splice(currentOptions.indexOf(o._id), 1);
		}

		bulk.find({_id: mongoose.Types.ObjectId(o._id || null)})
			.upsert()
			.updateOne({
				$set: {
					answer: o.answer
				}
			});

	});

	// Removes unlisted items
	if (currentOptions.length) {
		bulk.find({
			_id: {
				$in: currentOptions
			}
		}).remove();
	}

	let result = await bulk.execute();

	result.getUpsertedIds()
		.forEach(i => ids.add(i._id));

	this.options = Array.from(ids);

	return this;
}

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