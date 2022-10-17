const characterModel = require('./model');
const characterOwnModel = require('../characterowns/model');

exports.getCharacters = async () => {
    const characters = await characterModel.find();
    return characters;
}

exports.getUsingCharNameById = async (id) => {
    const charOwn = await characterOwnModel.findOne({ userID: id, status: 1 });
    console.log("charOwn: " + charOwn);
    const char = await characterModel.findOne({ _id: charOwn.characterID });
    console.log("char: " + char);
    console.log(char.name);
    return char.name;
}