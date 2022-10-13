// import service
const characterService = require('./service');

// Lấy danh sách tướng
exports.getCharacters = async () => {
    let data = await characterService.getCharacters();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            price: item.price,
            index: index + 1,
        }
        return item;
    });
    return data;
}