<?php
require "dbStart.php";

session_start();

if(isset($_SESSION['ype'])) {
    if($_SESSION['type'] === "regular") {
        header('Location: userHome.js');
        exit();
    } 
    else if($_SESSION['type'] === "admin") {
        header('Location: admin.js');
        exit();
    }
}


$mysqli = new mysqli(DBhost,DBuser,DBpass,DBdatabase);
if($mysqli->connect_errno)
    {
    echo "ERROR CONNECTING" . $mysqli->connect_errno . " " . $mysqli->connect_error;
    }


if (isset($_POST['emailInput']) && isset($_POST['passwordInput'])) {
    $username = $_POST['emailInput'];
    $password = $_POST['passwordInput'];

    if(!$stmt->fetch()){
        unset($_SESSION['username']);
        unset($_SESSION['user_id']);
        unset($_SESSION['type']);
        $stmt->close();
    }
    else {
        $_SESSION['username'] = $username;
        $_SESSION['type'] = $type;
        $_SESSION['user_id'] = $user_id;
        $stmt->close();
        if($type == "admin") {
            header('Location: admin.js');
            exit();
        }
        else {
            header('Location: userHome.js');
            exit();
        }
    }
}
?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Employee Recognition Award Database</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="cover.css" rel="stylesheet">
</head>
<body>

<div class="site-wrapper">
    <div class="container">
         <div class="jumbotron">
            <h2><strong>Employee Recognition Awards</strong></h2>
            <p class="lead">Welcome to the employee recognition award database! </p>
    </div>
        <form class="form-signin" action="index.php" method="post">
            <h2 class="form-signin-heading">LOGIN</h2>
            <label for="username" class="sr-only">username:</label>
            <input type="email" id="username" name="username" class="form-control" placeholder="<insert email>" required autofocus>
            <label for="password" class="sr-only">Password:</label>
            <input type="password" id="password" name="password" class="form-control" placeholder="<insert password>" required>
            <button class="btn btn-lg btn-primary btn-block" type="submit">SIGN IN</button>
        </form>
        <a href="retrievePassword.php">I forgot my password</a>
    </div>
</div>

</body>
</html>
