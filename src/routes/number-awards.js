// Routes for number awards page

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET admin - initial page
    router.get('/', (req,res) => {
        res.render('number-awards');
    });

return router;
}();