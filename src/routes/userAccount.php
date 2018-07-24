<?php

require_once("dbStart.php");
session_start();

if(!isset($_SESSION['type'])) {
    header('Location: index.php');
    exit();
}

$mysqli = new mysqli(DBhost,DBuser,DBpassword,DBdatabase);
if($mysqli->connect_errno){
    echo "ERROR CONNECTING" . $mysqli->connect_errno . " " . $mysqli->connect_error;
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <title>User Account Information</title>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <ul class="nav nav-sidebar">
                <li><a href="newAward.php">Create New Award</a></li>
                <li><a href="sentType.php">Award History</a></li>
                <li class="active"><a href="userAccount.php">Account Information</a></li>
            </ul>

        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 class="page-header">Account Information</h1>

            <div class="panel-group">
                <div class="panel panel-default">
                    <div class="panel-heading">Username: </div>
                    <div class="panel-body"><?php echo $_SESSION["username"] ?></div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Full Name: </div>
                    <div class="panel-body">
                        <?php
                        while($stmt->fetch()){
                            echo $first_name . ' ' . $last_name;
                        }
                        $stmt->close();
                        ?>
                    </div>

                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">Signature on File: </div>
                    <div class="panel-body">
                        <?php
                        //Signature will appear here
                        while($stmt->fetch()){
                        
                            //If no signature is added yet: Do this later. 
                            if ($signature == "") {
                                echo "<p style='color:red;'>Warning: You have no signature in the database yet.</p>";   
                            }
                            
                            else {
                                //echo '<img src="THIS WILL BE SIGNATURE LATER"/>';
                            }
                        }
                        $stmt->close();
                        ?>
                    </div>
                </div>
            </div>
        <ul> 
            <li><a href="editAccountInfo.php" class="btn btn-md btn-primary" role="button">Edit User Information</a></li>
            <li><a href="changePassword.php" class="btn btn-md btn-primary" role="button">Change Password</a></li>
        </ul>
        </div>
    </div>
</div>

</body>
</html>