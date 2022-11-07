const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const friendsSchema = new Schema({
    id: { type: ObjectId },
    userReq: { type: ObjectId, ref: 'user' },
    userRes: { type: ObjectId, ref: 'user' },
    status: { type: Number },
});
module.exports = mongoose.model('friend', friendsSchema);