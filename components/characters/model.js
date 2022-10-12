const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String},
    description: { type: String},
});

module.exports = mongoose.model('character', characterSchema);