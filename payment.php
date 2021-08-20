<?php
if (isset($_POST['card_name'])) {
    if (isset($_POST['card_number']) && isset($_POST['expire_month'])&&
        isset($_POST['expire_year']) && isset($_POST['cvc']) &&
        isset($_POST['default_payment'])) {

        $card_name=$_POST['card_name'];
        $card_number = $_POST['card_number'];
        $expire_month = $_POST['expire_month'];
        $expire_year = $_POST['expire_year'];
        $cvc = $_POST['cvc'];
        $default_payment = $_POST['default_payment'];


        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "hangongshangqu";

        $conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

        if ($conn->connect_error) {
            die('Could not connect to the database.');
        }

        else {
            $Select = "SELECT card_number FROM payment WHERE card_number = ? LIMIT 1";
            $Insert="INSERT INTO payment(card_name, card_number, expire_month, expire_year, cvc,default_payment) values(?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($Select);
            $stmt->bind_param("s", $card_number);
            $stmt->execute();
            $stmt->bind_result($resultcard_number);
            $stmt->store_result();
            $stmt->fetch();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();

                $stmt = $conn->prepare($Insert);
                $stmt->bind_param("ssssss",$card_name, $card_number, $expire_month, $expire_year, $cvc,$default_payment);
                if ($stmt->execute()) {
                    header("Location:payment_successfully.html");
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Incorrect card information";
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