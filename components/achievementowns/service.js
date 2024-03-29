// tầng giao tiếp với database

const achievementownModel = require('./model');
const achievementModel = require('../achievements/model');
const achievementLevelModel = require('../achievementlevels/model');
const userModel = require('../users/model');

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

exports.addAchievementByName = async (username, name) => {
  const user = await userModel.findOne({ username: username });
  const achievement = await achievementModel.findOne({ name: name});
  const achievementLevel = await achievementLevelModel.findOne({ achievementID: achievement._id, level: 1 });
  const achievementOwn = new achievementownModel({ userID: user._id, achievementID: achievement._id, achievementLevelID: achievementLevel._id, challengeAchieved: 0});
  console.log("achievementOwn: ", achievementOwn);
  return await achievementOwn.save();
}