// Routes for showing the analytics page for how many of each type of award have been created

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    // Select the users who have created awards  
    function getUsers(res, mysql, context, complete){
        mysql.pool.query("SELECT type, COUNT(*) FROM awards GROUP BY type", (error, results, fields) => {
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users  = results;
            console.log("in getUsers");
            console.log(context);
            complete();
        });
    }

    // GET created awards bar chart
    router.get('/', (req,res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'typeAwards';
        //context.jsscripts["typeAwards"];
        getUsers(res, mysql, context, ()=> {
            res.render(handlebars_file); //, context);
        });
    });

return router;
}();