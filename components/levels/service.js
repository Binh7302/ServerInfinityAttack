const levelModel = require('./model');
const charModel = require('../characters/model');
const charOwnModel = require('../characterowns/model');

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

exports.getLevelByCharNameAndUid = async(charName, uid) => {
    const char = await charModel.findOne({ name: charName });
    console.log(char);
    const charOwn = await charOwnModel.findOne({ userID: uid, characterID: char._id}).populate('levelID');
    console.log(charOwn);
    const level = await levelModel.findOne({ _id: charOwn.levelID._id });
    console.log(level);
    return level;
}