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
            image: item.image
        }
        return item;
    });
    return data;
}

// lấy tên của nhân vật đang sử dụng bằng USERID
exports.getUsingCharNameById = async (id) => {
    console.log("uid: " + id);
    const name = await characterService.getUsingCharNameById(id);
    return name;
}

// lấy chi tiết nhân vật bằng CHARID
exports.getCharById = async (id) => {
    const char = await characterService.getCharById(id);
    return char;
}


// cật nhật lại giá nhân vật
exports.updatePrice = async (id, price) => {
    return await characterService.updatePrice(id, price);
 }

 exports.getCharsHaveById = async (id) => {
    const charsHave = await characterService.getCharsHaveById(id);
    return charsHave;
 }

 exports.getCharByName = async (name) => {
    const char = await characterService.getCharByName(name);
    return char;
}