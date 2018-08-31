let express = require('express'),
    router = express.Router(),
    Middleware = require('../Middleware'),
    Controller = require('../Controllers'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();


/* GET users listing. */
router.get('/login', Controller.admin.adminLogin);


module.exports = router;
