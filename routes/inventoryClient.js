var express = require('express');
var router = express.Router();

const characterController = require('../components/characters/controller');
const characterOwnController = require('../components/characterowns/controller');
const levelController = require('../components/levels/controller');

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
  await characterOwnController.update(characterOwnID,data);
  return res.json(data);
});

// http://localhost:3000/inventoryClient/get-character-own
router.get('/get-character-own', async function (req, res, next) {
  const data = await characterOwnController.getCharacterOwnById("6344e7bf12a13086ef55c19a");
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