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
$Amount = $_POST['Amount'];

$sql = 
        "   UPDATE userinfo
            SET Point = Point + $Amount
            WHERE Name = '$name';
        ";


if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
