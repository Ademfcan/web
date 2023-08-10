<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mathappusersdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$User = $_POST['User'];
$Pass = $_POST['Pass'];

// Perform a database query to validate the user
$sql = "SELECT * FROM userinfo WHERE Name = '$User' AND Password = '$Pass'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "true";
} else {
    echo "false";
}

$conn->close();
?>
