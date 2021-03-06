<?php
/**
 * Newscore API - adds a new highscore for the player who is currently logged in
 * 
 * Parameters:
 *   score: the score to add
 *   difficulty: the difficulty that the score was achieved in
 *
 * Returns:
 *   JSON object with success status in the success key 
 *   (false for failure, true for success) and any error messages
 *   in the error key.
 */
require_once("../../lib/util.functions.php");

$user = getUser();
if (!isLoggedIn() || !isset($user)) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Not logged in")));
}

if (!isset($_REQUEST['score'])) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Score not given")));    
}

$difficulty = 1;
if (isset($_REQUEST['difficulty'])) {
    $difficulty = $_REQUEST['difficulty'];
}

if (!$user->saveScore($_REQUEST['score'], $difficulty)) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("success" => "false", "error" => "Database error")));        
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(array("success" => true));
