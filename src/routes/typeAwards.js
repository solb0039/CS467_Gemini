// Routes for showing the analytics page for how many of each type of award have been created

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET created awards chart
    router.get('/', (req,res) => {
        var context = {};
        console.log("in routes");
        var mysql = req.app.get('mysql');
        var handlebars_file = 'typeAwards';
        context.jsscripts = ['typeAwards.js'];
        res.render(handlebars_file, context);
    });
    
    return router;
}();