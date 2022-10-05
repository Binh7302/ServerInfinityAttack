const userModel = require('./model');

exports.register = async (username, password, name) => {
    const user = new userModel({ username, password, name});
    return await user.save();
}

exports.findUserByUsername = async (username) => {
    const user = await userModel.findOne({ username: username },  'id username password name email gold diamond');
    return user;
}