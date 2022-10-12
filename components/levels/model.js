const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const levelSchema = new Schema({
    id: { type: ObjectId },
    characterID: { type: Schema.Types.ObjectId, ref: 'character' },
    level: { type: Number},
    damage: { type: Number},
    hp: { type: Number},
    cost: { type: Number},
});

module.exports = mongoose.model('level', levelSchema);