var express = require('express');
var router = express.Router();

const friendsController = require('../components/friends/controller');

// http://localhost:3000/friends/requestAnUser
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

// http://localhost:3000/friends/addTrueFriend
router.post('/addTrueFriend', async function (req, res, next) {
    const { id } = req.body;
    const data = await friendsController.addTrueFriend(id, 1);
    return res.json(data);
});
// http://localhost:3000/friends/findRespone
router.post('/findRespone', async function (req, res, next) {
    const { userRes } = req.body;
    const data = await friendsController.findRespone(userRes);
    return res.json(data);
});
// http://localhost:3000/friends/getAllFriends
router.post('/getAllFriends', async function (req, res, next) {
    const { userID } = req.body;
    const data = await friendsController.getAllFriends(userID);
    return res.json(data);
});
// http://localhost:3000/friends/deleteAnFriend
router.post('/deleteAnFriend', async function (req, res, next) {
    const { id } = req.body;
    const data = await friendsController.deleteAnFriend(id);
    return res.json(data);
});
// http://localhost:3000/friends/checkExistingFriend
router.post('/checkExistingFriend', async function (req, res, next) {
    const { userID } = req.body;
    const user = await friendsController.checkExistingFriend(userID);
    return res.json(user);
});

module.exports = router;
