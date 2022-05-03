const response = require("../../requests/response");

module.exports.get = (req, res, next) => {
    const cart = req.session.cart;
    res.json(response.createResponse(cart));
}
module.exports.update = (req, res, next) => {
    const { phone_id, quantity } = req.body;
    if (req.session?.cart?.phone) {
        const cart = req.session.cart.phone;
        let itemIndex = cart.findIndex((p) => p.phone_id == phone_id);
        if (itemIndex > -1) {
            //phone exists in the cart, update the quantity
            let phoneItem = cart[itemIndex];
            phoneItem.quantity = quantity;
            cart[itemIndex] = phoneItem;
        } else {
            //phone does not exists in cart, add new item
            cart.push({ phone_id, quantity });
        }
        return res.json(response.createResponse(req.session.cart));
    } else {
        req.session.cart = {};
        req.session.cart.phone = [{ phone_id, quantity }];
        return res.json(response.createResponse(req.session.cart));
    }
}
module.exports.delete = (req, res, next) => {
    const cart = req.session?.cart?.phone;
    const { phone_id } = req.body;
    if (cart) {
        let itemIndex = cart.findIndex((p) => p.phone_id == phone_id);
        if (itemIndex > -1) {
            cart.splice(itemIndex, 1);
        } else {
            //phone does not exists in cart
            return res.status(403).json({ success: false, message: 'Điện thoại không tồn tại trong giỏ hàng' });
        }
        return res.json(response.createResponse({'msg': 'Xóa giỏ hàng thành công!'}));
    }
    return res.json(response.createError({'msg': 'Giỏ hàng trống!'}));
}
module.exports.destroy = (req, res, next) => {
    if (req.session?.cart?.phone) {
        delete req.session.cart;
        return res.json(response.createResponse({'msg': 'Xóa giỏ hàng thành công!'}));
    }
    return res.json(response.createError({'msg': 'Giỏ hàng trống!'}));
}