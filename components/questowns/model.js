const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const questownSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: 'user' },
    questID: { type: ObjectId, ref: 'quest' },
    status: { type: Number },
    challengeAchieved: { type: Number }
});

module.exports = mongoose.model('questown', questownSchema);