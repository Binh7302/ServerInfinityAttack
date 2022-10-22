const characterModel = require('./model');
const characterOwnModel = require('../characterowns/model');

exports.getCharacters = async () => {
    const characters = await characterModel.find();
    return characters;
}

exports.getUsingCharNameById = async (id) => {
    const charOwn = await characterOwnModel.findOne({ userID: id, status: 1 });
    const char = await characterModel.findOne({ _id: charOwn.characterID });
    return char.name;
}

exports.getCharById = async (id) => {
    const char = await characterModel.findOne({ _id: id });
    return char;
}

exports.updatePrice = async (id, price) => {
    return await characterModel.updateOne({ _id: id }, {price: price});
}

exports.getCharsHaveById = async (id) => {
    const charsHave = await characterOwnModel.find({ userID: id });
    return charsHave;
}

exports.getCharByName = async (name) => {
    const char = await characterModel.findOne({ name: name });
    return char;
}