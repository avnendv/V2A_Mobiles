const moment = require("moment");
const Order = require("../../models/Order");
module.exports.index = (req, res, next) => {
    Order.findDetail({})
    .then(orders => {
        const orderFilter = orders.map(order => {
            return {totalPrice: order.quantity * order.price , created_at: moment(order.created_at).format("DD/MM/YYYY")}
        }).reduce((total, order) => {
            total[order.created_at] = (total[order.created_at] || 0) + order.totalPrice;
            return total;
        }, {});
        const statistical = {
            date: Object.keys(orderFilter),
            value: Object.values(orderFilter),
        }
        res.render('admin/dashboard', {statistical: statistical});
    })
    .catch(next);
}
