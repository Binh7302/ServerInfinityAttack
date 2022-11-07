const friendsModel = require('./model');
const usersModel = require('../users/model');

exports.getRelationship = async (userReq, userRes) => {
    const friends = await friendsModel.findOne({ userReq: userReq, userRes: userRes });
    if (friends == null) {
        const friendReserve = await friendsModel.findOne({ userReq: userRes, userRes: userReq });
        return friendReserve;
    }
    return friends;
}

exports.findRespone = async (userRes) => {
    const friends = await friendsModel.findOne({ userRes: userRes, status: 0    });
    return friends;
}

exports.addRelationship = async (userID1, userID2, status) => {
    const friend = await new friendsModel({ userReq: userID1, userRes: userID2, status: status });
    friend.save();
    return friend;
}

exports.addTrueFriend = async (id, status) => {
    return await friendsModel.updateOne({ _id: id }, { status: status });
}

exports.getAllFriends = async (userr) => {
    const find = await friendsModel.find({status:1});
    const friends = find.filter((user) => user.userReq == userr || user.userRes == userr);
    console.log(friends);
    return friends;
}
exports.deleteAnFriend = async (id) =>{
    const data = await friendsModel.deleteOne({_id:id});
    return data;
}
exports.checkExistingFriend = async(userID) =>{
    const users = await usersModel.findById(userID);
    return users;
}