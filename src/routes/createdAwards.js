// Routes for showing the analytics page for users who have created awards

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // Select the users who have created awards  
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT users.first_name, users.last_name, users.user_id FROM users INNER JOIN awards ON users.user_id = awards.user_id", (error, results, fields) => {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context  = results;
            console.log("in getUsers");
            console.log(context);
            complete();
        });
    }

    // GET created awards bar chart
    router.get('/', (req,res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'createdAwards';
        console.log("in created awards");
        context.jsscripts = ['showCreatedAwards'];
        getUsers(res, mysql, context, ()=> {
            res.render(handlebars_file, context);
        });
    });

return router;
}();