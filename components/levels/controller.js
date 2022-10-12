// tầng giao tiếp và xử lý data
const levelService = require('./service');

// Lấy chi tiết tướng 1 người chơi sỡ hữu
exports.getLevelUpdate = async (characterID, level) => {
    let data = await levelService.getLevelUpdate(characterID, level);
    return data;
}

