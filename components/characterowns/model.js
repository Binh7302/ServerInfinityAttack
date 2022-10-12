const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterownSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    characterID: { type: Schema.Types.ObjectId, ref: 'character' },
    levelID: { type: Schema.Types.ObjectId, ref: 'level' },
    status: { type: Number},
});

module.exports = mongoose.model('characterown', characterownSchema);