const mongoose = require('mongoose');
const Devices = new mongoose.Schema({
    id: {type: Number},
    name: {type: String, trim: true, default: ''},
    rate: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    type: {type: Number, default: 1}
});

module.exports = mongoose.model('Devices', Devices);