const userModel = require('./model');

exports.register = async (username, password, name) => {
    const user = new userModel({ username, password, name});
    return await user.save();
}

exports.findUserByUsername = async (username) => {
    const user = await userModel.findOne({ username: username },  'id username password name email gold diamond');
    return user;
}

exports.findUserById = async (id) => {
    const user = await userModel.findOne({ _id: id },  'id username password name email gold diamond');
    return user;
}