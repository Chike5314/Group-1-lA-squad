<?php
include'connect.php';
  
 if(isset($_POST['signup'])){
    $firstname=$_POST['firstname'];
    $lastname=$_POST['lastname'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    $password=md5($password);

    $checkemail= "SELECT * FROM user_info WHERE email='$email'";
    $result=$conn->query($checkemail);
    if($result->num_rows>0){
        echo "Email Adress Already exists!";
    }
else{
        // Insert new user into the database
        $stmt = $conn->prepare("INSERT INTO user_info (firstname, lastname, email, password) VALUES (?, ?, ?,?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $email, $password);

        if ($stmt->execute()) {
            // Redirect to the home page upon successful signup
            header("Location: index.html");
            exit();
        } else {
            echo "Error: " . $stmt->error;
        }

    }
    $stmt->close();
    
}
$conn->close();


?>