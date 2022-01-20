const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

const Role = db.Role;

module.exports = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
};

async function getAll() {
	return await Role.find();
}

async function getById(id) {
	return await Role.findById(id);
}

async function create(roleParam) {
	// validate
	if (await Role.findOne({ rolename: roleParam.rolename })) {
		throw 'Rolename "' + roleParam.rolename + '" is already taken';
	}

	const role = new Role(roleParam);
	// save role
	await role.save();
}

async function update(id, roleParam) {
	const role = await Role.findById(id);

	// validate
	if (!role) throw 'Role not found';
	if (
		role.rolename !== roleParam.rolename &&
		(await Role.findOne({ rolename: roleParam.rolename }))
	) {
		throw 'Rolename "' + roleParam.rolename + '" is already taken';
	}

	// copy roleParam properties to role
	Object.assign(role, roleParam);

	await role.save();
}

async function _delete(id) {
	await Role.findByIdAndRemove(id);
}

async function getPermissions() {
	return Role.Permissions;
}
