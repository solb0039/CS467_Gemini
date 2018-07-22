// Routes for analytics data

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET created awards 
    router.get('/created', (req,res) => {
        var context = [];
        var mysql = req.app.get('mysql');
    
        mysql.pool.query("SELECT users.first_name, users.last_name, users.user_id FROM users INNER JOIN awards ON users.user_id = awards.user_id GROUP BY users.user_id", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                var nextName = row.first_name + " " + row.last_name;
                //console.log(nextName)
                context.push([nextName, 1]);
            }

            res.json(context);
        });
    });

    // GET received awards 
    router.get('/received', (req,res) => {
        var context = [];
        var mysql = req.app.get('mysql');
    
        mysql.pool.query("SELECT awards.first_name, awards.last_name, awards.award_id FROM awards GROUP BY awards.first_name, awards.last_name", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                var nextName = row.first_name + " " + row.last_name;
                //console.log(nextName)
                context.push([nextName, 1]);
            }

            res.json(context);
        });
    });

    return router;
}();