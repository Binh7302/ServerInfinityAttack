const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterownSchema = new Schema({
    id: { type: ObjectId },
    hp: {
        type: Number
    },
    damage: {
        type: Number
    },
    level: {
        type: Number
    },
    status: {
        type: Number
    },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    characterID: { type: Schema.Types.ObjectId, ref: 'character' },
});

module.exports = mongoose.model('characterown', characterownSchema);