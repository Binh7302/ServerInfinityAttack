const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const achievementownSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: 'user' },
    achievementID: { type: ObjectId, ref: 'achievement' },
    achievementLevelID: { type: ObjectId, ref: 'achievementlevel' },
    challengeAchieved: { type: Number },
});

module.exports = mongoose.model('achievementown', achievementownSchema);