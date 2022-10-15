// import service
const spellService = require('./service');

// Lấy danh sách tướng
exports.getSpells = async () => {
    let data = await spellService.getSpells();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            price: item.price,
            description:item.description,
            cooldown:item.cooldown,
            index: index + 1,
        }
        return item;
    });
    return data;
}