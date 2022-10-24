const spellModel = require('./model');

exports.getSpells = async () => {
    const spells = await spellModel.find();
    return spells;
}

exports.getSpellById = async (id) => {
    const spell = await spellModel.findOne({ _id: id });
    return spell;
}

exports.updateSpellById = async (id, description, cooldown, price, total) => {
    await spellModel.findByIdAndUpdate(id, { description: description, cooldown: cooldown, price: price, total: total});
}

exports.getSpellByName = async (name) => {
    const spell = await spellModel.findOne({ name: name });
    return spell;
}