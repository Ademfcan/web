<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mathappusersdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['User'];
$password = $_POST['Pass'];
$points = 0;

$sql = "INSERT INTO userinfo (Name, Password, Point) VALUES ('$name', '$password',$points)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
