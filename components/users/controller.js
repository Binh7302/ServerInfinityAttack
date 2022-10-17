// import service
const userService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');
const { Types } = require('mongoose');

// controller đăng kí
exports.register = async (username, password,  name) => {
    // bắt lỗi
    let user = await userService.findUserByUsername(username);
    if (user) return "Tài khoản đã tồn tại";
    let user1 = await userService.findUserByName(name);
    if (user1) return "Tên nhân vật đã tồn tại";
    console.log(user);
    // mã hóa mật khẩu
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    // lưu vào db
    user = await userService.register(username, hash, name);
    return "Đăng kí thành công";
}

//controller đăng nhập
exports.login = async (username, password) => {
    
    // bắt lỗi
    const user = await userService.findUserByUserName(username);
    console.log("user: " + user);
    if (!user) return "Sai tài khoản hoặc mật khẩu";
    console.log("username: " + username + " password: " + password, "userpassword: " + user.password);
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword: " + checkPassword);
    if (!checkPassword) return "Sai tài khoản hoặc mật khẩu";
    return user._id;
}

//controller lấy thông tin user
exports.getUserById = async (id) => {
    const user = await userService.findUserById(id);
    console.log("user: ", user);
    return user;
}

//controller lấy thông tin user
exports.getUserByName = async (name) => {
    const user = await userService.findUserByName(name);
    return user;
}
exports.updateGoldUser = async (id, gold) => {
   return await userService.updateGoldUser(id,gold);
}
exports.updateGemUser = async (id, gem) => {
    return await userService.updateGemUser(id,gem);
 }

//controller lấy thông tin user
exports.getUserById = async (id) => {

    const user = await userService.findUserById(id);
    console.log("user: ", user);
    return user;
}

exports.getTop5Users = async () => {
    const top5Users = await  userService.getTop5Users();
    return top5Users;
}


