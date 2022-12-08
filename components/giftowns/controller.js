// tầng giao tiếp và xử lý data
const giftownService = require('./service');

// lấy QuestOwns bằng userID
exports.getQuestGiftsByUserID = async (userID) => {
    const giftOwns = await giftownService.getQuestOwnsByUserID(userID);
    return giftOwns;
}

exports.update = async (id, questOwn) => {
    return await giftownService.update(id, questOwn);
}

exports.getGiftOwnsByID = async (id) => {
    const giftOwns = await giftownService.getQuestOwnByID(id);
    return giftOwns;
}

// add giftquests cho người chơi đăng kí tài khoản
exports.addGiftQuestByName = async (username, name) => {
    await giftownService.addGiftQuestByName(username, name);
}

exports.resetDailyGift = async () => {
    await giftownService.updateDailyGift();
}
