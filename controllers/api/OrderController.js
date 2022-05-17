let dateFormat = require('dateformat');
const querystring = require('qs');
const crypto = require("crypto");
const Order = require('../../models/Order');
const response = require('../../requests/response');
const helper = require('../../helper/helper');

const tmnCode = "BE8CH1V5";
const secretKey = "CBMGECFFODIROCGPLECNNSOYLNATIXZZ";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:3000/dat-hang/ket-qua";

const sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    createPaymentUrl: async (req, res, next) => {
        const token = helper.vertifyToken(req.body.token);
        if (token) {
            const { full_name, phone, address, payment, notes, total } = req.body.data;
            const data = {
                orders: { full_name, phone, address, user_id: token.user_id },
                orderItems: req.body.products.map(product => [product.id, product.quantity])
            }
            try {
                const orderId = await Order.store(data);
                if (parseInt(payment) === 1) {
                    let ipAddr = req.headers['x-forwarded-for'] ||
                        req.connection.remoteAddress ||
                        req.socket.remoteAddress ||
                        req.connection.socket.remoteAddress;
    
                    let date = new Date();
    
                    let createDate = dateFormat(date, 'yyyymmddHHmmss');
                    let amount = total + "";
                    let bankCode = "";
    
                    let orderInfo = notes + " ";
                    let orderType = "billpayment";
                    let locale = 'vn';
                    if (locale === null || locale === '') {
                        locale = 'vn';
                    }
                    let currCode = 'VND';
                    let vnp_Params = {};
                    vnp_Params['vnp_Version'] = '2.1.0';
                    vnp_Params['vnp_Command'] = 'pay';
                    vnp_Params['vnp_TmnCode'] = tmnCode;
                    // vnp_Params['vnp_Merchant'] = ''
                    vnp_Params['vnp_Locale'] = locale;
                    vnp_Params['vnp_CurrCode'] = currCode;
                    vnp_Params['vnp_TxnRef'] = orderId;
                    vnp_Params['vnp_OrderInfo'] = orderInfo;
                    vnp_Params['vnp_OrderType'] = orderType;
                    vnp_Params['vnp_Amount'] = amount * 100;
                    vnp_Params['vnp_ReturnUrl'] = returnUrl;
                    vnp_Params['vnp_IpAddr'] = ipAddr;
                    vnp_Params['vnp_CreateDate'] = createDate;
                    if (bankCode !== null && bankCode !== '') {
                        vnp_Params['vnp_BankCode'] = bankCode;
                    }
    
                    vnp_Params = sortObject(vnp_Params);
                    let signData = querystring.stringify(vnp_Params, { encode: false });
                    let hmac = crypto.createHmac("sha512", secretKey);
                    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
                    vnp_Params['vnp_SecureHash'] = signed;
    
                    res.json(response.createResponse({ vnpUrl: vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false }) }));
                    return;
                }
                return res.json(response.createResponse());
            } catch (error) {
                return res.json(response.createError("Đã có lỗi xảy ra!"));
            }
        } else {
            return res.json(response.createError("Đã có lỗi xảy ra!"));
        }
    },
    createReturnUrl: (req, res, next) => {
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
            Order.update({payment: 1}, vnp_Params['vnp_TxnRef'])
            .then(result => {
                return res.json(response.createResponse());
            })
            .catch(error => {
                return res.json(response.createError("Đã có lỗi xảy ra!"));
            })
        } else {
            return res.json(response.createError("Đã có lỗi xảy ra!"));
        }
    },
    orderCheck: (req, res, next) => {
        const data = {
            phone: req.query.phone,
            id: req.query.order_id,
        }
        Order.find(data)
        .then(orders => {
            return res.json(response.createResponse(orders));
        })
        .catch(error => {
            return res.json(response.createError());
        })
    },
    orderSelf: (req, res, next) => {
        const token = helper.vertifyToken(req.query.token);
        if (token) {
            Order.find({user_id: token.user_id})
            .then(orders => {
                return res.json(response.createResponse(orders));
            })
            .catch(error => {
                return res.json(response.createError());
            })
        } else {
            return res.json(response.createError("Đã có lỗi xảy ra!"));
        }
    },
    orderCancel: (req, res, next) => {
        const token = helper.vertifyToken(req.body.token);
        if (token) {
            Order.update({status: -1}, req.body.order_id)
            .then(rs => {
                return res.json(response.createResponse());
            })
            .catch(error => {
                return res.json(response.createError());
            })
        } else {
            return res.json(response.createError("Đã có lỗi xảy ra!"));
        }
    },
    orderView: (req, res, next) => {
        const token = helper.vertifyToken(req.query.token);
        if (token) {
            Order.findDetail({user_id: token.user_id, id: req.query.order_id})
            .then(orders => {
                return res.json(response.createResponse(orders));
            })
            .catch(error => {
                return res.json(response.createError());
            })
        } else {
            return res.json(response.createError("Đã có lỗi xảy ra!"));
        }
    }
}