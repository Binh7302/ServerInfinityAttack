const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const giftSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String},
    gold: { type: Number},
    gem: { type: Number}
});
module.exports = mongoose.model('giftquest', giftSchema);