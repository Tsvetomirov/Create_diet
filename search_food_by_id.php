<?php
if(!empty($_POST['food_id'])){
    require_once($_SERVER["DOCUMENT_ROOT"]. '/inc/connection.php');
    $food_id = $_POST['food_id'];
    
    
    $query  = mysqli_query($connect,"SELECT * FROM food_data_bg WHERE id=".$food_id);
    if(mysqli_num_rows($query) < 1){
        $result = array('1'  => 'Няма намерени резултати!');
        return json_encode($result);
    }else{
        $m = $_POST['multiplication'] / 100;
        while($row = mysqli_fetch_assoc($query)){
            $name = $row['title'];
            $image = $row['fimage'];
            $state = $row['state'];
            $carbs = $row['carbohydrates'];
            $prots = $row['proteins'];
            $fats = $row['fats'];
            $calories = $row['calories total'];
            
            ?>
<div class = 'cd-added-food' "data - meal_food_id = "<?php echo $food_id;?>">

 <div class = 'cd-food-name' > < span id = 'cd-food-name' > <?php echo $name;?> < /span><span class = "cd-food-state"><?php echo $state; ?></span > <i> <img class = "cd_clear"
src = '/uploads/images/delete_icon.png' / >  </i></div >
 
 <img src = '<?php if(file_exists($_SERVER['
DOCUMENT_ROOT '].$image) && !empty($image)){echo $image;}else{echo ' / uploads / images / no_result.png ';}?>' / >>
 <div class = 'cd-stats'>

 <table class = 'cd-table'>

 <tr>
 <th> Въглехидрат </th>
 <th> Протеин </th>
 <th> Мазнини </th>
 <th> Калории </th>
 </tr>
 <tr>
 
 <td class = 'cd-carbs' > <?php echo round($carbs * $m);?> </td>
 <td class = 'cd-prots' > <?php echo round($prots * $m);?> </td>
 <td class = 'cd-fats' > <?php echo round($fats * $m);?> </td>
 <td class = 'cd-kkals' > <?php echo round($calories * $m);?> </td>
 </tr>
 </table>
 </div>
 </div>

<?php
        }
    }
}else{
    $result = array('1'  => 'Няма намерени резултати!');
    return json_encode($result);
}
?>