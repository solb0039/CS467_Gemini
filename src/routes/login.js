// Description: sample functionality

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
		console.log("in router");
        var context = {};
        var mysql = req.app.get('mysql');
        getUserName(res, mysql, context, complete);
        function complete(){
			res.render('login', context);
        }
    });

    return router;
}();
