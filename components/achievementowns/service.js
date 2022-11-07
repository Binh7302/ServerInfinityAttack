// tầng giao tiếp với database

const achievementownModel = require('./model');
const characterModel = require('../characters/model');
const charOwnModel = require('../characterowns/model');
const levelModel = require('../levels/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách thành tựu mà người chơi sở hữu
exports.getAchievementOwnByUserID = async (userID) => {
  const data = await achievementownModel.find({userID : userID});
  return data;
}

//Lấy thông tin danh sách tất cả thành tựu
exports.getAchievementOwns = async () => {
  const data = await achievementownModel.find().populate('userID achievementID achievementLevelID');
  return data;
}

//Lấy thông tin chi tiết 1 tướng
exports.getAchievementOwnByID = async (id) => {
  const data = await achievementownModel.findById(id);
  return data;
}

exports.getAchievementOwnByUserIDAndAchievementID = async (userID, achievementID) => {
  const data = await achievementownModel.findOne({userID : userID, achievementID : achievementID});
  return data;
}

exports.update = async (_id, achievementown) => {
  return await achievementownModel.findByIdAndUpdate(_id,achievementown);
}

