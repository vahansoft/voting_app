const { User } = require('../models');

module.exports = async (req, res, next) => {
	const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let user = await User.findOne({
		ip: userIP
	});

	if (!user) {
		user = new User({
			ip: userIP
		});

		user.save();
	}

	req.user = user;

	next();
}