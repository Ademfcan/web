<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mathappusersdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['Name'];

$sql = "SELECT Point FROM userinfo WHERE Name = '$name'";
$result = $conn->query($sql);

if ($result !== false) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $points = $row['Point'];
        echo "$points";
    } else {
        echo "No records found for the specified name.";
    }
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
