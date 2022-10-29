const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const giftownSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: 'user' },
    giftID: { type: ObjectId, ref: 'giftquest' },
    status: { type: Number }
});

module.exports = mongoose.model('giftown', giftownSchema);