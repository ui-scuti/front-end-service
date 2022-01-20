const mongoose = require('mongoose');
const config = require('../config');
const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};
// console.log(`mongodb://${process.env.DBOST}/daily-challenge`);
mongoose.connect(
	`mongodb://${process.env.DBOST}/daily-challenge`,
	connectionOptions
);
mongoose.Promise = global.Promise;

module.exports = {
	User: require('../users/user.model'),
	Role: require('../role/role.model'),
};
