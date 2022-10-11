// import service
const userService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');

// controller đăng kí
exports.register = async (username, password, confirm_password, name) => {

    // bắt lỗi
    let user = await userService.findUserByUsername(username);
    if (user) return "Tài khoản đã tồn tại";

    // mã hóa mật khẩu
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    // lưu vào db
    user = await userService.register(username, hash, name);
    return "Đăng kí thành công";
}

//controller đăng nhập
exports.login = async (username, password) => {

    // bắt lỗi
    const user = await userService.findUserByUsername(username);
    if (!user) return "Sai tài khoản hoặc mật khẩu";
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return "Sai tài khoản hoặc mật khẩu";
    return user._id ;
}

//controller lấy thông tin user
exports.getUserById = async (id) => {

    const user = await userService.findUserById(id);
    console.log("user: ", user);
    return user;
}


