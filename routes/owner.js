var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const ownerController = require('../components/owners/controller');

const adminController = require('../components/admins/controller');

const authentication = require('../middle/authentication');

// login
router.get('/login-owner', function (req, res, next) {
  res.render('login-owner');
});

router.post('/login-owner', async function (req, res, next) {
  const { username, password } = req.body;
  console.log(username + " " + password);
  // thực hiện kiểm tra đăng nhập
  const result = await ownerController.loginOwner(username, password);
  if (result) {
    // secret key
    const token_owner = jwt.sign({ id: result._id, username: result.username }, 'owner', { expiresIn: '20m' });
    console.log("token: " + token_owner);
    req.session.token_owner = token_owner;
    // nếu đúng chuyển qua trang sản phẩm
    res.redirect('/owner/home-owner');
  } else {
    // nếu sai quay trở lại đăng nhập
    res.redirect('/owner/login-owner');
  }
});

router.get('/logout-owner', function (req, res, next) {
  req.session.destroy(function (err) {
    // nếu đăng xuất thành công chuyển qua đăng nhập
    res.redirect('/owner/login-owner');
  })
});

// home
router.get('/home-owner', async function (req, res, next) {
  const data = await adminController.getAdminsByStatus(0);
  res.render('home-owner', { admins: data });
});

// verify admin
router.post('/:id/verify', async function (req, res, next) {
  // cập nhật sản phẩm vào database
  let { id } = req.params;
  await adminController.verify(id);
  res.redirect('/owner/home-owner');
});

// delete admin
router.post('/:id/delete', async function (req, res, next) {
  // cập nhật sản phẩm vào database
  let { id } = req.params;
  await adminController.delete(id);
  res.redirect('/owner/home-owner');
});

// admin management
router.get('/admin-management', async function (req, res, next) {
  const admins = await adminController.getAdminsByStatus(1);
  res.render('admin-management', { admins: admins });
});

module.exports = router;
