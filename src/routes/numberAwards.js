// Routes for showing the analytics page for the number of awards created by each user

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET created awards chart
    router.get('/', (req,res) => {
        var context = {};
        console.log("in routes");
        var mysql = req.app.get('mysql');
        var handlebars_file = 'numberAwards';
        context.jsscripts = ['numberAwards.js'];
        res.render(handlebars_file, context);
    });
    
    return router;
}();