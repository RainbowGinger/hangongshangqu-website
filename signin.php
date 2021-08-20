<?php 

$sname= "localhost";
$unmae= "root";
$password = "";
$db_name = "hangongshangqu";

$conn = mysqli_connect($sname, $unmae, $password, $db_name);
if (!$conn) {
	echo "Connection failed!";
}


if(isset($_POST['username'])){
    
    $uname=$_POST['username'];
    $password=$_POST['password'];
    
    $sql="select * from register where email='".$uname."'AND password1='".$password."' limit 1";
    
    $result=mysqli_query($conn, $sql);
    
    if(mysqli_num_rows($result)==1){
        echo " You Have Successfully Logged in";
		header("Location: home_user.html");
        exit();
    }else{
		header("Location: signin_error.html?error=Incorect User name or password");
        exit();
    }
        
}
?>