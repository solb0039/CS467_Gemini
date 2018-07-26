// Routes for Google Chart analytics data

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // GET who has created awards 
    router.get('/created', (req, res) => {
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

    // GET who has received awards 
    router.get('/received', (req, res) => {
        var context = [];
        var mysql = req.app.get('mysql');

        mysql.pool.query("SELECT awards.first_name, awards.last_name, awards.award_id, COUNT(awards.last_name) as count FROM awards GROUP BY awards.last_name, awards.first_name", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                var nextName = row.first_name + " " + row.last_name;
                //console.log(nextName)
                var nextCount = row.count;
                context.push([nextName, nextCount]);
            }

            res.json(context);
        });
    });

    // GET number of created awards 
    router.get('/number', (req, res) => {
        var context = [];
        var mysql = req.app.get('mysql');

        mysql.pool.query("SELECT users.first_name, users.last_name, users.user_id, COUNT(*) as count FROM users INNER JOIN awards ON users.user_id = awards.user_id GROUP BY users.user_id", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                console.log(row);
                var nextName = row.first_name + " " + row.last_name;
                var nextCount = row.count;
                context.push([nextName, nextCount]);
            }

            res.json(context);
        });
    });


    // GET which employees have received which type of award 
    router.get('/type', (req, res) => {
        var context = [];
        var mysql = req.app.get('mysql');

        mysql.pool.query("SELECT awards.first_name, awards.last_name, type FROM awards ORDER BY awards.last_name", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                console.log(row);
                var nextName = row.first_name + " " + row.last_name;
                var nextType = row.type;
                context.push([nextName, nextType]);
            }

            res.json(context);
        });
    });

    // GET how many of which type of awards have been created
    router.get('/howmany', (req, res) => {
        var context = [];
        var mysql = req.app.get('mysql');

        mysql.pool.query("SELECT type, COUNT(*) as count FROM awards GROUP BY type", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            for (var i = 0; i < results.length; i++) {
                var row = results[i];
                console.log(row);
                var nextType = row.type;
                var nextCount = row.count;
                context.push([nextType, nextCount]);
            }

            res.json(context);
        });
    });
    
    return router;
}();