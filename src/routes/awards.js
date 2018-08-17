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
        var user_type = "regular";

	    // Query users database to get active user ids for rendering in the awards view
	    mysql.pool.query("SELECT * FROM users WHERE users.type=?", user_type, (error, user_results, fields) =>{
	    	if (error) {
			res.write(JSON.stringify(error));
			res.end();
		}
		// Create new array of user ids and attach to context
		var all_user_ids = {};
		var length = user_results.length;
		for (var i = 0; i < length; i++){
			all_user_ids[i] = user_results[i].user_id;
		}
		context.users.u_ids = all_user_ids;            
		complete();
	    });
        });
    }

    // GET - display current awards
    router.get('/', (req, res) => {
        var context = {};
        var mysql = req.app.get('mysql');
        var handlebars_file = 'awards'
        context.jsscripts = ["deleteAwards.js"];
        getAwards(res, mysql, context, () => {
              //console.log(res)
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
		sendAward(res, mysql, req.body);
                res.redirect('/awards');
            }
        });
    });
   
   // Function that takes database information to populate a .csv file for subsequent use by LaTeX
   function sendAward(res, mysql, awardInfo){
	const fs = require('fs');
	var filename = "inputData.csv";
	var data = "FName,LName,AwFName,AwLName,AwardType\n";

	console.log("in send award, req.body is: ");
	console.log(awardInfo);
	
	//get awarder info from user_id and write PDF award
	var u_id = awardInfo.user_id;
		
	var context = {};
	mysql.pool.query("SELECT * FROM users WHERE user_id = ?", u_id, (error, results, fields) =>{
 	if (error) {
               		res.write(JSON.stringify(error));
                 	res.end();
		}
        	context.user = results[0];

		//Populate csv file with award information
		data += awardInfo.first_name + ", " + awardInfo.last_name + ", " + context.user.first_name + ", " + context.user.last_name + ", " + awardInfo.type +"\n";		
		
		fs.writeFile(filename, data, function(error){
        	        if(error) throw error;
                	console.log("wrote file");
		});

	
		//Convert signature in database to image file
		var buffer = new Buffer(context.user.signature.toString('utf8'), 'base64');
		
		fs.writeFile("signature.png", buffer, function(err){
			if (err){
				console.log("error writing image");
			}
			else{
				console.log("Successfully converted signature image");
			}
		});		

	
		//Get award ID which is primary key from awards table
		mysql.pool.query("SELECT award_id FROM awards WHERE type = ? AND first_name = ? AND last_name = ? AND email = ? AND date = ? AND user_id = ?", [awardInfo.type, awardInfo.first_name, awardInfo.last_name, awardInfo.email, awardInfo.date, awardInfo.user_id], (error, results) =>{
 		if (error) {
               		res.write(JSON.stringify(error));
                 	res.end();
			res.redirect('/awards');
		}
        	award_ID = results[0].award_id;
		
		// Add awarder name to function call.  TODO: Instead of passing, add query to writePDF fn to get awarder name
		awardInfo.AwName = context.user.first_name + " " +  context.user.last_name;	
	
		writePDF(fs, award_ID, awardInfo);
		
		});
	});
   } 

    // Function that reads populated inputData.csv file with LaTeX file AwardCert.tex to generate PDF certificate
    // Code adopted from node-latex documentation
    function writePDF(fs, award_ID, awardInfo){
        filename =  require('path').resolve(__dirname, '../awardCert.tex');
        
	//code adapted from node-latex github example
        const latex = require('../node_modules/node-latex/');
	const input = fs.createReadStream(filename);
        var output_filename = "award_" + award_ID + ".pdf";
        const output = fs.createWriteStream(output_filename);

        const pdf = latex(input);
        pdf.pipe(output);
        pdf.on('error', function (error) {
            if (error) throw error;
        });
        pdf.on('finish', function () {
                console.log('PDF generated.');
                sendPDF(output_filename, awardInfo);
        });
    }


    // Function that takes exisiting PDF award certificate and emails to awardee
    function sendPDF(output_filename, awardInfo){
	console.log('in sendPDF');
        const nodemailer = require('nodemailer');

        nodemailer.createTestAccount((err, account) => {
        
		// create reusable transporter object using the default SMTP transport
       		let transporter = nodemailer.createTransport({
                	host: 'smtp.gmail.com',  
                	port: 465,
                	secure: true,
                	auth: {
                        	user: 'CS467.Gemini@gmail.com',  
                        	pass: 'Gemini_Password2018'  
			}	
        });

        // Get path of award certificate
	cur_path =  require('path').resolve(__dirname, '../');
	
	// Set up mail options
        let mailOptions = {
                from: '"Team Gemini" <CS467.Gemini@gmail.com>', // sender address
                to: awardInfo.email, // list of receivers
                subject: "Award Certificate from " +  awardInfo.AwName, // Subject line
                text: 'Congrats, ' +  awardInfo.first_name + ', you have received an award for being the '+ awardInfo.type, // plain text body
                attachments: [
                {   // file on disk as an attachment
                        filename: output_filename,
                        path: cur_path + "/" + output_filename  // stream this file
                }
                ]
        };

        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
			console.log(error);
               		removeCertificate(output_filename);
			return console.log(error);
		}
                console.log('Message sent: %s response was %s', info.messageId, info.response);
                
		removeCertificate(output_filename);	
		});
        });	
   }

    // RESEND- Resend existing award
    router.get('/resendAward/:id', (req, res) => {
	console.log('in resend');
	//console.log('parmas is ', [req.params.id]);

	var mysql = req.app.get('mysql');
	mysql.pool.query("SELECT * FROM awards WHERE award_id = ?", [req.params.id], (error, results) => {
             if (error) {
                 res.write(JSON.stringify(error));
                 res.end();
             } else { 
  		award_info = results[0];
		sendAward(res, mysql, award_info);
		res.redirect('/awards');
    	    }
         });
     });

    function removeCertificate(filename){
	//Remove certificate file from directory
	const fs = require('fs');
	fs.unlink(filename, (err) => {
  		if (err) throw err;
 	 	console.log('successfully deleted ' + filename);
	});
    }
   
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
