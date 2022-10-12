// tầng giao tiếp với database

const characterownModel = require('./model');
const characterModel = require('../characters/model');
const levelModel = require('../levels/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách tướng mà người chơi sở hữu
exports.getCharacterOwns = async () => {
  const charOwn = await characterownModel.find().populate('userID characterID');
  return charOwn;
}

exports.addFirstCharacter = async (username) => {
  const user = await userModel.findOne({ username: username });
  console.log("usser by username: ", user);
  const firstChar = await characterModel.findOne({ name: "Fire Knight"});
  console.log("first char: ", firstChar);
  const level = await levelModel.findOne({ level: 1, characterID: firstChar._id });
  console.log("level: ", level);
  const charOwn = new characterownModel({ userID: user._id, characterID: firstChar._id, levelID: level._id, status: 1});
  console.log("charOwn: ", charOwn);
  return await charOwn.save();
}