angular.module('userController', ['userServices'])
.controller('regCtrl', function($http, $location, $timeout, User) {

    const app = this;
    
    this.regUser = function(regData) {
        
        app.errorMsg = false;
        
        User.create(app.regData).then(function(data){
        
            if (data.data.success) {
                app.successMsg = data.data.message + ' ... ';
                $timeout(function(){
                    $location.path('/')
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };
})
.controller('facebookCtrl', function($routeParams, Auth, $location) {
    Auth.facebook($routeParams.token);
    $location.path('/');
});