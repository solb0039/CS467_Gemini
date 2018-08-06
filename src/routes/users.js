// Routes for users page
// Sources for image display: https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html,
// https://stackoverflow.com/questions/22051573/how-to-hide-image-broken-icon-using-only-css-html-without-js

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // Select the user table to display  
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM users", (error, results, fields) => {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users  = results;
            console.log(context.users);
            complete();
        });
    }

    // Get a user by ID to modify
    function getUserID(res, mysql, context, id, complete){
        mysql.pool.query("SELECT * FROM users WHERE user_id = ?", id, (error, results, fields) => {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users  = results[0];
            complete();
        });
    }

    // GET - display current users
    router.get('/', (req,res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'users'
        context.jsscripts = ["deleteUsers.js", "updateUsers.js"];
        getUsers(res, mysql, context, ()=> {
            res.render(handlebars_file, context);
        });
    });

     // GET - display a user for the purpose of updating
     router.get('/:id', (req,res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'updateUsers'
        context.jsscripts = ["updateUsers.js"];
        getUserID(res, mysql, context, req.params.id, ()=> {
            res.render(handlebars_file, context);
        });
    });

    // GET - display a user signature
    router.get('/signature/:id', (req,res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'signature'
        context.jsscripts = ["updateUsers.js"];
        getUserID(res, mysql, context, req.params.id, ()=> {
            res.render(handlebars_file, context);
        });
    });

    // POST - Add a new user
    router.post('/', (req, res) => {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO users (first_name, last_name, username, password, date, signature, type) VALUES (?,?,?,?,CURDATE(),?,?)";
        var updated_signature = req.body.signature;
        
        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, updated_signature, req.body.type];
        sql = mysql.pool.query(sql,inserts,(error, results, fields) => {
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/users');
            }
        });
    });

    // PUT - Modify the specified user
    router.put('/:id', (req, res) => {
        console.log(req.params.id);
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET first_name=?, last_name=?, username=?, password=?, signature=?, type=? WHERE user_id=?";
        var updated_signature = req.body.signature;

        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, updated_signature, req.body.type, req.params.id];
        sql = mysql.pool.query(sql,inserts,(error, results, fields) => {
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
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
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

return router;
}();