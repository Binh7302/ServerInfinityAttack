// tầng giao tiếp với database
const spellownModel = require('./model');
const characterModel = require('../characters/model');
const levelModel = require('../levels/model');
const userModel = require('../users/model');

//Lấy thông tin danh sách tướng mà người chơi sở hữu

exports.getSpellOwns = async () => {
  const charOwn = await spellownModel.find().populate('userID spellID');
  return charOwn;
}

exports.getSpellByID = async (id) => {
  const charOwn = await spellownModel.findById(id);
  return charOwn;
}

exports.updateAmount = async (id, amount) => {
  const filter = { _id: id };
  const update = { amount: amount };
  const status = await spellownModel.updateOne(filter, update);
  if (status.acknowledged) {
    const spellOwn = await spellownModel.findById(id);
   return spellOwn
  }
  return [];
}
exports.addNewSpell = async (userID, spellID, amount) => {
  const charOwn = new spellownModel({ userID: userID, spellID: spellID, amount: amount });
  console.log(charOwn);
  return await charOwn.save();
}

// exports.getAmountSpell = async (characterID, userID) => {
//   const data = await levelModel.findOne({ level: level, characterID: characterID });
//   return data;
// }


