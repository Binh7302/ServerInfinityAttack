const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const questSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String},
    description: { type: String},
    point: { type: Number},
    challenge: { type: Number}
});
module.exports = mongoose.model('quest', questSchema);