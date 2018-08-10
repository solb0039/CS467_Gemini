// Routes for awards page

module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var base64 = require('node-base64-image');
    const fileUpload = require('express-fileupload');
    router.use(fileUpload());

    // Select the awards table to display  
    function getAwards(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM awards", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    // GET - display current awards
    router.get('/', (req, res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'awards'
        context.jsscripts = ["deleteAwards.js"];
        getAwards(res, mysql, context, () => {
            res.render(handlebars_file, context);
        });
    });

    // POST - Add a new award
    router.post('/', (req, res) => {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO awards (type, first_name, last_name, email, time, date, user_id) VALUES (?,?,?,?,CURDATE(),?,?)";
        console.log(req.body);

        // Add the new award to the database
        var inserts = [req.body.type, req.body.first_name, req.body.last_name, req.body.email, req.body.date, req.body.user_id];
        sql = mysql.pool.query(sql, inserts, (error, results, fields) => {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/awards');
            }
        });
    });

    // DELETE - Delete the specified award
    router.delete('/:id', (req, res) => {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM awards WHERE award_id = ?";
        var inserts = [req.params.id];
        console.log(inserts);
        sql = mysql.pool.query(sql, inserts, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })

    return router;
}();