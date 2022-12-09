//Game

// import service
const userService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');
const { Types } = require('mongoose');

// import thư viện token
const jwt = require('jsonwebtoken');

//import thư viện gửi mail
const mailgun = require("mailgun-js");
const { response } = require('express');
const DOMAIN = 'sandboxb991a2ab4151444f92fe624b7b674f3c.mailgun.org';
const mg = mailgun({ apiKey: '55f0285515c39cc483885a0b592730e3-bdb2c8b4-0115bda7', domain: DOMAIN });

// controller đăng kí
exports.register = async (username, password,  name) => {
    // bắt lỗi
    let user = await userService.findUserByUserName(username);
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

// lấy danh sách users
exports.getUsers = async () => {
    let data = await userService.getUsers();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,
            username: item.username,
            index: index + 1,
            gem: item.gem,
            gold: item.gold,
        }
        return item;
    });
    return data;
}


exports.update = async (id, user) => {
    return await userService.update(id, user);
}


exports.changePassword = async (uid, pass, newPass) => {
    console.log("pass: " + pass + " new pass: " + newPass);
    const user = await userService.findUserById(uid);
    console.log("pass: " + pass + " user pass: " + user.password);
    const checkPassword = await bcrypt.compare(pass, user.password);
    if (!checkPassword) return "Mật khẩu cũ không đúng";

    const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
    await userService.changePassword(uid, hash);
    return "Đổi mật khẩu thành công";
}

exports.sendCodeAddEmail = async (uid, email) => {
    const user = await userService.findUserByEmail(email);
    if (user) {
        return "Email đã được sử dụng";
    } else {
        // tạo code gửi về email để thêm email vào tài khoản
        const token = await jwt.sign({ uid: uid, email: email }, 'addEmail', { expiresIn: '1m' });
        const data = {
            from: 'infinityattack@gmail.com',
            to: email,
            subject: 'Add Email',
            html: `
                        <h2>This link just expires in 1 minutes. Coppy this code and use it to add email to your account</h2>
                        <p>${token}</p>
                    `
        };
        mg.messages().send(data, function (error, body) {
            console.log(error);
            console.log(body);
        });
        return "Đã gửi mã thêm email về mail hiện tại của bạn";
    }
}

exports.addEmail = async (token) => {
    let result = null;
    await jwt.verify(token, 'addEmail', async function (error, decoded) {
        console.log("error add email: " + error);
        const { uid, email } = decoded;
        const user = await userService.findUserByEmail(email);
        if (user) {
            result = "Email đã được sử dụng";
        } else {
            if (error == null) {
                await userService.addAndChangeEmail(uid, email);
                result = "Thêm email thành công";
            } else {
                result = "Mã không đúng hoặc đã hết hạn";
            }
        }
    });
    return result;
}

exports.sendCodeChangeEmail = async (uid) => {
    const user = await userService.findUserById(uid);
    const email = null;
    if (user) {
        email = user.email;

        // tạo code gửi về email để đổi email
        const token = await jwt.sign({ uid: uid }, 'changeEmail', { expiresIn: '1m' });
        const data = {
            from: 'infinityattack@gmail.com',
            to: email,
            subject: 'Change Email',
            html: `
                        <h2>This link just expires in 1 minutes. Coppy this code and use it to change email to your account</h2>
                        <p>${token}</p>
                    `
        };
        mg.messages().send(data, function (error, body) {
            console.log(error);
            console.log(body);
        });
        return "Đã gửi mã đổi email về email hiện tại của bạn";
    }
}

exports.changeEmail = async (newEmail, token) => {
    let result = null;
    await jwt.verify(token, 'changeEmail', async function (error, decoded) {
        console.log("error change email: " + error);
        const { uid } = decoded;
        const user = await userService.findUserByEmail(newEmail);
        if (user) {
            result = "Email đã được sử dụng";
        } else {
            if (error == null) {
                await userService.addAndChangeEmail(uid, newEmail);
                result = "Đổi email thành công";
            } else {
                result = "Mã không đúng hoặc đã hết hạn";
            }
        }
    });
    return result;
}

exports.sendCodeForgotPass = async (email) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        return "Không tìm thấy tài khoản với email trên"
    } else {
        // tạo code gửi về email để đổi mật khẩu
        const token = await jwt.sign({ uid: user._id }, 'forgotPass', { expiresIn: '1m' });
        const data = {
            from: 'infinityattack@gmail.com',
            to: email,
            subject: 'Forgot Password',
            html: `
                        <h2>This link just expires in 1 minutes. Coppy this code and use it to change your password</h2>
                        <p>${token}</p>
                    `
        };
        mg.messages().send(data, function (error, body) {
            console.log(error);
            console.log(body);
        });
        return "Đã gửi mã quên mật khẩu về email hiện tại của bạn";
    }
}

exports.forgotPass = async (newPass, token) => {
    let result = null;
    await jwt.verify(token, 'forgotPass', async function (error, decoded) {
        console.log("error change email: " + error);
        const { uid } = decoded;
        if (error == null) {
            await userService.changePassword(uid, newPass)
            result = "Đổi mật khẩu thành công";
        } else {
            result = "Mã không đúng hoặc đã hết hạn";
        }
    });
    return result;

}