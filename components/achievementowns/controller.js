// tầng giao tiếp và xử lý data
const achievementownService = require('./service');


// Lấy chi tiết danh sách thành tựu 1 người chơi sỡ hữu
exports.getAchievementOwnByUserId = async (id) => {
    let data = await achievementownService.getAchievementOwns();
    data = data.filter(item => item.userID.equals(id));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID,
            achievementID: item.achievementID,
            achievementLevelID: item.achievementLevelID,
            challengeAchieved: item.challengeAchieved,
        }
        return item;
    });
    return data;
}


exports.getAchievementOwnByID = async (id) => {
    const data = await achievementownService.getAchievementOwnByID(id); 
    return data;
}

exports.getAchievementOwnByUserIDAndAchievementID = async (userID, achievementID) => {
    const data = await achievementownService.getAchievementOwnByUserIDAndAchievementID(userID, achievementID); 
    return data;
}

exports.update = async (id, achievementown) => {
    return await achievementownService.update(id, achievementown);
}

// add quests cho người chơi đăng kí tài khoản
exports.addAchievementByName = async (username, name) => {
    await achievementownService.addAchievementByName(username, name);
}

