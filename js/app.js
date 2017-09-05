// Initialize your app
var myApp = new Framework7({
        modalTitle: 'Online Pharmarcy',
        material: true,
        pushState : true
    });

// Export selectors engine
var $$ = Dom7;
var url = 'http://freelance.in/drug/api.php';
var url = 'http://app.onlinemedia.com.ng/pharmarcy/api.php';

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
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
                    $$(".result").addClass('hide');
                    $$(".my-result").html("");
                    $$(".output").addClass('hide');
                },
                timeout: 60000
            });
     });
