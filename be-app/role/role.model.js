const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.Permissions = [
    {
        name: 'user_management',
        display: 'User Management',
        value: 'u_m'
    },{
        name: 'content_management',
        display: 'Content Management',
        value: 'c_m'
    },{
        name: 'subscriber',
        display: 'Subscriber',
        value: 's'
    }
]

const schema = new Schema({
    rolename: { type: String, unique: true, required: true },
    description: { type: String, required: false },
    permissions: { type: Array(String), required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.hash;
        // delete ret.roles;
    }
});

module.exports = mongoose.model('Role', schema);