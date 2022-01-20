const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    accessToken: { type: String, unique: true, required: false },
    id: { type: String, unique: true, required: false },
    firstName: { type: String, required: false },
    username: { type: String, required: true },
    lastName: { type: String, required: false },
    imageUrl: { type: String, required: false },
    name: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: false },
    name: { type: String, required: true },
    isadmin: { type: Boolean, required: false },
    roles: { type: Array(String), required: false },
    tokenId: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
        delete ret.roles;
    }
});

module.exports = mongoose.model('User', schema);