// tầng giao tiếp và xử lý data
const achievementLevelService = require('./service');

// Lấythông tin theo achievement level và achievementID
exports.getAchievementLevelUpdate = async (achievementID, level) => {
    const data = await achievementLevelService.getAchievementLevelUpdate(achievementID, level);
    return data;
}

exports.getAchievementLevel = async () => {
    const data = await achievementLevelService.getAchievementLevel();
    return data;
}
