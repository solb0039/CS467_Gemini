// Routes for users page

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
            complete();
        });
    }

    // GET - display current users
    router.get('/', (req,res) => {
        var context = {};
        context.jsscripts = ["deleteUsers.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'users'

        getUsers(res, mysql, context, complete);
        function complete(){
            res.render(handlebars_file, context);
        }
    });

    // POST - Add a new user
    router.post('/', (req, res) => {
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO users (first_name, last_name, username, password, date, signature, type) VALUES (?,?,?,?,CURDATE(),?,?)";
        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.signature, req.body.type];
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
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE users SET first_name=?, last_name=?, username=?, password=?, signature=?, type=? WHERE user_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.signature, req.body.type, req.params.id];
		console.log(inserts);
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    // DELETE - Delete the specified user
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM users WHERE user_id = ?";
        var inserts = [req.params.id];
		console.log(inserts);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
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