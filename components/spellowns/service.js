// tầng giao tiếp với database
const spellownModel = require('./model');
const spellModel = require('../spells/model');
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
  const spellOwn = new spellownModel({ userID: userID, spellID: spellID, amount: amount });
  console.log("spellOwn: " + spellOwn);
  return await spellOwn.save();
}

// Lấy spellOwns bằng userID
exports.getSpellOwnsByUID = async (uid) => {
  const spellOwns = await spellownModel.find({ userID: uid }).populate('userID spellID');
  return spellOwns;
}

exports.getSpellOwnBySpellID = async (id) => {
  const spellOwn = await spellownModel.findOne({ _id: id });
  return spellOwn;
}

exports.deleteSpellOwnBySpellID = async (id) => {
  await spellownModel.findByIdAndDelete(id);
}

exports.getSpellOwnsHaveByUID = async (UID) => {
  const spellOwnsHave = await spellownModel.find({ userID: UID });
  return spellOwnsHave;
}

exports.addNewSpellOwnByUIDAndSpellID = async (UID, spellID) => {
  const newSpellOwn = new spellownModel({ userID: UID, spellID: spellID, amount: 1 });
  return await newSpellOwn.save();
}

exports.getSpellOwnBySpellOwnID = async (spellOwnId) => {
  const spellOwn = await spellownModel.findOne({ _id: spellOwnId }).populate('spellID userID');
  return spellOwn;
}

exports.updateSpellOwnBySpellOwnId = async (spellOwnId, amount) => {
  await spellownModel.findByIdAndUpdate(spellOwnId, {amount: amount});
}

