const Blog = require('../../models/Blog');
const urlSlug = require('url-slug');

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
    const data = {
        title: req.body.title,
        content: req.body.content,
        avatar: req.body.avatar,
        slug: urlSlug.convert(req.body.title),
        user_id: 1,
    }
    Blog.store(data)
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
    const data = {
        title: req.body.title,
        content: req.body.content,
        avatar: req.body.avatar,
        slug: urlSlug.convert(req.body.title),
    }
    Blog.update(data, req.params.id, 1)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
module.exports.destroy = (req, res, next) => {
    Blog.destroy(req.params.id, 1)
    .then(() => {
        res.redirect('back');
    })
    .catch(next);
}
