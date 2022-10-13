const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterownSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: 'user' },
    characterID: { type: ObjectId, ref: 'character' },
    levelID: { type: ObjectId, ref: 'level' },
    status: { type: Number },
});

module.exports = mongoose.model('characterown', characterownSchema);