// Routes for showing the analytics pages

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET analytics - initial page
    router.get('/', (req,res) => {
        res.render('show-analytics');
    });

return router;
}();