const userModel = require('./model');
const characterOwnModel = require('../characterowns/model');

exports.register = async (username, password, name) => {
    const user = new userModel({ username, password, name, gem: 500, gold: 1000 });
    return await user.save();
}

exports.findUserByUserName = async (username) => {
    const user = await userModel.findOne({ username: username }, 'id username password name email gold gem');
    return user;
}

exports.findUserByName = async (name) => {
    const user = await userModel.findOne({ name: name }, 'id username password name email gold gem');
    return user;
}

exports.findUserById = async (id) => {
    const user = await userModel.findOne({ _id: id }, 'id username password name email gold gem');
    return user;
}
exports.updateGoldUser = async (id, gold) => {
    return await userModel.updateOne({ _id: id }, {gold: gold});
}
exports.updateGemUser = async (id, gem) => {
    return await userModel.updateOne({ _id: id }, {gem: gem});
}
exports.getTop5Users = async () => {
    const userList = await userModel.find();
    console.log(userList);
    const flag = [];
    for (let index = 0; index < userList.length; index++) {
        var userID = null;
        var amountList = null;
        var count = 0;
        userID = userList[index]._id;
        amountList = await characterOwnModel.aggregate(
            [
                { $match: { userID: userID }}
            ]
        );
        count = amountList.length;
        flag.push({ name: userList[index].name, count: count });
    }
    console.log("Flag: " + flag);

    flag.sort(function (a, b) { return a.count - b.count });
    const top5Users = [];
    let countTop5 = 0;
    for (let index = flag.length-1; index >= 0; index--) {
        console.log("count: " + countTop5);
        if (countTop5 != 5) {
        top5Users.push(flag[index]);
        countTop5++;
        } else {
            break;
        }
    }
    console.log("top5users: " + top5Users);
    return top5Users;
}

exports.getUsers = async() => {
    return users = await userModel.find();
}

exports.getUsersBySearchValue = async (searchValue) => {
    // return data;
    const users = await userModel.find( { username: { $regex: searchValue } } );
    return users;
}

exports.update = async (_id, user) => {
    return await userModel.findByIdAndUpdate(_id,user);
  }

  exports.changePassword = async (uid, newPass) => {
    await userModel.findByIdAndUpdate(uid,{ password: newPass});
}

exports.findUserByEmail = async(email) => {
    const user = await userModel.findOne({ email: email });
    return user;
}

exports.addAndChangeEmail = async (uid, email) => {
    await userModel.findByIdAndUpdate( uid, { email: email });
}

exports.findUserByEmail = async (email) => {
    const user = await userModel.findOne({ email: email }, 'id username password name email gold gem');
    return user;
}

exports.removeAll = async() => {
    await userModel.find().removeAll();
}