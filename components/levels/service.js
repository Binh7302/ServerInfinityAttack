const levelModel = require('./model');

exports.getLevelUpdate = async (characterID, level) => {
    const data = await levelModel.findOne({ level: level, characterID: characterID });
    return data;
}

exports.getLevelsByCharID = async (charID) => {
    const levels = await levelModel.find({characterID: charID});
    return levels;
}

exports.getLevelByID = async (id) => {
    const level = await levelModel.findOne({ _id: id });
    return level;
}

exports.updateLevel = async (id, damage, hp, cost) => {
    await levelModel.findByIdAndUpdate(id, {damage: damage, hp: hp, cost: cost});
}