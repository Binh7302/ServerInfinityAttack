const adminModel = require('./model');

// Đăng nhập
exports.loginAdmin = async (username) => {
    const admin = await adminModel.findOne({ username: username }, 'id username password name status');
    return admin;
}

// Đăng kí
exports.registerAdmin = async (username, password, name) => {
    const admin = new adminModel({ username, password, name});
    return await admin.save();
}

//tìm admin bằng username
exports.getAdminByUsername = async (username) => {
    // return data;
    const admin = await adminModel.findOne({ username: username });
    return admin;
}

//Lấy thông tin danh sách admin chưa được duyệt
exports.getAdmins = async () => {
    // return data;
    const admins = await adminModel.find();
    return admins;
}

// Đồng ý duyệt admin( status 0 -> 1 )
exports.verify = async (id) => {
    await adminModel.findByIdAndUpdate(id, { status: 1 });
}

// Từ chối duyệt admin( delete admin )
exports.delete = async (id) => {
    await adminModel.findByIdAndDelete(id);
}