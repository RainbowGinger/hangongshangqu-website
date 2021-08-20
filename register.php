<?php
if (isset($_POST['submit'])) {
    if (isset($_POST['first_name']) && isset($_POST['last_name'])&& 
        isset($_POST['email']) && isset($_POST['password1']) && 
        isset($_POST['password2'])) {

        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $password1 = $_POST['password1'];
        $password2 = $_POST['password2'];

        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "hangongshangqu";

        $conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

        if ($conn->connect_error) {
            die('Could not connect to the database.');
        }

        else {
            $Select = "SELECT email FROM register WHERE email = ? LIMIT 1";
            $Insert = "INSERT INTO register(first_name, last_name, email, password1, password2) values(?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($Select);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->bind_result($resultEmail);
            $stmt->store_result();
            $stmt->fetch();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();

                $stmt = $conn->prepare($Insert);
                $stmt->bind_param("sssss",$first_name, $last_name, $email, $password1, $password2);
                if ($stmt->execute()) {
                    header("Location:register_successfully.html");
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Someone already registers using this email.";
            }
            $stmt->close();
            $conn->close();
        }
    }
    else {
        echo "All field are required.";
        die();
    }
}
else {
    echo "Submit button is not set";
}
?>
