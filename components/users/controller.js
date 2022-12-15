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
    if (user) return "Username already exists";
    let user1 = await userService.findUserByName(name);
    if (user1) return "Name already exists";
    console.log(user);
    // mã hóa mật khẩu
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    // lưu vào db
    user = await userService.register(username, hash, name);
    return "Sign up successfully";
}

//controller đăng nhập
exports.login = async (username, password) => {
    
    // bắt lỗi
    const user = await userService.findUserByUserName(username);
    console.log("user: " + user);
    if (!user) return "Account or password error";
    console.log("username: " + username + " password: " + password, "userpassword: " + user.password);
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword: " + checkPassword);
    if (!checkPassword) return "Account or password error";
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
    if (!checkPassword) return "Old password is not correct";

    const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
    await userService.changePassword(uid, hash);
    return "Change password successfully";
}

exports.sendCodeAddEmail = async (uid, email) => {
    const user = await userService.findUserByEmail(email);
    if (user) {
        return "Email has already been used by another user";
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
        return "Add email code was sent to your email address";
    }
}

exports.addEmail = async (token) => {
    let result = null;
    await jwt.verify(token, 'addEmail', async function (error, decoded) {
        console.log("error add email: " + error);
        const { uid, email } = decoded;
        const user = await userService.findUserByEmail(email);
        if (user) {
            result = "Email has already been used by another user";
        } else {
            if (error == null) {
                await userService.addAndChangeEmail(uid, email);
                result = "Add email successfully";
            } else {
                result = "Code was expired or incorrect";
            }
        }
    });
    return result;
}

exports.sendCodeChangeEmail = async (uid) => {
    const user = await userService.findUserById(uid);
    let email = null;
    console.log("change email "+user);
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
        return "Change email code was sent to your email address";
    }
}

exports.changeEmail = async (newEmail, token) => {
    let result = null;
    await jwt.verify(token, 'changeEmail', async function (error, decoded) {
        console.log("error change email: " + error);
        const { uid } = decoded;
        const user = await userService.findUserByEmail(newEmail);
        if (user) {
            result = "Email has already been used by another user";
        } else {
            if (error == null) {
                await userService.addAndChangeEmail(uid, newEmail);
                result = "Change email successfully";
            } else {
                result = "Code was expired or incorrect";
            }
        }
    });
    return result;
}

exports.sendCodeForgotPass = async (email) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        return "Account cannot be found with this email"
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
        return "Change password code was sent to your email address";
    }
}

exports.forgotPass = async (newPass, token) => {
    let result = null;
    await jwt.verify(token, 'forgotPass', async function (error, decoded) {
        console.log("error change email: " + error);
        const { uid } = decoded;
        if (error == null) {
            const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
            await userService.changePassword(uid, hash);
            result = "Change password successfully";
        } else {
            result = "Code was expired or incorrect";
        }
    });
    return result;

}