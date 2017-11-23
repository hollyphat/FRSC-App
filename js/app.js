// Initialize your app
var myApp = new Framework7({
        modalTitle: 'Mobile Pharmarcist Assistant',
        material: true,
        pushState : true
    });

// Export selectors engine
var $$ = Dom7;
//var url = 'http://freelance.in/drug/server/api.php';
var url = 'http://app.onlinemedia.com.ng/pharmarcy/api.php';

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});



myApp.onPageInit('splash', function (page) {
    //alert("Hey");
   //check if we have ft
});


myApp.onPageInit('about', function (page) {
   
    
});


    myApp.onPageInit('search',function(page){
        $$(".result").addClass('hide');
        $$(".my-result").html("");
        $$(".output").addClass('hide');

        $$("#search-form").on('submit',function(e){
            e.preventDefault();
            var q = $$(".q").val();
            

            //console.log(src);            
            //myApp.alert(user);
            
            $$(".result").removeClass('hide');
            $$(".output").addClass('hide');

            $$(".my-result").html('');

            $$.ajax({
                url: url,
                data: {
                    'act': 'search',
                    'q': q
                },
                //dataType: 'json',              
                type: 'GET',
                crossDomain : true,
                cache: false,
                success: function(data) {
                    //console.log(data);



                    $$(".result").addClass('hide');
                    // var d = data;

                    // for(var i = 0; i < d.length; i++){
                    //     console.log(d[i]);
                    // }
                    $$(".my-result").html(data);
                    $$(".output").removeClass('hide');

                    $$("#search-form").addClass('hide');
                    //return;
                },
                error: function(e){
                    console.log(e);
                    myApp.alert("Network error, please try again!");
                    $$(".result").addClass('hide');
                    $$(".my-result").html("");
                    $$(".output").addClass('hide');
                },
                timeout: 60000
            });
        });



        // $$(".clicks").on('click',function (e) {

            
        // });


        $$("html").on('click', '.clicks', function(event) {
            
            var d = $$(this).attr('data-drug');
            var id = $$(this).attr('data-id');
            //alert(d);
            sessionStorage.setItem("drug_name",d);
            sessionStorage.setItem("drug_id",id);
            /* Act on the event */
        });


        $$("body").on('click', '.search-again', function(event) {
            event.preventDefault();


            $$(".result").addClass('hide');
            $$(".my-result").html("");
            $$(".output").addClass('hide');

            $$("#search-form").removeClass('hide');

            return;

            //myApp.onPageInit();
            /* Act on the event */
        });
    });




     myApp.onPageInit('views',function(page){
        var d = sessionStorage.getItem("drug_name");
        var id = sessionStorage.getItem("drug_id");
            $$("#drug_name").html(d);
            $$(".drug_name").html(d);


            $$.ajax({
                url: url,
                data: {
                    'act': 'get_info',
                    'id': id
                },
                //dataType: 'json',              
                type: 'GET',
                crossDomain : true,
                cache: false,
                success: function(data) {
                    //console.log(data);

                    //var info = parseJson(data);
                    var info = JSON.parse(data);
                    //console.log(info);
                    $$("#price").html(info.price);
                    $$("#intro").html(info.intro);
                    $$("#info").html(info.info);
                    $$("#before_use").html(info.before_use);
                    $$("#how_to_use").html(info.how_to_use);
                    $$("#miss_a_dose").html(info.miss_a_dose);
                    $$("#over_dose").html(info.over_dose);
                    $$("#avoid").html(info.avoid);
                    $$("#side_effect").html(info.side_effect);
                    $$("#adol_dosage").html(info.adol_dosage);
                    $$("#adult_dosage").html(info.adult_dosage);



                    $$(".result").addClass('hide');
                    $$(".notify").addClass('hide');
                    // var d = data;

                    // for(var i = 0; i < d.length; i++){
                    //     console.log(d[i]);
                    // }
                    //$$(".drug_res").html(data);
                    $$(".output").removeClass('hide');

                    
                    //return;
                },
                error: function(e){
                    console.log(e);
                    myApp.alert("Network error, please try again!");
                    $$("#intro").html('');
                    $$("#info").html('');
                    $$("#before_use").html('');
                    $$("#how_to_use").html('');
                    $$("#miss_a_dose").html('');
                    $$("#over_dose").html('');
                    $$("#avoid").html('');
                    $$("#side_effect").html('');
                    $$("#adol_dosage").html('');
                    $$("#adult_dosage").html('');
                },
                timeout: 60000
            });


            $$("#add-drug").on('submit',function(e){

                    e.preventDefault();
                    var drug_name = sessionStorage.getItem("drug_name");
                    var drug_id = sessionStorage.getItem("drug_id");
                    var into = $$("#intro").html();
                    var info = $$("#info").html();
                    var before_use = $$("#before_use").html();
                    var how_to_use =  $$("#how_to_use").html();
                    var miss_a_dose =  $$("#miss_a_dose").html();
                    var over_dose =  $$("#over_dose").html();
                    var avoid =  $$("#avoid").html();
                    var side_effect =  $$("#side_effect").html();
                    var adol_dosage =  $$("#adol_dosage").html();
                    var adult_dosage =  $$("#adult_dosage").html();
                    
                    myDB.transaction(function(transaction) {
                        var executeQuery = "INSERT INTO drug_tb (drug_name, drug_id, intro, info, before_use, how_to_use, miss_a_dose, over_dose, avoid, side_effect, adol_dosage, adult_dosage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";             
                        transaction.executeSql(executeQuery, [drug_name,drug_id,intro, info, before_use, how_to_use, miss_a_dose, over_dose, avoid, side_effect, adol_dosage, adult_dosage]
                            , function(tx, result) {
                                   alert('Inserted');
                                },
                                function(error){
                                    alert('Error occurred'); 
                            });
                    });


            });

            //myApp.onPageInit('search',function(page){
     });
