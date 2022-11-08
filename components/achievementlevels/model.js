const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const achievementLevelSchema = new Schema({
    id: { type: ObjectId },
    achievementID: { type: Schema.Types.ObjectId, ref: 'achievement' },
    level: { type: Number},
    description: { type: String},
    challenge: { type: Number},
    gold: { type: Number},
    gem: { type: Number},
});

module.exports = mongoose.model('achievementlevel', achievementLevelSchema);