<?php

class data_access {

    public $connection;

	private $user= "root";
	private $password= ""; 
	private $host= "localhost";
	private	$bd = "bolo_creator";
	
	private $results;

    function __construct() {
        $this->connect();
    }

    function connect() {
	
        $connection = new mysqli($this->host,$this->user,$this->password, $this->bd);
				
 } 
     

	

    function execute_query($sql) {
         $connection = new mysqli($this->host,$this->user,$this->password, $this->bd);
				
		$this->results = $connection->query($sql);
				
		//print_r($this->result);
        return $this->results;
    }
	

	function extract_record()
	{
		if ($list = mysqli_fetch_array($this->results,MYSQL_ASSOC))
		{
			return $list;
		} 
		else 
		{
			return false;
		}
	}

    function return_results($sql) {
        $this->execute_query($sql);
        $output = array();

        while ($record = extract_record()) {
            $output[] = $record;
        }

        return $output;
    }	

    function quantity_records($sql) {
        $r = $this->execute_query($sql);

        $cantidad = mysqli_num_rows($r);
        return $cantidad;
    }

    /**
    * Método que permite insertar en la base de datos
    * y retornar el id con que se insertó
    */
    function insert_records($sql) {
        $r = $this->execute_query($sql);

        $new_id = mysqli_insert_id($this->connection);

        return $new_id;
    }
	    
}

?>