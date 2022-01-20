const expressJwt = require('express-jwt');
const util = require('./util.js');
const config = require('../config');
const userService = require('../users/user.service');
const log = require('../log');

module.exports = jwt;

function jwt() {
	const secret = config.SECRET;
	return expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
		path: [
			// public routes that don't require authentication
			'/user/authenticate',
			'/user/register',
		],
	});
}

async function isRevoked(req, payload, done) {
	const userID = util.getUserID(req);
	const user = await userService.getById(userID);

	// revoke token if user no longer exists
	if (!user) {
		log.error(
			`Error processing interceptor.User doesn't exists: ${userID}`
		);
		return done(null, true);
	}

	done();
}
