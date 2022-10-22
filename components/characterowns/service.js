// tầng giao tiếp với database

const characterownModel = require('./model');
const characterModel = require('../characters/model');
const charOwnModel = require('../characterowns/model');
const levelModel = require('../levels/model');
const userModel = require('../users/model');


exports.getCharacterOwnss = async (userID) => {
  const charOwn = await characterownModel.find({userID : userID});
  return charOwn;
}

//Lấy thông tin danh sách tướng mà người chơi sở hữu

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

exports.deleteCharOwnById = async(id) => {
  await characterownModel.findByIdAndDelete(id);
}

exports.getCharOwnsById = async(id) => {
  const charOwns = await characterownModel.find({userID: id}).populate('userID characterID levelID');
  return charOwns;
}

exports.getCharOwnById = async(id) => {
  const charOwn = await characterownModel.findOne({_id: id}).populate('userID characterID levelID');
  return charOwn;
}

exports.updateLevel = async(id, levelID) => {
   await characterownModel.findByIdAndUpdate(id, {levelID: levelID}).populate('userID characterID');
}

exports.setUsingForFirstChar = async(UID) => {
  const firstChar = await characterModel.findOne({ name: "Fire Knight"});
  const charOwn = await charOwnModel.findOne({userID: UID, characterID: firstChar._id});
  await charOwnModel.findByIdAndUpdate(charOwn._id,{status: 1});
}
