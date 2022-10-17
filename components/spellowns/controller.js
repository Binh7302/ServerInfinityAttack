// tầng giao tiếp và xử lý data
const spellownService = require('./service');

// Lấy chi tiết danh sách tướng 1 người chơi sỡ hữu
exports.getSpellOwnById = async (id) => {
    let data = await spellownService.getSpellOwns();
    data = data.filter(item => item.userID.equals(id));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID._id,
            spellID: item.spellID._id,
            amount:item.amount
        }
        return item;
    });
    return data;
}

exports.updateAmount = async (id,amount) =>{
   return await spellownService.updateAmount(id, amount);
}
exports.addNewSpellOwn = async(userID,spellID,amount) =>{
    const spellOwn = spellownService.addNewSpell(userID,spellID,amount);
    return spellOwn;
}
