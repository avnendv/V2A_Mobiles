
const web = require('./web');
const api = require('./api');
const linksAdmin = require('../widgets/linksAdmin');
const requireLogin = require('../middlewares/loginAdminMiddleware').requireLogin;

function router(app){
    // Add headers before the routes are defined
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    // API
    app.use('/api', api);

    //Pages Client
    app.use('/admin', requireLogin, linksAdmin, web);
}

module.exports = router;
