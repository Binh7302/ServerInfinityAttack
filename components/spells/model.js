const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const spellChema = new Schema({
    id: { type: ObjectId },
    name: { type: String},
    description: { type: String},
    cooldown: { type: String},
    price: { type: Number},
    total:{type : Number}
});
module.exports = mongoose.model('spell', spellChema);