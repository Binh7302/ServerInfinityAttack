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
  const questown = await questownModel.find({ userID: userID }).populate('userID questID').sort('status');
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

exports.updateDailyQuest = async () => {
  let questOwnList = await questownModel.find();
  // console.log("-----------------Quest Own List Before: "+questOwnList);
  for(let i = 0; i < questOwnList.length; i++) {
    var id = questOwnList[i]._id;
    questOwnList[i].challengeAchieved = 0;
    questOwnList[i].status = 0;
    await questownModel.findByIdAndUpdate(id, questOwnList[i]);
  }
  //console.log("-----------------Quest Own List After: "+questOwnList);
  console.log("Reset Daily Quest Complete");
}