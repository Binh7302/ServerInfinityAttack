const achievementModel = require('./model');

exports.getAchievements = async () => {
    const achievements = await achievementModel.find();
    return achievements;
}

exports.getAchievementByName = async (name) => {
    const achievements = await achievementModel.findOne({name:name});
    return achievements;
}
