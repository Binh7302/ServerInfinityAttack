// tầng giao tiếp và xử lý data
const levelService = require('./service');

// Lấy thông tin theo level và characterID
exports.getLevelUpdate = async (characterID, level) => {
    let data = await levelService.getLevelUpdate(characterID, level);
    return data;
}

exports.getLevelsByCharID = async (charId) => {
    const levels = await levelService.getLevelsByCharID(charId);
    return levels;
}

exports.getLevelById = async (id) => {
    const level = await levelService.getLevelByID(id);
    return level;
}

exports.updateLevel = async (id, damage, hp, cost) => {
    await levelService.updateLevel(id, damage, hp, cost);
}