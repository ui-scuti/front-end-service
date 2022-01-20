const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { log } = require('../log');
const util = require('../_helpers/util');
const User = db.User;
const Role = db.Role;

async function authenticate({ username, password, email }) {
	if (email) {
		const user = await User.findOne({ email: email });
		if (user) {
			log.info(`Initiating google Authentication for ID: ${user._id}`);
			const token = jwt.sign(
				{ sub: user._id, roles: user.roles },
				config.SECRET,
				{ expiresIn: '7d' }
			);
			log.info(`Autentication success for : ${username}`);
			return {
				...user.toJSON(),
				token,
			};
		} else {
			throw 'User is not registered';
		}
	} else {
		const user = await User.findOne({ username });
		log.info(
			`Initiating local Authentication for : ${username} ID: ${user._id}`
		);
		if (user && bcrypt.compareSync(password, user.hash)) {
			log.info(`Roles : ${JSON.stringify(user.roles)}`);
			const token = jwt.sign(
				{ sub: user._id, roles: user.roles },
				config.SECRET,
				{ expiresIn: '7d' }
			);
			log.info(`Autentication success for : ${username}: ${token}`);
			return {
				...user.toJSON(),
				token,
			};
		}
	}
}

async function getTokenObjectDecoded(token) {
	jwt.verify(token, config.SECRET, function (err, decoded) {
		console.log(decoded);
		return decoded;
	});
}

async function getAll() {
	return await User.find();
}

async function getById(id) {
	return await User.findById(id);
}

async function create(userParam) {
	log.info('Creating user');
	// validate
	if (await User.findOne({ email: userParam.email })) {
		throw 'User with email "' + userParam.email + '" is already exists';
	} else {
		log.info('No existing user found. Creating a new one');
	}

	if (!userParam.roles || !userParam.roles.length) {
		// For user registered from UI, need to add SUBSCRIBER role
		userParam.roles = ['60a6625ac8232b11a0a9fd7c'];
	}
	const user = new User(userParam);

	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10);
	}
	log.info(`${user}`);
	// save user
	await user.save();
}

const getPermissions = async (req) => {
	return new Promise(async (resolve, reject) => {
		console.log('Initial');
		const userid = util.getUserID(req);
		const user = await getById(userid);
		log.info(`Found user : ${JSON.stringify(user)}`);
		const roles = user.roles;
		log.info(`All roles : ${roles}`);
		let permisions = [];

		for (var i = 0; i < roles.length; i++) {
			const role = await Role.findById(roles[i]);
			log.info(`Found role : ${role.rolename}`);
			log.info(`Permissions : ${role.permissions}`);
			permisions = permisions.concat(role.permissions);
			log.info(`Final PermissionsXXXX : ${permisions}`);
		}
		log.info(`Here`);
		log.info(`All Permissions : ${permisions}`);
		// return permisions;
		resolve(permisions);
	});
};

async function update(id, userParam) {
	const user = await User.findById(id);

	// validate
	if (!user) throw 'User not found';
	if (
		user.username !== userParam.username &&
		(await User.findOne({ username: userParam.username }))
	) {
		throw 'Username "' + userParam.username + '" is already taken';
	}

	// hash password if it was entered
	if (userParam.password) {
		userParam.hash = bcrypt.hashSync(userParam.password, 10);
	}

	// copy userParam properties to user
	Object.assign(user, userParam);

	await user.save();
}

async function _delete(id) {
	await User.findByIdAndRemove(id);
}

module.exports = {
	authenticate,
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getPermissions,
	getTokenObjectDecoded,
};
