angular.module('mainController', ['authServices'])
.controller('mainCtrl', function(Auth, $timeout, $location, $rootScope){
    const app = this;

    $rootScope.$on('$routeChangeStart', function() {
        if (Auth.isLoggedIn()) {
            console.log('Success: User is logged in ...');
            app.isLoggedIn = true;
            Auth.getUser().then(function(data) {
                app.username = data.data.username;
                app.email = data.data.email;
            });
        } else {
            console.log('Failure: User is not logged in');
            app.username = '';
            app.isLoggedIn = false;
        };  
        
        if ($location.hash() == '_=_') $location.hash(null);
    });

    this.dologin = function(loginData) {

        app.errorMsg = false;

        Auth.login(app.loginData).then(function(data){
        
            if (data.data.success) {
                app.successMsg = data.data.message + ' ... ';
                $timeout(function(){
                    $location.path('/cards');
                    app.loginData = '';
                    app.successMsg = false;
                }, 2000);
            } else {
                app.errorMsg = data.data.message;
            }
        });
    };

    this.logout = function() {
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        }, 2000);
    };
});