// tầng giao tiếp và xử lý data
const spellownService = require('./service');

// Lấy chi tiết danh sách spell 1 người chơi sỡ hữu
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
// Spell Own by Binh
exports.getSpellOwnByUserId = async (userID) => {
    let data = await spellownService.getSpellOwns();
    data = data.filter(item => item.userID.equals(userID));
    // data = data.filter(item => item.spellID.equals(spellID));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID,
            spellID: item.spellID,
            amount:item.amount
        }
        return item;
    });
    return data;
}

// Spell Own by Binh
exports.getSpellOwnById = async (id,userID) => {
    let data = await spellownService.getSpellByID(id);
    data = data.filter(item => item.userID.equals(userID));
    data = data.map((item) => {
        item = {
            _id: item._id,
            userID: item.userID,
            spellID: item.spellID,
            amount:item.amount
        }
        return item;
    });
    return data;
}

// lấy SpellOwns bằng userID
exports.getSpellOwnsByUId = async (id) => {
    const spellOwns = await spellownService.getSpellOwnsByID(id);
    return spellOwns;
}
