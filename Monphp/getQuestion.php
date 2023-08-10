<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mathappusersdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$ID = $_POST['ID'];

$sql = "SELECT * FROM `gradeonequestions` WHERE QUESTIONID = $ID";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(array("error" => "No question found"));
}

$conn->close();
?>

