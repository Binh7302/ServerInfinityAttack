// tầng giao tiếp và xử lý data
const spellownService = require('./service');

// Lấy chi tiết danh sách spell 1 người chơi sỡ hữu
exports.getSpellOwnsById = async (id) => {  
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
    return await spellownService.addNewSpell(userID,spellID,amount);
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
exports.getSpellOwnsByUId = async (uid) => {
    const spellOwns = await spellownService.getSpellOwnsByUID(uid);
    return spellOwns;
}

exports.getSpellOwnBySpellID = async (id) => {
    const spellOwn = await spellownService.getSpellOwnBySpellID(id);
    return spellOwn;
}
    
exports.deleteSpellOwnBySpellID = async (id) => {
    await spellownService.deleteSpellOwnBySpellID(id);
}

exports.getSpellOwnsHaveByUID = async (UID) => {
    const spellOwnsHave = await spellownService.getSpellOwnsHaveByUID(UID);
    return spellOwnsHave;
}

exports.addNewSpellOwnByUIDAndSpellID = async (UID, spellID) => {
    await spellownService.addNewSpellOwnByUIDAndSpellID(UID, spellID);
}

exports.getSpellOwnBySpellOwnID = async (spellOwnID) => {
    const spellOwn = await spellownService.getSpellOwnBySpellOwnID(spellOwnID);
    return spellOwn;
}

exports.updateSpellOwnBySpellOwnId = async (spellOwnId, amount) => {
    await spellownService.updateSpellOwnBySpellOwnId(spellOwnId, amount);
}
