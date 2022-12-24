var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');

const userController = require('../components/users/controller');
const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller')
const spellController = require('../components/spells/controller');
const spellOwnController = require('../components/spellowns/controller');
const questOwnController = require('../components/questowns/controller');
const giftOwnController = require('../components/giftowns/controller');
const achievementOwnController = require('../components/achievementowns/controller');
const levelController = require('../components/levels/controller');
const questController = require('../components/quests/controller');
const giftController = require('../components/gifts/controller');
const achievementController = require('../components/achievements/controller');
const achievementLevelController = require('../components/achievementlevels/controller');
const friendsController = require("../components/friends/controller");

let day = 0;
// http://localhost:3000/api/login
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  // thực hiện kiểm tra đăng nhập
  const result = await userController.login(username, password);
  console.log(result);
  return res.json(result);
});

// http://localhost:3000/api/register
router.post('/register', async function (req, res, next) {
  const { username, password, name } = req.body;
  const login = "login", single3time = "single3time", multi1time = "multi1time",
   kill50enemy = "kill50enemy", kill5boss = "kill5boss", use3spell = "use3spell";
  const moc1 = "moc1", moc2 = "moc2", moc3 = "moc3", moc4 = "moc4";
  const characterown = "characterown", killenemy = "killenemy", killboss = "killboss",
   singleplay = "singleplay", multiplay = "multiplay", addfriend = "addfriend";
  // thực hiện kiểm tra đăng nhập
  const result = await userController.register(username, password, name);
  console.log("result: ", result);
  if(result == "Sign up successfully"){
    //add first character
    await characterOwnController.addFirstCharacter(username);

    //add quests
    await questOwnController.addQuestByName(username, login);
    await questOwnController.addQuestByName(username, single3time);
    await questOwnController.addQuestByName(username, multi1time);
    await questOwnController.addQuestByName(username, kill50enemy);
    await questOwnController.addQuestByName(username, kill5boss);
    await questOwnController.addQuestByName(username, use3spell);

    //add giftquests
    await giftOwnController.addGiftQuestByName(username, moc1);
    await giftOwnController.addGiftQuestByName(username, moc2);
    await giftOwnController.addGiftQuestByName(username, moc3);
    await giftOwnController.addGiftQuestByName(username, moc4);

    //add achievements
    await achievementOwnController.addAchievementByName(username,characterown);
    await achievementOwnController.addAchievementByName(username,killenemy);
    await achievementOwnController.addAchievementByName(username,killboss);
    await achievementOwnController.addAchievementByName(username,singleplay);
    await achievementOwnController.addAchievementByName(username,multiplay);
    await achievementOwnController.addAchievementByName(username,addfriend);
  }
  return res.json(result);
});

// http://localhost:3000/api/getUserById
router.post('/getUserById', async function (req, res, next) {
  const { id } = req.body;
  const user = await userController.getUserById(id);
  console.log("user api: ", user);
  return res.json(user);
});

// http://localhost:3000/api/getUsers
router.post('/getUsers', async function (req, res, next) {
  const user = await userController.getUsers();
  console.log("user api: ", user);
  return res.json(user);
});


// http://localhost:3000/api/get-character-own
router.post('/get-character-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await characterOwnController.getCharacterOwnById(userID);
  return res.json(data);
});

// http://localhost:3000/api/get-characters
router.post('/get-characters', async function (req, res, next) {
  const data = await characterController.getCharacters();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/getUserByName
router.post('/getUserByName', async function (req, res, next) {
  const { name } = req.body;
  const user = await userController.getUserByName(name);
  return res.json(user);
});
// http://localhost:3000/api/updateGoldUser
router.post('/updateGoldUser', async function (req, res, next) {
  const { _id, gold } = req.body;
  const user = await userController.updateGoldUser(_id, gold);
  return res.json(user);
});
// http://localhost:3000/api/updateGemUser
router.post('/updateGemUser', async function (req, res, next) {
  const { _id, gem } = req.body;
  const user = await userController.updateGemUser(_id, gem);
  return res.json(user);
});
//http://localhost:3000/api/get-character-own
router.post('/getcharacterown', async function (req, res, next) {
  const { userID } = req.body;
  const data = await characterOwnController.getCharacterOwnBy_Id(userID);
  return res.json(data);
});
// http://localhost:3000/api/addNewCharacter
router.post('/addNewCharacter', async function (req, res, next) {
  const {userID,characterID,status} = req.body;
  const data = await characterOwnController.addNewCharacter(userID,characterID,status);
  console.log(data);
  return res.json(data);
});
// http://localhost:3000/api/changeStatusCharacterOwn
router.post('/changeStatusCharacterOwn', async function (req, res, next) {
  const {_id} = req.body;
  const data = await characterOwnController.changeStatusCharacterOwn(_id);
  console.log(data);
  return res.json(data);
});


// https://localhost:3000/api/getSpells
router.post('/getSpells',async function(req,res,next){
  const data = await spellController.getSpells();
  console.log(data);
  return res.json(data);
})

// https://localhost:3000/api/getSpellOwn
router.post('/getSpellOwn',async function(req,res,next){
  const {userID} = req.body;
  const data = await spellOwnController.getSpellOwnsById(userID);
  console.log(data);
  return res.json(data);
})

// https://localhost:3000/api/updateAmountSpell
router.post('/updateAmountSpell',async function(req,res,next){
  const {_id,amount} = req.body;
  console.log(_id,amount);
  const data = await spellOwnController.updateAmount(_id,amount);
  console.log(data);
  return res.json(data);
})
// https://localhost:3000/api/updateAmountSpell
router.post('/addNewSpellOwn',async function(req,res,next){
  const {userID,spellID,amount} = req.body;
  const data = await spellOwnController.addNewSpellOwn(userID,spellID,amount);
  console.log(data);
  return res.json(data);
})
// http://localhost:3000/api/getUsingCharNameById
router.post('/getUsingCharNameById', async function (req, res, next) {
  const { userID } = req.body;
  const name = await characterController.getUsingCharNameById(userID);
  console.log("name: ", name);
  return res.json(name);
});



// http://localhost:3000/api/requestAnUser
router.post('/requestAnUser', async function (req, res, next) {
  const { userReq, userRes } = req.body;
  var data = await friendsController.getRelationship(userReq, userRes);
  if (data == null) {
      console.log("Đã gửi yêu cầu");
      data = await friendsController.addRelationship(userReq, userRes, 0);
  }
  else if (data.status == 1) {
      console.log("Đã kết bạn rồi")
  }
  else if (data.status == 0) {
      data = {};
      console.log("Đã gửi yêu cầu trước đó rồi")
  }
  return res.json(data);
});

// http://localhost:3000/api/addTrueFriend
router.post('/addTrueFriend', async function (req, res, next) {
  const { id } = req.body;
  const data = await friendsController.addTrueFriend(id, 1);
  return res.json(data);
});
// http://localhost:3000/api/findRespone
router.post('/findRespone', async function (req, res, next) {
  const { userRes } = req.body;
  const data = await friendsController.findRespone(userRes);
  return res.json(data);
});
// http://localhost:3000/api/getAllFriends
router.post('/getAllFriends', async function (req, res, next) {
  const { userID } = req.body;
  const data = await friendsController.getAllFriends(userID);
  return res.json(data);
});
// http://localhost:3000/api/deleteAnFriend
router.post('/deleteAFriend', async function (req, res, next) {
  const { id } = req.body;
  const data = await friendsController.deleteAFriend(id);
  return res.json(data);
});
// http://localhost:3000/api/checkExistingFriend
router.post('/checkExistingFriend', async function (req, res, next) {
  const { userID } = req.body;
  const user = await friendsController.checkExistingFriend(userID);
  return res.json(user);
});


// http://localhost:3000/api/post-character-own
router.post('/post-character-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await characterOwnController.getCharacterOwnById(userID);
  return res.json(data);
});

// http://localhost:3000/api/update-character-own
router.post('/update-character-own', async function (req, res, next) {
  const { characterID, level, characterOwnID } = req.body;
  const levelData = await levelController.getLevelUpdate(characterID, level);
  let data = await characterOwnController.getCharacterOwn(characterOwnID);
  data.levelID = levelData._id
  await characterOwnController.update(characterOwnID, data);
  return res.json(data);
});

// http://localhost:3000/api/update-status-character-own
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
// http://localhost:3000/api/get-spells
router.get('/get-spells', async function (req, res, next) {
  const data = await spellController.getSpells();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/post-spells-own
router.post('/post-spells-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await spellOwnController.getSpellOwnsByUId(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-character-own
router.get('/get-character-own', async function (req, res, next) {
  const data = await characterOwnController.getCharacterOwnById("6345a02f1d8f5da83dc48826");
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-spells-own
router.get('/get-spells-own', async function (req, res, next) {
  const data = await spellOwnController.getSpellOwnByUserId("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});




// http://localhost:3000/api/get-quests
router.get('/get-quests', async function (req, res, next) {
  const data = await questController.getQuests();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-quests-own
router.get('/get-quests-own', async function (req, res, next) {
  const data = await questOwnController.getQuestOwnsByUserID("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-gifts
router.get('/get-gifts', async function (req, res, next) {
  const data = await giftController.getGifts();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-gifts-own
router.get('/get-gifts-own', async function (req, res, next) {
  const data = await giftOwnController.getQuestGiftsByUserID("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});



// http://localhost:3000/api/post-quests-own
router.post('/post-quests-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await questOwnController.getQuestOwnsByUserID(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/update-status-quest-own
router.post('/update-status-quest-own', async function (req, res, next) {
  const { questOwnID } = req.body;
  // quest own đang có status = 0 
  const quest = await questOwnController.getQuestOwnsByID(questOwnID);
  quest.status = 1;
  const data = await questOwnController.update(questOwnID, quest);
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/update-all-challenge-achieved-quest-by-name
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

// http://localhost:3000/api/post-gifts-own
router.post('/post-gifts-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await giftOwnController.getQuestGiftsByUserID(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/update-status-gift-own
router.post('/update-status-gift-own', async function (req, res, next) {
  const { giftOwnID } = req.body;
  // gift own đang có status = 0 
  const gift = await giftOwnController.getGiftOwnsByID(giftOwnID);
  gift.status = 1;
  const data = await giftOwnController.update(giftOwnID, gift);
  console.log(data);
  return res.json(data);
});



// http://localhost:3000/api/get-achievements
router.get('/get-achievements', async function (req, res, next) {
  const data = await achievementController.getAchievements();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-achievement-levels
router.get('/get-achievement-levels', async function (req, res, next) {
  const data = await achievementLevelController.getAchievementLevel();
  console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/get-achievements-own
router.get('/get-achievements-own', async function (req, res, next) {
  const data = await achievementOwnController.getAchievementOwnByUserId("6345a02f1d8f5da83dc48826");
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/post-achievements-own
router.post('/post-achievements-own', async function (req, res, next) {
  const { userID } = req.body;
  console.log("uID: " + userID);
  const data = await achievementOwnController.getAchievementOwnByUserId(userID);
  // console.log(data);
  return res.json(data);
});

// http://localhost:3000/api/update-level-achievement-own
router.post('/update-level-achievement-own', async function (req, res, next) {
  const { achievementID, level, achievementOwnID } = req.body;
  const levelData = await achievementLevelController.getAchievementLevelUpdate(achievementID, level);
  let data = await achievementOwnController.getAchievementOwnByID(achievementOwnID);
  data.achievementLevelID = levelData._id
  await achievementOwnController.update(achievementOwnID, data);
  return res.json(data);
});


// http://localhost:3000/api/update-challenge-achieved-achievement-by-name
router.post('/update-challenge-achieved-by-name', async function (req, res, next) {
  const { name, challengeAchieved, userID } = req.body;
  const achievement = await achievementController.getAchievementByName(name);
  const achievementID = achievement._id;
  let data = await achievementOwnController.getAchievementOwnByUserIDAndAchievementID(userID, achievementID);
  data.challengeAchieved = challengeAchieved;
  await achievementOwnController.update(data._id, data);
  return res.json(data);
});

// http://localhost:3000/api/update-all-challenge-achieved-achievement-by-name
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

// http://localhost:3000/api/getLevelByCharNameAndUid
router.post('/getLevelByCharNameAndUid', async function (req, res, next) {
  const { charName, uid } = req.body;
  console.log("charname1: " + charName + " uid1: " + uid);
  const level = await levelController.getLevelByCharNameAndUid(charName, uid);
  console.log("level ngoai api: " + level);
  return res.json(level);
});

// http://localhost:3000/api/resetDaily
router.get('/resetDaily', async function (req, res, next) {
  await questOwnController.resetDailyQuest();
  await giftOwnController.resetDailyGift();
  return ;
});

//Reset ở khoảng thời gian định kỳ (mỗi 23h59m59s)
schedule.scheduleJob('*/59 */59 */23 * * *', () => {
  ResetDaily();
  day++;
  console.log("Day " + day + " reset daily completed");
})

async function ResetDaily() {
  await questOwnController.resetDailyQuest();
  await giftOwnController.resetDailyGift();
}

// http://localhost:3000/api/changePassword
router.post('/changePassword', async function (req,res, next) {
  const { uid, pass, newPass } = req.body;
  const result = await userController.changePassword(uid, pass, newPass);
  console.log("result change password: " + result);
  return res.json(result);
});

// http://localhost:3000/api/sendCodeAddEmail
router.post('/sendCodeAddEmail', async function (req, res, next) {
  const { uid, email } = req.body;
  const result = await userController.sendCodeAddEmail(uid, email);
  console.log("result send code add email: " + result);
  return res.json(result);
});

// http://localhost:3000/api/addEmail
router.post('/addEmail', async function (req, res, next) {
  const { token } = req.body;
  const result = await userController.addEmail( token);
  console.log("result add email: " , result);
  return res.json(result);
});

// http://localhost:3000/api/sendCodeChangeEmail
router.post('/sendCodeChangeEmail', async function (req, res, next) {
  const { uid } = req.body;
  const result = await userController.sendCodeChangeEmail(uid);
  console.log("result send code change email: " + result);
  return res.json(result);
});

// http://localhost:3000/api/changeEmail
router.post('/changeEmail', async function (req, res, next) {
  const { newEmail, token } = req.body;
  const result = await userController.changeEmail(newEmail, token);
  console.log("result change email: " , result);
  return res.json(result);
});

// http://localhost:3000/api/sendCodeForgotPass
router.post('/sendCodeForgotPass', async function (req, res, next) {
  const { email } = req.body;
  const result = await userController.sendCodeForgotPass(email);
  console.log("result send code forgot pass: " + result);
  return res.json(result);
});

// http://localhost:3000/api/forgotPass
router.post('/forgotPass', async function (req, res, next) {
  const { newPass, token } = req.body;
  const result = await userController.forgotPass(newPass, token);
  console.log("result forgot pass: " , result);
  return res.json(result);
});

// http://localhost:3000/api/generateRememberToken
router.post('/generateRememberToken', async function (req, res, next) {
  const { uid } = req.body;
  const result = await userController.generateRememberToken(uid);
  console.log("result remember token: " , result);
  return res.json(result);
});

// http://localhost:3000/api/checkRememberToken
router.post('/checkRememberToken', async function (req, res, next) {
  const { token } = req.body;
  const result = await userController.checkRememberToken(token);
  console.log("result forgot pass: " , result);
  return res.json(result);
});

// http://localhost:3000/api/checkRememberToken
router.post('/SetOffline', async function (req, res, next) {
  const { uid } = req.body;
  await userController.SetOffline(uid);
});

module.exports = router;