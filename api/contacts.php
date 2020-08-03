<?php
    require __DIR__ . '/vendor/autoload.php';
    require './app.php';
    require './models/contact.php';

    $contact = new Contact();

    $method = $_SERVER['REQUEST_METHOD'];
    $request = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

    switch ($method) {
        case 'PUT':
            $actionget = isset($_GET['id']) ? true : null;
            if ($actionget){
                $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
                print_r($contact->modify($data));
            }        
            break;
            
        case 'POST':       
            $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
            print_r($contact->create($data));
            break;
            
        case 'GET': 
            header('Content-Type: application/json');
            $actionget = isset($_GET['id']) ? true : null;
            if ($actionget){
                print_r($contact->get_by_id($_GET['id'])); 
            } else {
                print_r($contact->list());
            }
            break;   
            
        case 'DELETE':
            $actionget = isset($_GET['id']) ? true : null;
            if ($actionget){
                header('Content-Type: application/json');
                print_r($contact->eliminar($_GET['id']));
            }        
            break;
        case 'OPTIONS':
            echo "OPTIONS";    
            break;
        default:
            echo "No hay un request para esta peticion"; 
            break;
    }
?>