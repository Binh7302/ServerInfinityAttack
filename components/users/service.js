const userModel = require('./model');

exports.register = async (username, password, name) => {
    const user = new userModel({ username, password, name });
    return await user.save();
}

exports.findUserByName = async (name) => {
    const user = await userModel.findOne({ name: name }, 'id username password name email gold diamond');
    return user;
}

exports.findUserById = async (id) => {
    const user = await userModel.findOne({ _id: id }, 'id username password name email gold diamond');
    return user;
}
exports.updateGoldUser = async (id, gold) => {
    return await userModel.updateOne({ _id: id }, {gold: gold});
}
exports.updateGemUser = async (id, gem) => {
    return await userModel.updateOne({ _id: id }, {gem: gem});
}