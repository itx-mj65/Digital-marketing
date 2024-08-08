<?php  

$host = "localhost";
$user = "root";
$pass = "";
$db = "massage";

$conn = mysqli_connect($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
    echo "Connection failed: " . mysqli_connect_error();
    exit();
}

if (isset($_POST["submit"])) {
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $subject = mysqli_real_escape_string($conn, $_POST["subject"]);
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    $send = "INSERT INTO contact_msg (name, email, subject, massages) VALUES ('$name', '$email', '$subject', '$message')";
    $run = mysqli_query($conn, $send);

    if ($run) {
        mysqli_close($conn);
        echo "<script>
            alert('The message was sent successfully');
            window.location.href = './contact-us.html';
        </script>";
        exit(); // Ensure no further code is executed
    } else {
        echo "There is an error: " . mysqli_error($conn);
    }
}
?>
