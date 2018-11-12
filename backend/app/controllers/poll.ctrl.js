const { Poll, PollOption } = require('../models');
const mongoose = require('mongoose');

module.exports = {
	async view(req, res) {
		const query = {};
		let request = null;

		if (req.params.id) {
			query._id = mongoose.Types.ObjectId(req.params.id)

			request = Poll.findOne(query);
		} else {
			request = Poll.find(query);
		}

		request.populate('options');

		const result = await request;

		res.json(result);
	},
	async viewMyPoll({user}, res) {
		try {
			await user.populate({
				path:     'poll',			
				populate: {
					path:  'options',
				}
			}).execPopulate();

			res.json(user.poll);
		} catch(e) {
			console.log(e);
			res.end();
		}
	},

	async createMyPoll({user, body}, res) {
		try {
			let poll = null;

			await user.populate('poll').execPopulate();

			if (user.poll) {	
				poll = user.poll;
			} else {
				poll = new Poll();

				user.poll = poll;
			}

			if (body.question) {
				poll.question = body.question;
			}

			if (body.options && body.options.length) {
				let bulk = PollOption.collection.initializeOrderedBulkOp();
				let ids = new Set();

				body.options.forEach(async (o) => {
					if (o._id) {
						ids.add(o._id);

						// removing element from existing list to find out which row is removed
						poll.options.splice(poll.options.indexOf(o._id), 1);
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
				if (poll.options.length) {
					bulk.find({
						_id: {
							$in: poll.options
						}
					}).remove();
				}

				let result = await bulk.execute();

				result.getUpsertedIds()
					.forEach(i => ids.add(i._id));

				poll.options = Array.from(ids);
			}
				
			poll.save();
			user.save();

			await poll.populate('options').execPopulate();

			return res.json(poll);
		} catch(e) {
			console.log('error', e);
			res.json({});
		}
	}
}