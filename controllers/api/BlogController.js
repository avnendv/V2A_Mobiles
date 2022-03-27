const Blog = require('../../models/Blog');
const response = require('../../requests/response');

module.exports.get = (req, res, next) => {
    Blog.find(req.body)
    .then(blogs => {
        return res.json(response.createResponse(blogs));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
module.exports.detail = (req, res, next) => {
    Blog.findById(req.body.id)
    .then(blog => {
        return res.json(response.createResponse(blog));
    })
    .catch(error => {
        return res.json(response.createError(error));
    })
}
