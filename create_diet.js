$(document).ready(function($) {





 "use strict";




 var session_on = sessionStorage.getItem("meal_array");
 if(session_on){
    var session_on = JSON.parse(session_on);7
    
    $('.cd-meals').append(session_on);
 }


 $(".ds-search-field").on("keyup", function() {


  var value = $(this).val();
  var grams_value = $(".ds-grams-field").val();
  var multiply_value = grams_value / 100;

  $.ajax({
   type: "post",
   url: "/ajax/create_diet/create_diet.php",
   dataType: "json",
   data: {
    "product_name": value
   },
   success: function(data) {
     if (data) {

      $(".ds-search-results").empty();
      $.each(data, function(i, v) {
       if (v === null) {
        v = 0;
       }

       try {

        if (v.image.length < 1) {
         var image_path = "/uploads/images/no_result.png";
        } else {
         var image_path = v.image;
        }

       } catch (err) {
        $(".ds-search-results").append("<div>Няма резултати !</div>");
        //console.log(err);
        return false;
       }



       var result_calories = multiply_value * v.calories;
       var result = $(".ds-search-results").append("<div class='search-result_for_cd'><div class = 'cd-search-food-info'><a href='/foods/Food-Information-BG.php?id=" + v.id + "' ><img id='result-image'src= '" + image_path + "'/></a><div style = 'display:inline-block; vertical-align: middle; margin: 0 10px;'><div class='cd-result-title'><a href='/foods/Food-Information-BG.php?id=" + v.id + "'>" + v.title + "</a></div><span id = 'cd-result-state'>" + v.state + "</span></div></div><div class = 'cd-calories'>" + result_calories + " </div><i class = 'add_food' data-id= " + v.id + "><img src= '/uploads/images/Add.png'/></i></div>"); //choosen goal result



      });
      /*
                   });
                   }
                }
            });
         }); целия скрипт върви на всеки клик... оправи го*/



      // флаг за потвърждаване на request
      $(".add_food").on("click", function() {
       var requestSent = false;
       if (requestSent === false) {
        var requestSent = true;
        var search_term = $(this).data("id");
        var int_for_multiplication = $('.ds-grams-field').val();
        //взимаме номера от селект менюто
        var meal_number = $('.cd-meal-number').find(':selected').data('id');


        var nomer_na_hranene = $('.cd-meal-number').find(':selected').val();
        //Номер на елемента за храните 
        var foods_container = $('<div class = "cd-food-meal-container" data-meal_number = "' + meal_number + '" >' + nomer_na_hranene + '</div>');


        $('.total_values').remove();
        $.ajax({
         type: "post",
         url: "/ajax/create_diet/search_food_by_id.php",
         // dataType: "json",
         data: {
          'food_id': search_term,
          'multiplication': int_for_multiplication,
          'meal_number': meal_number
           // 'nomer_na_hranene': nomer_na_hranene
         },
         success: function(food_result) {
          //var meal_number = $('.cd-added-food').data('meal_number');
          var meal_number_words = ($('.cd-meal-number').find(':selected').val());
          var check_if_food_is_added = $('.cd-food-meal-container').length;
          var sum_carbs = 0;
          var sum_prots = 0;
          var sum_fats = 0;
          var sum_kkals = 0;
          var meal_array = [];


          switch (meal_number) {
           case 1:
            if ($('.cd-food-meal-container[data-meal_number="1"]').data('meal_number') == meal_number) {


             $('.cd-food-meal-container[data-meal_number="1"]').append(food_result);


            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="1"]').append(food_result);
            }

            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });



            $('.cd-food-meal-container[data-meal_number="1"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="1"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");



            break;
           case 2:
            if ($('.cd-food-meal-container[data-meal_number="2"]').data('meal_number') == meal_number) {
             $('.cd-food-meal-container[data-meal_number="2"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="2"]').append(food_result);
            }


            /*$('.cd-food-meal-container[data-meal_number="2"]').find('.cd-added-food').each(function(){
                                            var food_name = $(this).find('#cd-food-name').text();
                                            var food_state = $(this).find('.cd-food-state').text();
                                            var food_image = $(this).find('img').attr('src');
                                            var food_carbs = $(this).find('.cd-carbs').text();
                                            var food_prots = $(this).find('.cd-prots').text();
                                            var food_fats = $(this).find('.cd-fats').text();
                                            var food_kkals = $(this).find('.cd-kkals').text();

                                            meal_array_collector_2.push({"food_name":food_name,"food_state":food_state,"food_image":food_image,"food_carbs":food_carbs,"food_prots":food_prots,"food_fats":food_fats,'food_kkals':food_kkals});
                                        });*/
            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="2"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="2"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");

            break;
           case 3:
            if ($('.cd-food-meal-container[data-meal_number="3"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="3"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="3"]').append(food_result);
            }




            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="3"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="3"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
           case 4:
            if ($('.cd-food-meal-container[data-meal_number="4"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="4"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="4"]').append(food_result);
            }



            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="4"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="4"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
           case 5:
            if ($('.cd-food-meal-container[data-meal_number="5"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="5"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="5"]').append(food_result);
            }



            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="5"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="5"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
           case 6:
            if ($('.cd-food-meal-container[data-meal_number="6"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="6"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="6"]').append(food_result);
            }



            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="6"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="6"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
           case 7:
            if ($('.cd-food-meal-container[data-meal_number="7"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="7"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="7"]').append(food_result);
            }



            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="7"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="7"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
           case 8:
            if ($('.cd-food-meal-container[data-meal_number="8"]').data('meal_number') == meal_number) {

             $('.cd-food-meal-container[data-meal_number="8"]').append(food_result);
            } else {
             $('.cd-meals').append(foods_container);
             $('.cd-food-meal-container[data-meal_number="8"]').append(food_result);
            }



            //Добавяме калкулацията на макронутриенти за всяко меню
            $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-carbs').each(function() {
             sum_carbs += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-prots').each(function() {
             sum_prots += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-fats').each(function() {
             sum_fats += parseFloat($(this).text());
            });
            $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-kkals').each(function() {
             sum_kkals += parseFloat($(this).text());
            });


            $('.cd-food-meal-container[data-meal_number="8"]').children('.total_meal_values').remove();
            $('.cd-food-meal-container[data-meal_number="8"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
            break;
          }
          /*function return_array(meal_array){
              var new_array = ['meals'];
              for(var i =0; i <=8; i++){
                  console.log(meal_array.meal_+[i]);
                  meal_array.filter(function(){ if(meal_array.id === 8) {console.log('8 e i raboti');}else{console.log('ne raboti...')};});
              }
          }
          */

          $('.cd-foods').find('.cd-meals').each(function() {
           /* var meal_array = [];
                    var food_name = $(this).find('#cd-food-name').text();
                                        var food_state = $(this).find('.cd-food-state').text();
                                        var food_image = $(this).find('img').attr('src');
                                        var food_carbs = $(this).find('.cd-carbs').text();
                                        var food_prots = $(this).find('.cd-prots').text();
                                        var food_fats = $(this).find('.cd-fats').text();
                                        var food_kkals = $(this).find('.cd-kkals').text();
                                        var number_of_meal_from_element = $(this).closest('.cd-food-meal-container').data('meal_number');
                                        var array_meal_number = 'meal_'+number_of_meal_from_element;
                                        var meal_id = $(this).data('meal_food_id');
                                        */

           /*   meal_array['meals'] = {array_meal_number:{"meal_number":array_meal_number,"food_name":food_name,"food_state":food_state,"food_image":food_image,"food_carbs":food_carbs,"food_prots":food_prots,"food_fats":food_fats,'food_kkals':food_kkals,'id':meal_id}};
            return_array(Object.assign(meal_array,{
               [array_meal_number]:{"food_name":food_name,"food_state":food_state,"food_image":food_image,"food_carbs":food_carbs,"food_prots":food_prots,"food_fats":food_fats,'food_kkals':food_kkals,'id':meal_id
               
                }}));   */
           sessionStorage.clear();
           var session_array = $(this).clone(true,true).html();
           sessionStorage.setItem("meal_array", JSON.stringify(session_array));

          });

          

// затваря бутона за изтриване !

          // попринцип какво да прави, горе чисти, за това кода е същия

          var sum_carbs = 0;
          $('.cd-sm-carb-total').each(function() {
           sum_carbs += parseFloat($(this).text());
          });
          var sum_prots = 0;
          $('.cd-sm-prot-total').each(function() {
           sum_prots += parseFloat($(this).text());
          });
          var sum_fats = 0;
          $('.cd-sm-fats-total').each(function() {
           sum_fats += parseFloat($(this).text());
          });
          var sum_kkals = 0;
          $('.cd-sm-cals-total').each(function() {
           sum_kkals += parseFloat($(this).text());
          });

          $('.cd-meals').append("<div class = 'total_values'><div><b>Общи стойности !</b></div><table class = 'cd-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td id = 'cd-carb-total'>" + sum_carbs + "</td><td id= 'cd-prot-total'>" + sum_prots + "</td><td id= 'cd-fats-total'>" + sum_fats + "</td><td id = 'cd-cals-total'>" + sum_kkals + "</td></tr></table></div>");
         },
         error: function(jqXHR, textStatus, errorThrown) {
          alert(jqXHR.status);
          alert(textStatus);
          alert(errorThrown);
         }
        });
       } // затваря requestSent
      });
      $('.ds-grams-field').on('keyup', function() {


       var value = $('.ds-search-field').val();
       var value2 = $('.ds-grams-field').val();
       var value2 = value2 / 100;
       $.ajax({
        type: "post",
        url: "/ajax/create_diet/create_diet.php",
        dataType: "json",
        data: {
         'product_name': value
        },
        success: function(data) {
         var calories = [];
         $.each(data, function(i, v) {
          var new_calories = v.calories * value2;

          calories[i] = new_calories;





         });
         $.each($('.cd-calories'), function(index) {
          $(this).text(Math.round(calories[index], 2));
         });

        }

       });



      });
     }
    } // на получен ейджакс

  });

 });

          $('.cd-foods').on('click','.cd_clear', function() { // като цъкнем да чисти!!
           var parent_data = $(this).closest('.cd-food-meal-container').data('meal_number');

           $(this).closest('.cd-added-food').remove();


           // да трие контейнера съдържащ храните
           $('.cd-food-meal-container[data-meal_number="' + parent_data + '"]').each(function() {
            if ($(this).children('.cd-added-food').length === 0) {
             $(this).remove();
            }

           });
           var sum_carbs = 0;
           var sum_prots = 0;
           var sum_fats = 0;
           var sum_kkals = 0;

           switch (parent_data) {
            case 1:
             $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="1"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="1"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="1"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");

             var check_food_id = $(this).closest('.cd-added-food').data('meal_food_id');


             break;
            case 2:


             $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="2"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="2"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="2"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");

             var check_food_id = $(this).closest('.cd-added-food').data('meal_food_id');


             break;
            case 3:



             $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="3"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="3"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="3"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
            case 4:



             $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="4"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="4"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="4"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
            case 5:


             $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="5"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="5"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="5"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
            case 6:



             $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="6"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="6"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="6"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
            case 7:



             $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="7"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="7"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="7"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
            case 8:


             $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-carbs').each(function() {
              sum_carbs += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-prots').each(function() {
              sum_prots += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-fats').each(function() {
              sum_fats += parseFloat($(this).text());
             });
             $('.cd-food-meal-container[data-meal_number="8"]').find('.cd-kkals').each(function() {
              sum_kkals += parseFloat($(this).text());
             });


             $('.cd-food-meal-container[data-meal_number="8"]').children('.total_meal_values').remove();
             $('.cd-food-meal-container[data-meal_number="8"]').append("<div class = 'total_meal_values'><div><b>Макронутриенти</b></div><table class = 'cd-sm-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td class = 'cd-sm-carb-total'>" + sum_carbs + "</td><td class= 'cd-sm-prot-total'>" + sum_prots + "</td><td class= 'cd-sm-fats-total'>" + sum_fats + "</td><td class = 'cd-sm-cals-total'>" + sum_kkals + "</td></tr></table></div>");
             break;
           }
           var sum_carbs = 0;
           var sum_prots = 0;
           var sum_fats = 0;
           var sum_kkals = 0;
           $('.cd-sm-carb-total').each(function() {
            sum_carbs += parseFloat($(this).text());
           });


           $('.cd-sm-prot-total').each(function() {
            sum_prots += parseFloat($(this).text());
           });


           $('.cd-sm-fats-total').each(function() {
            sum_fats += parseFloat($(this).text());
           });
           $('.cd-sm-cals-total').each(function() {
            sum_kkals += parseFloat($(this).text());
           });




           $('.total_values').remove();
           $('.cd-meals').append("<div class = 'total_values'><div><b>Общи стойности !</b></div><table class = 'cd-table'><tr><th>Въглехидрат</th><th>Протеин</th><th>Мазнини</th><th>Калории</th></tr><hr><tr><td id = 'cd-carb-total'>" + sum_carbs + "</td><td id= 'cd-prot-total'>" + sum_prots + "</td><td id= 'cd-fats-total'>" + sum_fats + "</td><td id = 'cd-cals-total'>" + sum_kkals + "</td></tr></table></div>");


           if (sum_kkals <= 0) {
            $('.total_values').remove();
           }
          }); 


});