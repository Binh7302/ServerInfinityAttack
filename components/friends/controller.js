// import service
const friendsService = require('./service');

exports.addRelationship = async (userID1,userID2,status) => {
    const friend = await friendsService.addRelationship(userID1,userID2,status);
    return friend;
}
exports.getRelationship = async (userID1,userID2) => {
    const friend = await friendsService.getRelationship(userID1,userID2);
    return friend;
}
exports.addTrueFriend = async (id,status) => {
    const friend = await friendsService.addTrueFriend(id,status);
    return friend;
}
exports.findRespone = async (userRes) => {
    const friends = await friendsService.findRespone(userRes);
    return friends;
}
exports.getAllFriends = async (user) => {
    const friend = await friendsService.getAllFriends(user);
    return friend;
}
exports.deleteAnFriend = async (id) =>{
    const data = await friendsService.deleteAnFriend(id);
    return data;
}
exports.checkExistingFriend = async(userID) =>{
    const user = await friendsService.checkExistingFriend(userID);
    return user;
}
