const jwt = require('jsonwebtoken');
const config = require('../config');

function getUserID(req) {
	if (
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === 'Bearer'
	) {
		token = req.headers.authorization.split(' ')[1];
		const tObj = jwt.verify(token, config.SECRET);
		const userid = tObj.sub;
		return userid;
	}
	return '';
}
const util = {
	getUserID: getUserID,
};

module.exports = util;
