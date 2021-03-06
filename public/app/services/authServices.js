angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    authFactory = {};
    
    authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data) {
            AuthToken.setToken(data.data.token);
            return data;
        });
    };

    //Auth Login()
    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true;
        } else {
            return false;
        }
    };

    authFactory.facebook = function(token) {
        AuthToken.setToken(token);
    };

    authFactory.getUser = function() {
        if (AuthToken.getToken()) {
            return $http.post('/api/me');
        } else {
            $q.reject({ message : 'User has no token'});
        }
    };

    //Auth Logout()
    authFactory.logout = function() {
        AuthToken.setToken();
    };

    return authFactory;
})

.factory('AuthToken', function($window) {
    const authTokenFactory = {};

    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token);
        } else {
            $window.localStorage.removeItem('token');
        }
    };

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken) {
    const authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config) {
        const token = AuthToken.getToken();
        if (token) config.headers['x-access-token'] = token;
        return config;
    };

    return authInterceptorsFactory;
});