
const web = require('./web');
const api = require('./api');
const linksAdmin = require('../widgets/linksAdmin');

function router(app){
    // API
    app.use('/api', api);

    //Pages Client
    app.use('/admin', linksAdmin, web);
}

module.exports = router;
