// tầng giao tiếp với database
const giftownModel = require('./model');
const giftModel = require('../gifts/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách gift của người chơi
exports.getQuestOwns = async () => {
  const giftown = await giftownModel.find().populate('userID giftID');
  return giftown;
}

// Lấy gift own bằng userID
exports.getQuestOwnsByUserID = async (userID) => {
  const giftown = await giftownModel.find({ userID: userID }).populate('userID giftID');
  return giftown;
}

exports.getQuestOwnByID = async (id) => {
  const giftown = await giftownModel.findById(id);
  return giftown;
}

exports.update = async (_id, giftown) => {
  return await giftownModel.findByIdAndUpdate(_id,giftown);
}

exports.addGiftQuestByName = async (username, name) => {
  const user = await userModel.findOne({ username: username });
  const gift = await giftModel.findOne({ name: name});
  const giftOwn = new giftownModel({ userID: user._id, giftID: gift._id, status: 0});
  console.log("giftOwn: ", giftOwn);
  return await giftOwn.save();
}

