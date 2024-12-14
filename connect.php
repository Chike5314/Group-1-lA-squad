<?php

// Database connection settings
$host = 'localhost'; // Change as necessary
$db = 'busstationdatabase'; // Change to your database name
$user = 'root'; // Change to your database username
$pass = ''; // Change to your database password

// Create a connection
$conn = new mysqli($host, $user, $pass, $db);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>