var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller')
const spellController = require('../components/spells/controller');
const spellOwnController = require('../components/spellowns/controller');
const questOwnController = require('../components/questowns/controller');
const giftOwnController = require('../components/giftowns/controller');
const achievementOwnController = require('../components/achievementowns/controller');
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
  const { username, password, confirm_password, name } = req.body;
  const login = "login", single3time = "single3time", multi1time = "multi1time",
   kill50enemy = "kill50enemy", kill5boss = "kill5boss", use3spell = "use3spell";
  const moc1 = "moc1", moc2 = "moc2", moc3 = "moc3", moc4 = "moc4";
  const characterown = "characterown", killenemy = "killenemy", killboss = "killboss",
   singleplay = "singleplay", multiplay = "multiplay", addfriend = "addfriend";
  // thực hiện kiểm tra đăng nhập
  const result = await userController.register(username, password, confirm_password, name);
  console.log("result: ", result);
  if(result == "Đăng kí thành công"){
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


// http://localhost:3000/api/get-character-own
router.post('/get-character-own', async function (req, res, next) {
  const { userID } = req.body;
  const data = await characterOwnController.getCharacterOwnById(userID);
  return res.json(data);
});

// http://localhost:3000/api/get-characters
router.get('/get-characters', async function (req, res, next) {
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
// http://localhost:3000/api/get-Characters
router.post('/getCharacters', async function (req, res, next) {
  const data = await characterController.getCharacters();
  console.log(data);
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
  const { id } = req.body;
  console.log("id: ", id);
  const name = await characterController.getUsingCharNameById(id);
  console.log("name: ", name);
  return res.json(name);
});
// http://localhost:3000/api/getTop5Users
router.get('/getTop5Users', async function (req, res, next) {
  const top5Users = await userController.getTop5Users();
  console.log("Route api top5users: " + top5Users);
  return res.json(top5Users);
});
module.exports = router;