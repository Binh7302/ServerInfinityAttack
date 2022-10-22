// import service
const spellService = require('./service');

// Lấy danh sách spell
exports.getSpells = async () => {
    let data = await spellService.getSpells();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            description:item.description,
            cooldown:item.cooldown,
            price: item.price,
            total:item.total,
            index: index + 1,
        }
        return item;
    });
    return data;
}

// lấy chi tiết spell bằng spellID
exports.getSpellById = async (id) => {
    const spell = await spellService.getSpellById(id);
    return spell;
}

// update spell
exports.updateSpellById = async (id, description, cooldown, price, total) => {
    await spellService.updateSpellById(id, description, cooldown, price, total);
}