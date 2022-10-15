// tầng giao tiếp với database

const characterownModel = require('./model');
const characterModel = require('../characters/model');
const levelModel = require('../levels/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách tướng mà người chơi sở hữu

exports.getCharacterOwnss = async (userID) => {
  const charOwn = await characterownModel.find({userID : userID});
}
exports.getCharacterOwns = async () => {
  const charOwn = await characterownModel.find().populate('userID characterID levelID');
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
//Lấy thông tin chi tiết 1 tướng
exports.getCharacterOwnByID = async (id) => {
  const charOwn = await characterownModel.findById(id);
  return charOwn;
}

exports.update = async (id, characterOwn) => {
  await characterownModel.findByIdAndUpdate(id, characterOwn);
}
exports.addNewCharacter = async (userID,characterID,status) => {
  const level = await levelModel.findOne({ level: 1, characterID: characterID });
  const charOwn = new characterownModel({ userID: userID, characterID: characterID, levelID: level._id, status: status});
  console.log(charOwn);
  return await charOwn.save();
}
// exports.changeStatusCharacterOwn = async (userID,_id) => {
//   const preCharacterOwn = await characterownModel.findOne({userID:userIDstatus : 1});
//   await characterownModel.updateOne({_id : preCharacterOwn._id},{status : 0});
//   return await characterownModel.updateOne({_id : _id,status : 1});
// }

