// Initialize your app
var myApp = new Framework7({
        modalTitle: 'FRSC Mobile',
        material: true,
        pushState : true
    });

// Export selectors engine
var $$ = Dom7;

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
            var user = $$(".user").val();
            //var url = 'http://localhost/projects/frsc/save2.php';
            var url = 'http://frsc.onlinemedia.com.ng/save2.php';

            //console.log(src);            
            //myApp.alert(user);
            
            $$(".result").removeClass('hide');
            $$(".output").addClass('hide');

            $$(".my-result").html('');

            $$.ajax({
                url: url,
                data: {
                    'name': user,
                    'search': 'ok'
                },                
                type: 'GET',
                crossDomain : true,
                cache: false,
                success: function(data) {
                    //console.log(data);

                    $$(".result").addClass('hide');

                    $$(".my-result").html(data);
                    $$(".output").removeClass('hide');
                },
                error: function(e){
                    myApp.alert("Network error, please try again!");
                    $$(".result").addClass('hide');
                    $$(".my-result").html("");
                    $$(".output").addClass('hide');
                },
                timeout: 60000
            });
        });
    });
