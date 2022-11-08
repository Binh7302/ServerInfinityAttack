// import service
const achievementService = require('./service');

// Lấy danh sách thành tựu
exports.getAchievements = async () => {
    let data = await achievementService.getAchievements();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            index: index + 1,
        }
        return item;
    });
    return data;
}


exports.getAchievementByName = async (name) => {
    let data = await achievementService.getAchievementByName(name);
    return data;
}