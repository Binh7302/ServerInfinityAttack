const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const spellChema = new Schema({
    id: { type: ObjectId },
    name: { type: String, required: true },
    price: { type: String, required: true},
    description: { type: String, required: true  },
    cooldown: { type: String}
});
module.exports = mongoose.model('spell', spellChema);