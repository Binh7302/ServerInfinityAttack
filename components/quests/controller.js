// import service
const questService = require('./service');

// Lấy danh sách quest
exports.getQuests = async () => {
    let data = await questService.getQuests();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            description:item.description,
            point:item.point,
            challenge: item.challenge,
            index: index + 1,
        }
        return item;
    });
    return data;
}


exports.getQuestByName = async (name) => {
    const quest = questService.getQuestByName(name);
    return quest;
}