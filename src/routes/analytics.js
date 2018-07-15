// Routes for analytics page

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET analytics - initial page
    router.get('/', (req,res) => {
        res.render('analytics');
    });

return router;
}();