//sentType Award History ROUTES 

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', (req,res) => {
        var context = {};
        console.log("in routes");
        var mysql = req.app.get('mysql');
        var handlebars_file = 'sentType';
        context.jsscripts = ['sentType.js'];
        res.render(handlebars_file, context);
    });
    
    return router;
}();