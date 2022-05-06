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
    Blog.findBySlug(req.params.slug)
    .then(blog => {
        if (blog[0].id) {
            let setView = blog[0].view;
            Blog.updateView(++setView, blog[0].id)
            .then((blogUpdate) => {
                return res.json(response.createResponse({...blog[0], view: setView}));
            })
            .catch(error => {
                return res.json(response.createError());        
            })
        }
    })
    .catch(error => {
        return res.json(response.createError());
    })
}
