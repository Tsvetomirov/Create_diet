<?php
if(!empty($_POST['product_name'])) {
$product_name = $_POST['product_name'];
$req = ("SELECT * FROM food_data_bg WHERE ");


$term = explode(' ',$product_name);

$i=0;


foreach($term as $form){
      $i++;
    if($i == 1){
       $req .= "title LIKE '%".$form."%'";
    }else{
       $req .= "OR title LIKE '%".$form."%'";
    }
    
}


require_once $_SERVER['DOCUMENT_ROOT'].'/inc/connection.php';
$req = mysqli_query($connect,$req);
     $num_rows = mysqli_num_rows($req);


$result = array();


          if($num_rows == 0){
$result[] = array( 'title'=>'Няма резултати');
echo json_encode($result);
exit();
}

else{
while($row = mysqli_fetch_assoc($req)){
$title= $row["title"];
$myID= $row["id"];
if(file_exists($_SERVER['DOCUMENT_ROOT'].$row["fimage"])){
    $image = $row["fimage"];
}else{
    $image = '';
}
$state = $row["state"];
$calories = $row["calories total"];

$result[] = array(
    'title' => $title,
    'id'    => $myID,
    'image' => $image,
    'state' => $state,
    'calories' => $calories
    
    );
       }
       echo json_encode($result);
       exit();
    }
}else{
    echo json_encode(array());
}

?>