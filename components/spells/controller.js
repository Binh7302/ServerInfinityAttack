// import service
const spellService = require('./service');

// Lấy danh sách tướng
exports.getSpells = async () => {
    let data = await spellService.getSpells();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            description:item.description,
            cooldown:item.cooldown,
            price: item.price,
            total:item.total
        }
        return item;
    });
    return data;
}