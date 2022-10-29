// import service
const giftService = require('./service');

// Lấy danh sách gift
exports.getGifts = async () => {
    let data = await giftService.getGifts();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            gold:item.gold,
            gem:item.gem,
            index: index + 1,
        }
        return item;
    });
    return data;
}


exports.getGiftByName = async (name) => {
    const gift = giftService.getGiftByName(name);
    return gift;
}