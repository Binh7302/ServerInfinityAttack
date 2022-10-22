var express = require('express');
var router = express.Router();

const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller');
const levelController = require('../components/levels/controller');
const spellController = require('../components/spells/controller');
const spellOwnController = require('../components/spellowns/controller');

// http://localhost:3000/inventoryClient/post-character-own
router.post('/post-character-own', async function (req, res, next) {
  const { userID } = req.body;
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
  console.log("old: " + characterOwnIDOld + " new: " + characterOwnIDNew);
  // character old là character đang có status = 1 
  let dataOld = await characterOwnController.getCharacterOwn(characterOwnIDOld);
  dataOld.status = 0;
  await characterOwnController.update(characterOwnIDOld, dataOld);
  // character new là character đang có status = 0 
  let dataNew = await characterOwnController.getCharacterOwn(characterOwnIDNew);
  dataNew.status = 1;
  await characterOwnController.update(characterOwnIDNew, dataNew);
  return ;
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
  const data = await characterController.getCharacters();
  console.log(data);
  return res.json(data);
});

module.exports = router;