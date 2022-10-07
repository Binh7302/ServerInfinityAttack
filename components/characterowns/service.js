// tầng giao tiếp với database

const characterownModel = require('./model');

//Lấy thông tin danh sách tướng mà người chơi sở hữu
exports.getCharacterOwns = async () => {
    const charOwn = await characterownModel.find().populate('userID characterID');
    return charOwn;
  }