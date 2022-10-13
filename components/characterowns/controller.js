// tầng giao tiếp và xử lý data
const characterownService = require('./service');

// Lấy chi tiết tướng 1 người chơi sỡ hữu
exports.getCharacterOwnById = async (id) => {
    let data = await characterownService.getCharacterOwns(id);
    // data = data.filter(item => item.userID.equals(id));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID,
            characterID: item.characterID,
            level: item.levelID,
            status: item.status,
        }
        return item;
    });
    return data;
}

// add nhân vật fire knight cho người chơi đăng kí tài khoản
exports.addFirstCharacter = async (username) => {
    await characterownService.addFirstCharacter(username);
}