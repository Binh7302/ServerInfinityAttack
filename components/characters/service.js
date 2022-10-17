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