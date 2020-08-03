
<?php
    // Cargamos Vendor

    require './vendor/autoload.php';  

    class Contact {
        var $id;
        var $name;
        var $email;
        var $state;
        var $city;
        var $table_name;
        var $fluent;

        function Contact() {
            $this->table_name = "contacts";
            $pdo = new PDO('mysql:host=localhost;dbname=test_stiven;charset=utf8', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->fluent = new FluentPDO($pdo);
        }

        function impor_data($data) {
			
            $result = array(
				'name' => $data["name"],
                'email' => $data["email"],
                'state' => $data["state"],
                'city' => $data["city"],
			);             
			if(array_key_exists('id', $data)) {
				if($data["id"]){
					$result["id"] = $data["id"];
				}				
			}
            return $result;
        }

        function export_data($data) {
            return (object) [
                'id' => $data["id"],
                'name' => $data["name"],
                'email' => $data["email"],
                'state' => $data["state"],
                'city' => $data["city"],
            ];   
        }

        function list() {
            try{
                $result = $this->fluent->from($this->table_name)->fetchAll();      
                return json_encode($result);
            } catch (Exception $e) {
                return json_encode($e->getMessage());

            }
            
        }

        function get_by_id($id) {
            try{
                $result = $this->fluent->from($this->table_name)
                              ->where('id',$id)
                                          ->fetch();
                $result = $this->export_data($result);
                return json_encode($result);
            } catch (Exception $e) {
                return json_encode($e->getMessage());

            }
            
        }

        function delete_by_id($id) {
            try{
                $this->fluent->deleteFrom($this->table_name)
                    ->where('id', $id)
                         ->execute();

                return json_encode((object)[ 'message' => "Eliminado Correctamente" , 'status' => 200]);
            } catch (Exception $e) {
                return json_encode($e->getMessage());

            }
            
        }

        function create($data) {
            $data = $this->impor_data($data);
            try{
                $this->fluent->insertInto($this->table_name, $data)
                     ->execute();  	
            } catch (Exception $e) {
                return json_encode($e->getMessage());

            }            
            $result = $this->fluent->from($this->table_name)
                    ->where('id',$data['id'])
                        ->fetch();            
            return json_encode($result);
        }

        function modify($data)
        {
            $data = $this->impor_data($data); 
            try {                           
				$this->fluent->update($this->table_name)->set($data)->where('id', $data['id'])->execute();
            } catch (Exception $e) {
                return json_encode($e->getMessage());

            }            
            $result = $this->fluent->from($this->table_name)
                          ->where('id',$data['id'])
                                      ->fetch();           
            return json_encode($result);
        }

    }

?>