// tầng giao tiếp và xử lý data
const questownService = require('./service');

// lấy QuestOwns bằng userID
exports.getQuestOwnsByUserID = async (userID) => {
    const questOwns = await questownService.getQuestOwnsByUserID(userID);
    return questOwns;
}

exports.update = async (id, questOwn) => {
    return await questownService.update(id, questOwn);
}

exports.getQuestOwnsByID = async (id) => {
    const questOwns = await questownService.getQuestOwnByID(id);
    return questOwns;
}

exports.getQuestOwnByUserIDAndQuestID = async (userID, questID) => {
    const data = await questownService.getQuestOwnByUserIDAndQuestID(userID, questID); 
    return data;
}

// add quests cho người chơi đăng kí tài khoản
exports.addQuestByName = async (username, name) => {
    await questownService.addQuestByName(username, name);
}

exports.resetDailyQuest = async () => {
    await questownService.updateDailyQuest();
}