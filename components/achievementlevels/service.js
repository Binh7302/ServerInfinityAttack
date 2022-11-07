const achievementLevelModel = require('./model');

exports.getAchievementLevelUpdate = async (achievementID, level) => {
    const data = await achievementLevelModel.findOne({ level: level, achievementID: achievementID });
    return data;
}

exports.getAchievementLevel = async () => {
    const data = await achievementLevelModel.find().populate('achievementID');
    return data;
}
