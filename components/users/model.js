const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String, required: true },
    password: { type: String, required: true},
    name: { type: String, required: true  },
    email: { type: String},
    gold: { type: Number },
    gem: { type: Number}
});

module.exports = mongoose.model('users', userSchema);