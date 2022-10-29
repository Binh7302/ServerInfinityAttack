const questModel = require('./model');

exports.getQuests = async () => {
    const quest = await questModel.find();
    return quest;
}
exports.getQuestByName = async (name) => {
    const quest = await questModel.findOne({ name: name });
    return quest;
}
