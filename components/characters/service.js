const characterModel = require('./model');

exports.getCharacters = async () => {
    const characters = await characterModel.find();
    return characters;
}