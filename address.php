<?php
if (isset($_POST['submit'])) {
    if (isset($_POST['country']) && isset($_POST['fullname'])&& 
        isset($_POST['phonenumber']) && isset($_POST['address1']) && 
        isset($_POST['address2']) && isset($_POST['city']) && 
        isset($_POST['state']) && isset($_POST['zipcode']) && 
        isset($_POST['remember'])) {

        $country=$_POST['country'];    
        $fullname = $_POST['fullname'];
        $phonenumber = $_POST['phonenumber'];
        $address1 = $_POST['address1'];
        $address2 = $_POST['address2'];
        $city = $_POST['city'];
        $state = $_POST['state'];
        $zipcode = $_POST['zipcode'];
        $remember = $_POST['remember'];

        $host = "localhost";
        $dbUsername = "root";
        $dbPassword = "";
        $dbName = "hangongshangqu";

        $conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

        if ($conn->connect_error) {
            die('Could not connect to the database.');
        }

        else {
            $Select = "SELECT fullname FROM address WHERE fullname = ? LIMIT 1";
            $Insert="INSERT INTO address(country, fullname, phonenumber, address1, address2,city,state,zipcode,remember) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($Select);
            $stmt->bind_param("s", $fullname);
            $stmt->execute();
            $stmt->bind_result($resultfullname);
            $stmt->store_result();
            $stmt->fetch();
            $rnum = $stmt->num_rows;

            if ($rnum == 0) {
                $stmt->close();

                $stmt = $conn->prepare($Insert);
                $stmt->bind_param("ssissssis",$country, $fullname, $phonenumber, $address1, $address2,$city,$state,$zipcode,$remember);
                if ($stmt->execute()) {
                    header("Location:address_successfully.html");
                }
                else {
                    echo $stmt->error;
                }
            }
            else {
                echo "Someone already registers using this fullname.";
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