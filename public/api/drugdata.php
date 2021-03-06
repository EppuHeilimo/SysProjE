<?php
/**
 * Drug data API
 *
 * Parameters:
 *   drug: drug name
 *
 * Returns:
 *   JSON object holding the data for the given drug
 *   in the data key. Error messages are held in the
 *   message key.
 */
 

require_once("../../lib/dao/DrugDAO.class.php");

if (!isset($_REQUEST['drug'])) {
    header("HTTP/1.1 500 Internal Server Error");
    header("Content-Type: application/json; charset=UTF-8");
    die(json_encode(array("message" => "No drug name given")));
}

$drug = $_REQUEST['drug'];
$drugDAO = new DrugDAO();
$values = $drugDAO->getDrugData($drug);
$response = array(
    "data" => $values
);

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);
