// Description: sample functionality

module.exports = function () {
	console.log("here");
    var express = require('express');
    var router = express.Router();

    function getUserName(res, mysql, context, complete){
        mysql.pool.query("SELECT first_name FROM users", function(error, results, fields){
			console.log("in login");
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users  = results;
            complete();
        });
    }
	
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
