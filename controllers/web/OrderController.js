const Order = require('../../models/Order');
const response = require('../../requests/response');

module.exports.index = (req, res, next) => {
    Order.find(req.query)
    .then(orders => {
        res.render('admin/order/index', {orders: orders, query: req.query });
    })
    .catch(next);
}
module.exports.detail = (req, res, next) => {
    Order.findDetail({id: req.params.id})
    .then(order => {
        res.render('admin/order/detail', {order: order});
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    const data = {};
    if (req.body?.payment) {
        data.payment = req.body.payment;
    }
    if (req.body?.status) {
        data.status = req.body.status;
    }
    Order.update(req.body, req.body.id)
    .then(() => {
        return res.json(response.createResponse());
    })
    .catch(error => {
        return res.json(response.createError());
    });
}
