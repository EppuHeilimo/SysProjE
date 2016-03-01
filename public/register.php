﻿<?php
/**
 * Account registration form.
 */

require_once(__DIR__ . "/../config/config.php");
require_once(__DIR__ . "/../lib/util.functions.php");
autoloader(__DIR__ . "/../lib/");
autoloader(__DIR__ . "/../lib/dao/");

// avoid sending passwords over an unsecured connection
requireSSL();

$session = Session::start();
$user = getUser();
// Redirect if we're already logged in
if (isset($user) && $user->loggedIn()) {
	header("Location: index.html");
	exit();
}

$warnings = array();

if (isset($_POST['submit'])) {
	if (isset($_POST['passwd']) && isset($_POST['passwd2']) && 
		isset($_POST['username'])) {
		
		$passwd = $_POST['passwd'];
		$passwd2 = $_POST['passwd2'];
		$username = $_POST['username'];
		
		// validate password and username
		if($passwd != $passwd2) {
			$warnings[] = "Passwords don't match";
		}
		if (!isValidPassword($passwd)) {
			$warnings[] = "Not a valid password (longer than " . 
				MIN_PASSWORD_LENGTH . " characters required)";
		}
		if (!isValidUsername($username)) {
			$warnings[] = "Not a valid username (longer than " . 
				MIN_USERNAME_LENGTH . " characters required)";
		}
		
		// No warnings means everything is in order, and we can create the user
		if (count($warnings) == 0) {
			$dao = new UserDAO();
			if ($dao->userExists($username)) {
				$warnings[] = "Username already taken";
			}
			else {
				$password = pw_encode($password);
				if (!$dao->createUser($username, $password)) {
					$warnings[] = "Failed to insert to database";
				}
				else {
					// Registration was successful, redirect the user to
					// the login screen
					$session->set('registration_successful', true);
					header("Location: login.php");
					exit();
				}
			}
		}
	}
}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Register</title>
	</head>

	<body>
		<form method="post" action="register.php">
			<input type="text" name="username" placeholder="Type a username">
			<input type="password" name="passwd" placeholder="Type a password">
			<input type="password" name="passwd2" placeholder="Retype password">
			<input type="submit" name="submit" value="Register">
		</form>
		<?php foreach ($warnings as $warning): ?>
			<div class="warning"><?php echo $warning ?></div>
		<?php endforeach; ?>
	</body>
</html>
