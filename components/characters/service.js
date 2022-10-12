const characterModel = require('./model');

exports.getCharacters = async () => {
    const character = await characterModel.find();
    return character;
}