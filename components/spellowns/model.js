const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const spellownSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: ObjectId, ref: 'user' },
    spellID: { type: ObjectId, ref: 'spell' },
    amount: { type: Number },
});

module.exports = mongoose.model('spellown', spellownSchema);