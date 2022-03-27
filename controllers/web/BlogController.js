const Blog = require('../../models/Blog');

module.exports.index = (req, res, next) => {
    Blog.find(req.query)
    .then(blogs => {
        res.render('admin/blog/index', {blogs: blogs, query: req.query });
    })
    .catch(next);
}
module.exports.create = (req, res, next) => {
    res.render('admin/blog/create');
}
module.exports.store = (req, res, next) => {
    Blog.store(req.body)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.edit = (req, res, next) => {
    Blog.findById(req.params.id)
    .then(blog => {
        res.render('admin/blog/edit', { blog: blog })
    })
    .catch(next);
}
module.exports.update = (req, res, next) => {
    Blog.update(req.body, req.params.id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Blog.destroy(req.params.id)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
