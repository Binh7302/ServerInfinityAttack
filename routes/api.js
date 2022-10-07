var express = require('express');
var router = express.Router();

const userController = require('../components/users/controller');
const characterOwnController = require('../components/characterowns/controller');
const characterController = require('../components/characters/controller');
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
    const { username, password, confirm_password, name} = req.body;
  
    // thực hiện kiểm tra đăng nhập
    const result = await userController.register(username, password, confirm_password, name);
    return res.json(result);
  });

  // http://localhost:3000/api/get-character-own
  router.post('/get-character-own', async function (req, res, next) {
    const {userID} = req.body;
    const data = await characterOwnController.getCharacterOwnById(userID);
    return res.json(data);
  });

  // http://localhost:3000/api/get-characters
  router.get('/get-characters', async function (req, res, next) {
    const data = await characterController.getCharacters();
    console.log(data);
    return res.json(data);
  });
module.exports = router;