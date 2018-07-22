// Routes for showing the analytics page 

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET created awards chart
    router.get('/', (req,res) => {
        var context = {};
        console.log("in routes");
        var mysql = req.app.get('mysql');
        var handlebars_file = 'createdAwards';
        context.jsscripts = ['createdAwards.js'];
        res.render(handlebars_file, context);
    });
    
    return router;
}();