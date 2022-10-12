const levelModel = require('./model');

exports.getLevelUpdate = async (characterID, level) => {
    const data = await levelModel.findOne({ level: level, characterID: characterID });
    return data;
}