const ownerModel = require('./model');

exports.loginOwner = async (username, password) => {
    const owner = await ownerModel.findOne({ username: username, password: password }, 'id username password');
    return owner;
}
