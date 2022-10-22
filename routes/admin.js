var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const adminController = require('../components/admins/controller');

const userController = require('../components/users/controller');

const charController = require('../components/characters/controller');

const charOwnController = require('../components/characterowns/controller');

const spellController = require('../components/spells/controller');

const spellOwnController = require('../components/spellowns/controller');

const levelController = require('../components/levels/controller');

const authentication = require('../middle/authentication');

// Login
router.get('/login-admin', [authentication.checkLoginAdmin], function (req, res, next) {
  res.render('login-admin');
});

router.post('/login-admin', async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username + " " + password);
  // thực hiện kiểm tra đăng nhập
  const result = await adminController.loginAdmin(username, password);
  console.log("result: " + result);
  if (result) {
    // secret key
    const token = jwt.sign({ id: result._id, username: result.username }, 'admin', { expiresIn: '20m' });
    req.session.token = token;
    // nếu đúng chuyển qua trang sản phẩm
    res.redirect('/admin/home-admin');
  } else {
    // nếu sai quay trở lại đăng nhập
    res.redirect('/admin/login-admin');
  }
});

// Log out
router.get('/logout-admin', [authentication.checkLoginAdmin], function (req, res, next) {
  req.session.destroy(function (err) {
    // nếu đăng xuất thành công chuyển qua đăng nhập
    res.redirect('/admin/login-admin');
  })
});

// Register
router.get('/register-admin', function (req, res, next) {
  res.render('register-admin');
});

router.post('/register-admin', async function (req, res, next) {
  const { username, password, confirm_password, name } = req.body;

  // thực hiện kiểm tra đăng nhập
  const result = await adminController.registerAdmin(username, password, confirm_password, name);
  console.log("result: " + result);
  if (result != null) {
    // nếu đúng chuyển qua trang đăng nhập
    res.redirect('/admin/login-admin');
  } else {
    // nếu sai vẫn ở trang đăng kí
    res.redirect('/admin/register-admin');
  }
});

// Home
router.get('/home-admin', [authentication.checkLoginAdmin], async function (req, res, next) {
  const users = await userController.getUsers();
  res.render('home-admin', { users: users });
});

// User Edit
router.get('/:id/userEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const user = await userController.getUserById(id);
  res.render('detail_user', { user: user });
});

router.post('/:id/userEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  let { gem, gold } = req.body;
  if (gold == null || gem == null || gold < 0 || gem < 0 || gem.trim() == "" || gold.trim() == "") {
    await userController.updateGemUser(id, 0);
    await userController.updateGoldUser(id, 0);
  } else {
    await userController.updateGemUser(id, gem);
    await userController.updateGoldUser(id, gold);
  }
  res.redirect('/admin/home-admin');
});

// charOwn
router.get('/:id/charOwn', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const charOwns = await charOwnController.getCharOwnsById(id);
  res.render('charOwn', { charOwns: charOwns, UID: id });
});

// charOwn delete
router.post('/:id/charOwnDelete/:UID', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id, UID } = req.params;
  const charOwn = await charOwnController.getCharOwnById(id);
  if(charOwn.status == 1){
    await charOwnController.setUsingForFirstChar(UID);
  }
  if(charOwn.characterID.name != "Fire Knight"){
    await charOwnController.deleteCharOwnById(id);
    const charOwns = await charOwnController.getCharOwnsById(UID);
    console.log("charown ",charOwns);
    res.render('charOwn', { charOwns: charOwns, UID: UID });
  }
});

// charOwn add
router.get('/:id/addCharOwn', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const chars = await charController.getCharacters();
  res.render('add_charOwn', { chars: chars, UID: id });
});

router.post('/:id/addCharOwn', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const { charID} = req.body;
  const charsHave = await charController.getCharsHaveById(id);
  let flag = false;
  for (let index = 0; index < charsHave.length; index++) {
    if (charsHave[index].characterID == charID) {
      flag = true;
    }
  }
  if (flag == false) {
    await charOwnController.addNewCharacter(id, charID, 0);
    const charOwns = await charOwnController.getCharOwnsById(id);
    res.render('charOwn', { charOwns: charOwns, UID: id });
  }
});

// CharOwn Edit
router.get('/:id/charOwnEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const charOwn = await charOwnController.getCharOwnById(id);
  res.render('detail_charOwn', { charOwn: charOwn });
});

router.post('/:id/charOwnEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const { charName, level} = req.body;
  const char = await charController.getCharByName(charName);
  console.log("charName: ", charName);
  console.log("char: ", char);
  const newLevel = await levelController.getLevelUpdate(char._id, level);
  if(newLevel){
    await charOwnController.updateLevel(id, newLevel._id);

    const charOwn = await charOwnController.getCharOwnById(id);
    const charOwns = await charOwnController.getCharOwnsById(charOwn.userID);
  res.render('charOwn', { charOwns: charOwns, UID: id });
  }
});

// Char List
router.get('/charList', [authentication.checkLoginAdmin], async function (req, res, next) {
  const chars = await charController.getCharacters();
  res.render('charList', { chars: chars });
});

// Char Edit
router.get('/:id/charEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const char = await charController.getCharById(id);
  res.render('detail_char', { char: char });
});

router.post('/:id/charEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  let { price } = req.body;
  if (price == null || price < 0 || price.trim() == "") {
    await charController.updatePrice(id, 0);
  } else {
    await charController.updatePrice(id, price);
  }
  res.redirect('/admin/charList');
});

// spellOwn
router.get('/:id/spellOwn', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const spellOwns = await spellOwnController.getSpellOwnsByUId(id);
  res.render('spellOwn', { spellOwns: spellOwns });
});

// Spell List
router.get('/spellList', [authentication.checkLoginAdmin], async function (req, res, next) {
  const spells = await spellController.getSpells();
  res.render('spellList', { spells: spells });
});

// Spell Edit
router.get('/:id/spellEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const spell = await spellController.getSpellById(id);
  res.render('detail_spell', { spell: spell });
});

router.post('/:id/spellEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  let { description, cooldown, price, total } = req.body;
  if (description == null) {
    description == "";
  }
  if (cooldown == null || cooldown.trim() == "" || cooldown < 0) {
    cooldown = 0;
  }
  if (price == null || price.trim() == "" || price < 0) {
    price = 0;
  }
  if (total == null || total.trim() == "" || total < 0) {
    total = 0;
  }
  await spellController.updateSpellById(id, description, cooldown, price, total);
  res.redirect('/admin/spellList');
});

// Levels
router.get('/:id/levels', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const levels = await levelController.getLevelsByCharID(id);
  const char = await charController.getCharById(id);
  res.render('level', { levels: levels, char: char });
});

// Level Edit
router.get('/:id/levelEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  const level = await levelController.getLevelById(id);
  const char = await charController.getCharById(level.characterID);
  res.render('detail_level', { level: level, char: char });
});

router.post('/:id/levelEdit', [authentication.checkLoginAdmin], async function (req, res, next) {
  const { id } = req.params;
  let { damage, hp, cost } = req.body;
  if (damage == null || damage.trim() == "" || damage < 0) {
    damage = 0;
  }
  if (hp == null || hp.trim() == "" || hp < 0) {
    hp = 0;
  }
  if (cost == null || cost.trim() == "" || cost < 0) {
    cost = 0;
  }
  await levelController.updateLevel(id, damage, hp, cost);

  const level = await levelController.getLevelById(id);
  const levels = await levelController.getLevelsByCharID(level.characterID);
  const char = await charController.getCharById(level.characterI);
  res.render('level', { levels: levels, char: char });

});

module.exports = router;
