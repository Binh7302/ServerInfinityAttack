const spellModel = require('./model');

exports.getSpells = async () => {
    const spells = await spellModel.find();
    return spells;
}
