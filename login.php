<?php
include 'connect.php';
if(isset($_POST['login'])){
    $email=$_POST['email'];
    $password=$_POST['password'];
    $password=md5($password);

        // Prepare and bind
        $stmt ="SELECT  * FROM user_info WHERE email = 'email' AND password = 'password'";
        $result=$conn->query($stmt);

        // Check if the email exists
        if ($result->num_rows > 0) {
            session_start();
           $row=result->fetch_assoc();
            $_SESSION['email'] = $row['email'];
            header('Location: index.html');
            exit();
            } else {
                // Invalid password
                $error_message = "Invalid password.";
            }
        // Close the statement
    }
// Close the database connection
$conn->close()
?>