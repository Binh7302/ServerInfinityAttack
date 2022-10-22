// import service
const ownerService = require('./service');

// controller đăng nhập
exports.loginOwner = async (username, password) => {
    const owner = await ownerService.loginOwner(username, password);
    if (!owner) return null;
    return { _id: owner._id, username: owner.username };
}