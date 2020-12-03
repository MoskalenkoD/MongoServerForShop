const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID});

module.exports = (
    goodsMiddleware
) => {

    const router = vertex.router();

    router.get('/', goodsMiddleware.getAllGoods());

    router.get('/:id', goodsMiddleware.getGoodById());

    return router;
};
