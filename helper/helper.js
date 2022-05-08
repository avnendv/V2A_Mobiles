const jwt = require("jsonwebtoken");

module.exports.vertifyToken = (tokenValue) => {
    const token = jwt.verify(tokenValue, process.env.SECRET);
    try {
        if (token) {
            return token;
        }
        return false;
    } catch (error) {
        return false;
    }
}

module.exports.hanldeErrors = (errors) => {
    return errors.reduce((data, error) => {
        data[error.param] = data[error.msg] || error.msg;
        return data;
    }, {});
}