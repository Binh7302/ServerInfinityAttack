var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller')
const spellController = require('../components/spells/controller');
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

  // thực hiện kiểm tra đăng nhập
  const result = await userController.register(username, password, confirm_password, name);
  console.log("result: ", result);
  if(result == "Đăng kí thành công"){
    await characterOwnController.addFirstCharacter(username);
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
  const data = await characterOwnController.getCharacterOwnById(userID);
  return res.json(data);
});

// http://localhost:3000/api/get-characters
router.post('/getcharacters', async function (req, res, next) {
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

module.exports = router;