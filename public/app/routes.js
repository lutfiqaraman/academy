angular.module('appRoutes', ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    .when('/register', {
        templateUrl: 'app/views/pages/users/register.html',
        controller: 'regCtrl',
        controllerAs: 'register'
    })

    .when('/login', {
        templateUrl: 'app/views/pages/users/login.html',
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/users/logout.html'
    })

    .when('/profile', {
        templateUrl: 'app/views/pages/users/profile.html'
    })

    .when('/facebook/:token', {
        templateUrl: 'app/views/pages/users/social/social.html',
        controller: 'facebookCtrl',
        controllerAs: 'facebook'
    })

    .when('/cards', {
        templateUrl: 'app/views/pages/cards.html'
    })

    .when('/htmlcourse', {
        templateUrl: 'app/views/pages/htmlcourse.html'
    })

    .otherwise({ redirectTo: '/'});

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});