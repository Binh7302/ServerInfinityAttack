var express = require('express');
var router = express.Router();

const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller');
const levelController = require('../components/levels/controller');
const spellController = require('../components/spells/controller');
const spellOwnController = require('../components/spellowns/controller');
const questController = require('../components/quests/controller');
const questOwnController = require('../components/questowns/controller');
const giftController = require('../components/gifts/controller');
const giftOwnController = require('../components/giftowns/controller');
const achievementController = require('../components/achievements/controller');
const achievementLevelController = require('../components/achievementlevels/controller');
const achievementOwnController = require('../components/achievementowns/controller');

// http://localhost:3000/inventoryClient/post-character-own
router.post('/post-character-own', async function (req, res, next) {
  const { userID } = req.body;
  console.log(userID);
  const data = await characterOwnController.getCharacterOwnById(userID);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-character-own
router.post('/update-character-own', async function (req, res, next) {
  const { characterID, level, characterOwnID } = req.body;
  const levelData = await levelController.getLevelUpdate(characterID, level);
  let data = await characterOwnController.getCharacterOwn(characterOwnID);
  data.levelID = levelData._id
  await characterOwnController.update(characterOwnID, data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-status-character-own
router.post('/update-status-character-own', async function (req, res, next) {
  //cách khác
  //findOne với điều kiện userID, status = 1, đc data, thay đổi data.status = 0 ( cách tìm thông thường khi 2 khóa chính là userID và characterID)
  const { characterOwnIDOld, characterOwnIDNew } = req.body;
  // character old là character đang có status = 1 
  const dataOld = await characterOwnController.getCharacterOwn(characterOwnIDOld);
  dataOld.status = 0;
  await characterOwnController.update(characterOwnIDOld, dataOld);
  // character new là character đang có status = 0 
  let dataNew = await characterOwnController.getCharacterOwn(characterOwnIDNew);
  dataNew.status = 1;
  const data = await characterOwnController.update(characterOwnIDNew, dataNew);
  return res.json(data);
});
// http://localhost:3000/inventoryClient/get-spells
router.get('/get-spells', async function (req, res, next) {
  const data = await spellController.getSpells();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/post-spells-own
router.post('/post-spells-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await spellOwnController.getSpellOwnByUserId(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-character-own
router.get('/get-character-own', async function (req, res, next) {
  const data = await characterOwnController.getCharacterOwnById("6345a02f1d8f5da83dc48826");
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-characters
router.get('/get-characters', async function (req, res, next) {
  const data = await questController.getQuests();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-spells-own
router.get('/get-spells-own', async function (req, res, next) {
  const data = await spellOwnController.getSpellOwnByUserId("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});




// http://localhost:3000/inventoryClient/get-quests
router.get('/get-quests', async function (req, res, next) {
  const data = await questController.getQuests();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-quests-own
router.get('/get-quests-own', async function (req, res, next) {
  const data = await questOwnController.getQuestOwnsByUserID("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-gifts
router.get('/get-gifts', async function (req, res, next) {
  const data = await giftController.getGifts();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-gifts-own
router.get('/get-gifts-own', async function (req, res, next) {
  const data = await giftOwnController.getQuestGiftsByUserID("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});



// http://localhost:3000/inventoryClient/post-quests-own
router.post('/post-quests-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await questOwnController.getQuestOwnsByUserID(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-status-quest-own
router.post('/update-status-quest-own', async function (req, res, next) {
  const { questOwnID } = req.body;
  // quest own đang có status = 0 
  const quest = await questOwnController.getQuestOwnsByID(questOwnID);
  quest.status = 1;
  const data = await questOwnController.update(questOwnID, quest);
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-all-challenge-achieved-quest-by-name
router.post('/update-all-challenge-achieved-quest-by-name', async function (req, res, next) {
  const { login, single3time, multi1time, kill50enemy, kill5boss, use3spell,
    challengeAchievedLogIn, challengeAchievedSingle3Time, challengeAchievedMulti1Time, challengeAchievedKill50Enemy,
    challengeAchievedKill5Boss, challengeAchievedUse3Spell, userID } = req.body;

  //update challenge achieved login
  const questLogIn = await questController.getQuestByName(login);
  const questLogInID = questLogIn._id;
  let dataLogIn = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questLogInID);
  dataLogIn.challengeAchieved = challengeAchievedLogIn;
  await questOwnController.update(dataLogIn._id, dataLogIn);

  //update challenge achieved single3time
  const questSingle3Time = await questController.getQuestByName(single3time);
  const questSingle3TimeID = questSingle3Time._id;
  let dataSingle3Time = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questSingle3TimeID);
  dataSingle3Time.challengeAchieved = challengeAchievedSingle3Time;
  await questOwnController.update(dataSingle3Time._id, dataSingle3Time);

  //update challenge achieved multi1time
  const questMulti1Time = await questController.getQuestByName(multi1time);
  const questMulti1TimeID = questMulti1Time._id;
  let dataMulti1Time = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questMulti1TimeID);
  dataMulti1Time.challengeAchieved = challengeAchievedMulti1Time;
  await questOwnController.update(dataMulti1Time._id, dataMulti1Time);

  //update challenge achieved kill50enemy
  const questKill50Enemy = await questController.getQuestByName(kill50enemy);
  const questKill50EnemyID = questKill50Enemy._id;
  let dataKill50Enemy = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questKill50EnemyID);
  dataKill50Enemy.challengeAchieved = challengeAchievedKill50Enemy;
  await questOwnController.update(dataKill50Enemy._id, dataKill50Enemy);

  //update challenge achieved kill5boss
  const questKill5Boss = await questController.getQuestByName(kill5boss);
  const questKill5BossID = questKill5Boss._id;
  let dataKill5Boss = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questKill5BossID);
  dataKill5Boss.challengeAchieved = challengeAchievedKill5Boss;
  await questOwnController.update(dataKill5Boss._id, dataKill5Boss);

  //update challenge achieved use3spell
  const questUse3Spell= await questController.getQuestByName(use3spell);
  const questUse3SpellID = questUse3Spell._id;
  let dataUse3Spell = await questOwnController.getQuestOwnByUserIDAndQuestID(userID, questUse3SpellID);
  dataUse3Spell.challengeAchieved = challengeAchievedUse3Spell;
  await questOwnController.update(dataUse3Spell._id, dataUse3Spell);

  return res.json(dataLogIn, dataSingle3Time, dataMulti1Time, dataKill50Enemy, dataKill5Boss, dataUse3Spell);
});

// http://localhost:3000/inventoryClient/post-gifts-own
router.post('/post-gifts-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await giftOwnController.getQuestGiftsByUserID(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-status-gift-own
router.post('/update-status-gift-own', async function (req, res, next) {
  const { giftOwnID } = req.body;
  // gift own đang có status = 0 
  const gift = await giftOwnController.getGiftOwnsByID(giftOwnID);
  gift.status = 1;
  const data = await giftOwnController.update(giftOwnID, gift);
  console.log(data);
  return res.json(data);
});



// http://localhost:3000/inventoryClient/get-achievements
router.get('/get-achievements', async function (req, res, next) {
  const data = await achievementController.getAchievements();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-achievement-levels
router.get('/get-achievement-levels', async function (req, res, next) {
  const data = await achievementLevelController.getAchievementLevel();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-achievements-own
router.get('/get-achievements-own', async function (req, res, next) {
  const data = await achievementOwnController.getAchievementOwnByUserId("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/post-achievements-own
router.post('/post-achievements-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await achievementOwnController.getAchievementOwnByUserId(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-level-achievement-own
router.post('/update-level-achievement-own', async function (req, res, next) {
  const { achievementID, level, achievementOwnID } = req.body;
  const levelData = await achievementLevelController.getAchievementLevelUpdate(achievementID, level);
  let data = await achievementOwnController.getAchievementOwnByID(achievementOwnID);
  data.achievementLevelID = levelData._id
  await achievementOwnController.update(achievementOwnID, data);
  return res.json(data);
});


// http://localhost:3000/inventoryClient/update-challenge-achieved-achievement-by-name
router.post('/update-challenge-achieved-by-name', async function (req, res, next) {
  const { name, challengeAchieved, userID } = req.body;
  const achievement = await achievementController.getAchievementByName(name);
  const achievementID = achievement._id;
  let data = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementID);
  data.challengeAchieved = challengeAchieved;
  await achievementOwnController.update(data._id, data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/update-all-challenge-achieved-achievement-by-name
router.post('/update-all-challenge-achieved-achievement-by-name', async function (req, res, next) {
  const { characterown, killenemy, killboss, singleplay, multiplay, addfriend,
    challengeAchievedCharacterOwn, challengeAchievedKillEnemy, challengeAchievedKillBoss, challengeAchievedSinglePlay, challengeAchievedMultiPlay,
    challengeAchievedAddFriend, userID } = req.body;

  //update challenge achieved characterown
  const achievementCharacterOwn = await achievementController.getAchievementByName(characterown);
  const achievementCharacterOwnID = achievementCharacterOwn._id;
  let dataCharacterOwn = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementCharacterOwnID);
  dataCharacterOwn.challengeAchieved = challengeAchievedCharacterOwn;
  await achievementOwnController.update(dataCharacterOwn._id, dataCharacterOwn);

  //update challenge achieved killenemy
  const achievementKillEnemy = await achievementController.getAchievementByName(killenemy);
  const achievementKillEnemyID = achievementKillEnemy._id;
  let dataKillEnemy = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementKillEnemyID);
  dataKillEnemy.challengeAchieved = challengeAchievedKillEnemy;
  await achievementOwnController.update(dataKillEnemy._id, dataKillEnemy);

  //update challenge achieved killboss
  const achievementKillBoss = await achievementController.getAchievementByName(killboss);
  const achievementKillBossID = achievementKillBoss._id;
  let dataKillBoss = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementKillBossID);
  dataKillBoss.challengeAchieved = challengeAchievedKillBoss;
  await achievementOwnController.update(dataKillBoss._id, dataKillBoss);

  //update challenge achieved singleplay
  const achievementSinglePlay = await achievementController.getAchievementByName(singleplay);
  const achievementSinglePlayID = achievementSinglePlay._id;
  let dataSinglePlay = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementSinglePlayID);
  dataSinglePlay.challengeAchieved = challengeAchievedSinglePlay;
  await achievementOwnController.update(dataSinglePlay._id, dataSinglePlay);

  //update challenge achieved multiplay
  const achievementMultiPlay = await achievementController.getAchievementByName(multiplay);
  const achievementMultiPlayID = achievementMultiPlay._id;
  let dataMultiPlay = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementMultiPlayID);
  dataMultiPlay.challengeAchieved = challengeAchievedMultiPlay;
  await achievementOwnController.update(dataMultiPlay._id, dataMultiPlay);

  //update challenge achieved addfriend
  const achievementAddFriend = await achievementController.getAchievementByName(addfriend);
  const achievementAddFriendID = achievementAddFriend._id;
  let dataAddFriend = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementAddFriendID);
  dataAddFriend.challengeAchieved = challengeAchievedAddFriend;
  await achievementOwnController.update(dataAddFriend._id, dataAddFriend);

  return res.json(dataCharacterOwn, dataKillEnemy, dataKillBoss, dataSinglePlay, dataMultiPlay, dataAddFriend);
});
module.exports = router;