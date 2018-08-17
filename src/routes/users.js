// Routes for users page
// Sources for signature display: https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html,
// https://stackoverflow.com/questions/22051573/how-to-hide-image-broken-icon-using-only-css-html-without-js
// Sources for storing signature: https://stackoverflow.com/questions/1342506/why-is-form-enctype-multipart-form-data-required-when-uploading-a-file,
// https://stackoverflow.com/questions/10899384/uploading-both-data-and-files-in-one-form-using-ajax/10899796#10899796

module.exports = function () {
    var express = require('express');
    var router = express.Router();
    var base64 = require('node-base64-image');
    const fileUpload = require('express-fileupload');
    router.use(fileUpload());

    // Select the user table to display  
    function getUsers(res, mysql, context, complete) {
        mysql.pool.query("SELECT * FROM users", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    // Get a user by ID to modify
    function getUserID(res, mysql, context, id, complete) {
        mysql.pool.query("SELECT * FROM users WHERE user_id = ?", id, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results[0];
            complete();
        });
    }

    // GET - display current users
    router.get('/', (req, res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'users'
        context.jsscripts = ["deleteUsers.js", "updateUsers.js", "updateSignature.js"];
        getUsers(res, mysql, context, () => {
            res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
            res.render(handlebars_file, context);
        });
    });

    // GET - display a user for the purpose of updating
    router.get('/:id', (req, res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'updateUsers'
        context.jsscripts = ["updateUsers.js"];
        getUserID(res, mysql, context, req.params.id, () => {
            res.render(handlebars_file, context);
        });
    });

    // POST - Add a new user
    router.post('/', (req, res) => {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO users (first_name, last_name, username, password, date, signature, type) VALUES (?,?,?,?,CURDATE(),?,?)";
        var mySig = "";

        // If there is a signature file
        if (typeof req.files.signature != "undefined") {
            if (req.files.signature.name != "undefined") {
                mySig = req.files.signature.data.toString('base64');
            }
        }

        // Add the new user to the database
        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, mySig, req.body.type];
        sql = mysql.pool.query(sql, inserts, (error, results, fields) => {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/users');
            }
        });
    });

    // PUT - Modify the specified user - all but signature
    router.put('/:id', (req, res) => {
        console.log(req.params.id);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET first_name=?, last_name=?, username=?, password=?, type=? WHERE user_id=?";
        var mySig = "";

        console.log(req);

        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.type, req.params.id];
        sql = mysql.pool.query(sql, inserts, (error, results, fields) => {
            if (error) {
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect(303, '/users');
            }
        });
    });

    // GET - display a user signature for the purpose of updating
    router.get('/signature/:id', (req, res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'updateSignature'
        context.jsscripts = ["updateSignature.js"];
        getUserID(res, mysql, context, req.params.id, () => {
            res.render(handlebars_file, context);
        });
    });

    // PUT - Modify the signature
    router.put('/signature/:id', (req, res) => {
        console.log(req.params.id);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET signature=? WHERE user_id=?";
        var mySig = "";

        // If there is a signature file
        if (typeof req.files.signature != "undefined") {
            if (req.files.signature.name != "undefined") {
                mySig = req.files.signature.data.toString('base64');
            }
        }
        console.log("my sig is");
        console.log(mySig);

        var inserts = [mySig, req.params.id];
        sql = mysql.pool.query(sql, inserts, (error, results, fields) => {
            if (error) {
                console.log(error);
                console.log("error");
                res.write(JSON.stringify(error));
                res.end();
            } else {
                console.log("in redirect");
                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                res.redirect(303, '/users');
            }
        });
    });

    // DELETE - Delete the specified user
    router.delete('/:id', (req, res) => {
        console.log("in delete");
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM users WHERE user_id = ?";
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