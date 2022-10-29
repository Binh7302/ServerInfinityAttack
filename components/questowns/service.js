// tầng giao tiếp với database
const questownModel = require('./model');


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


