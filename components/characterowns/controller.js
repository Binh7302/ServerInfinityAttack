// tầng giao tiếp và xử lý data
const characterownService = require('./service');

// Lấy chi tiết danh sách tướng 1 người chơi sỡ hữu
exports.getCharacterOwnById = async (id) => {
    let data = await characterownService.getCharacterOwns();
    data = data.filter(item => item.userID.equals(id));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID,
            characterID: item.characterID,
            levelID: item.levelID,
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

// Lấy chi tiết 1 tướng người chơi sỡ hữu
exports.getCharacterOwn = async (id) => {
    const data = await characterownService.getCharacterOwnByID(id); 
    return data;
}

exports.update = async (id, characterOwn) => {
    await characterownService.update(id, characterOwn);
}