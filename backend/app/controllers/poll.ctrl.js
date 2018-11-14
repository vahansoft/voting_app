const { Poll, PollOption, PollVotes } = require('../models');
const mongoose = require('mongoose');

module.exports = {
	async view(req, res) {
		try {
			const pollId = mongoose.Types.ObjectId(req.params.id);
			const poll = await Poll.findOne({_id: pollId}).populate('options');
			const votes = await PollVotes.findOne({
				poll: pollId
			}) || {};

			res.json({
				...poll.toJSON(), 
				results: votes.results || {}
			});
		} catch(e) {
			console.log(e);
			res.end();
		}
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
	},
	async deleteMyPoll({user}, res) {
		try {
			await user.populate('poll');

			if (user.poll && user.poll._id) {
				const pollId = mongoose.Types.ObjectId(user.poll._id);

				Poll.deleteOne({_id: pollId}).exec();
				PollVotes.deleteOne({poll: pollId}).exec();
				PollOption.deleteMany({
					_id: {
						$in: user.poll.options
					}
				}).exec();
			}
			
			user.poll = null;
			user.save();

			res.end();
		} catch (e) {
			console.log("error", e);
			res.status(400);
			res.end();
		}
	},
	async vote({user, params, body}, res) {
		const pollId = mongoose.Types.ObjectId(params.id);
		const choosedOption = body.option;

		let poll = await Poll.findOne({_id: pollId});

		if (	!poll 
			 || user.votedPolls.indexOf(pollId) >= 0
			 || poll.options.indexOf(choosedOption) < 0
		) {
			console.log("already voted", choosedOption);
			res.status(400);

			return res.json({
				message: "You can't vote."
			});
		}

		await PollVotes.findOneAndUpdate(
			{
				poll: pollId
			}, 
			{
				$inc: {
					[`results.${mongoose.Types.ObjectId(body.option)}`]: 1
				}
			}, {
				upsert: true
			});

		user.votedPolls.push(pollId);

		user.save();
		res.end();
	}
}