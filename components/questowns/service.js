// tầng giao tiếp với database
const questownModel = require('./model');
const questModel = require('../quests/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách nhiệm vụ của người chơi
exports.getQuestOwns = async () => {
  const questown = await questownModel.find().populate('userID questID');
  return questown;
}

// Lấy questown bằng userID
exports.getQuestOwnsByUserID = async (userID) => {
  const questown = await questownModel.find({ userID: userID }).populate('userID questID');
  return questown;
}

exports.getQuestOwnByID = async (id) => {
  const questown = await questownModel.findById(id);
  return questown;
}

exports.update = async (_id, questOwn) => {
  return await questownModel.findByIdAndUpdate(_id,questOwn);
}

exports.getQuestOwnByUserIDAndQuestID = async (userID, questID) => {
  const data = await questownModel.findOne({userID : userID, questID : questID});
  return data;
}

exports.addQuestByName = async (username, name) => {
  const user = await userModel.findOne({ username: username });
  const quest = await questModel.findOne({ name: name});
  const questOwn = new questownModel({ userID: user._id, questID: quest._id, status: 0, challengeAchieved: 0});
  console.log("questOwn: ", questOwn);
  return await questOwn.save();
}
