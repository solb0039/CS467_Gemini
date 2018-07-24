<?php
session_start();

if(!isset($_SESSION['type'])) {
    header('Location: index.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Create New Employee Recognition Award</title>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li><a href="sentType.js">Award History</a></li>
                <li><a href="userAccount.php">Account Information</a></li>
            </ul>

        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header">Send New Award</h1>
            <form class="form-horizontal" action="award.php" method="post">
                <div class="form-group">
                    <label class="control-label col-sm-2">Award Type:</label>
                    <div class="col-sm-8">
                        <div class="radio">
                            <label><input type="radio" name="type" value="Employee of the Week" checked>Employee of the Week</label>
                        </div>
                        <div class="radio">
                            <label><input type="radio" name="type" value="Employee of the Month">Employee of the Month</label>
                        </div>
                         <div class="radio">
                            <label><input type="radio" name="type" value="Employee of the Quarter">Employee of the Quarter</label>
                        </div>
                         <div class="radio">
                            <label><input type="radio" name="type" value="Employee of the Year">Employee of the Year</label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="control-label col-sm-2" id="first_name">Recipient First Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Jane" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" id="last_name">Recipient Last Name:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Doe" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="email">Recipient's Email Address:</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" name="email" placeholder="janed@email.com" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="time">Award Time:</label>
                    <div class="col-sm-10">
                        <input type="time" class="form-control" id="time" name="time" placeholder="01:30" required>
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label col-sm-2" for="awardDateInput">Award Date:</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="date" name="date" placeholder="mm/dd/yyyy" required>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-lg btn-primary ">Submit Award</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>