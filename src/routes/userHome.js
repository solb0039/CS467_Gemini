module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', (req,res) => {
        res.render('userHome');
    });

return router;
}();