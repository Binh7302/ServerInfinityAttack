// import service
const adminService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');

// controller đăng nhập
exports.loginAdmin = async (username, password) => {
    const admin = await adminService.loginAdmin(username);
    if (!admin) return null;
    if (admin.status == 0) return null; 
    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) return null;
    return { _id: admin._id, username: admin.username };
}

// lấy danh sách admin có status = 0
exports.getAdmins = async () => {
    let data = await adminService.getAdmins();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,
            username: item.username,
            index: index + 1,
        }
        return item;
    });
    return data;
}

// đăng kí
exports.registerAdmin = async (username, password, confirm_password, name) => {
    let admin = await adminService.getAdminByUsername(username);
    if(admin) return null;
    if(password != confirm_password) return null;
    if(username == "" || password == "" || name == "") return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    admin = await adminService.registerAdmin(username, hash, name);
    return { _id: admin._id };
}

// đồng ý duyệt admin
exports.verify = async (id) => {
    await adminService.verify(id);
}


// Từ chối duyệt admin
exports.delete = async (id) => {
    await adminService.delete(id);
}
