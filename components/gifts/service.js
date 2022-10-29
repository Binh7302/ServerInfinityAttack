const giftModel = require('./model');

exports.getGifts = async () => {
    const gift = await giftModel.find();
    return gift;
}
exports.getGiftByName = async (name) => {
    const gift = await giftModel.findOne({ name: name });
    return gift;
}
