const {goods} = require('../initial/data');
const Devices = require('../models/devices');

module.exports = class GoodsMiddleware {

    getAllGoods() {
        return async (req, res) => {
            Devices.countDocuments({}, (err, count) => {
                if (!goods.length) {
                    return res.sendStatus(400);
                }
                if (!count) {
                    goods.forEach(good => {
                        Devices.create(good);
                    });
                }
            })
                .then(() => {
                    Devices.find(req.query)
                        .then(devices => {
                            return res.json(devices);
                        }).catch(err => {
                        return res.sendStatus(400);
                    });
                }).catch(err => {
                return res.sendStatus(400);
            });
        }
    }

    getGoodById() {
        return async (req, res) => {
            const filter = {"id": req.params.id};

            Devices.find(filter)
                .then(device => {
                    return res.json(device[0]);
                }).catch(err => {
                return res.sendStatus(400);
            });
        }
    }

};