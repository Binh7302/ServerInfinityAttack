const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterownSchema = new Schema({
    id: { type: ObjectId},
    userID: { type: Schema.Types.ObjectId, ref: 'users' },
    characterID: { type: Schema.Types.ObjectId, ref: 'character' },
    levelID: { type: Schema.Types.ObjectId, ref: 'level' },
    status: { type: Number},
});

module.exports = mongoose.model('characterown', characterownSchema);