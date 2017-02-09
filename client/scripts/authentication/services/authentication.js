'use strict';
var servicename = 'authentication';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Deepsightuser', '$http'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Deepsightuser, $http) {

        var ping = function() {
            return $kinvey.ping();
        };

        var signUp = function(username, password, firstname, lastname, organization, tva, email) {
            var newuser = Deepsightuser.create({
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                organization: organization,
                tva: tva,
                email: email
            }).$promise

            return newuser;
        };

        var signUpwithroles = function(username, password, firstname, lastname, organization, email, usertype) {

            var usernamenew = encodeURIComponent(username);
            var passwordnew = encodeURIComponent(password);
            var firstnamenew = encodeURIComponent(firstname);
            var lastnamenew = encodeURIComponent(lastname);
            var organizationnew = encodeURIComponent(organization);
            var emailnew = encodeURIComponent(email);
            var usertypenew = encodeURIComponent(usertype);
            // var urluser = apiConstant.uri.concat('/createuser').concat('?', 'username', '=', username).concat('&', 'password', '=', password).concat('&', 'firstname', '=', firstname).concat('&', 'lastname', '=', lastname).concat('&', 'organization', '=', organization).concat('&', 'email', '=', email).concat('&', 'usertype', '=', usertype);
            var urluser = 'https://deepsight-server.herokuapp.com/api'.concat('/createuser').concat('?', 'username', '=', usernamenew).concat('&', 'password', '=', passwordnew).concat('&', 'firstname', '=', firstnamenew).concat('&', 'lastname', '=', lastnamenew).concat('&', 'organization', '=', organizationnew).concat('&', 'email', '=', emailnew).concat('&', 'usertype', '=', usertypenew);
            var newuser = $http.get(urluser);

            return newuser
        };

        var signIn = function(username, password) {
            var usertoconnect = Deepsightuser.login({
                username: username,
                password: password,
            }).$promise

            return usertoconnect;

        };

        var logOut = function() {
            var promise = Deepsightuser.logout().$promise

            return promise;
        };

        var resetPwdreq = function(username) {

            var passwordtoreset = Deepsightuser.resetPassword({
                email: username
            }, function(value, responseHeaders) {

            }).$promise

            return passwordtoreset;
        };

        var resetPwd = function(access_token, id, password) {
            $http.defaults.headers.common.authorization = access_token;

            var promisetest = Deepsightuser.prototype$updateAttributes({
                id: id
            }, {
                password: password
            }).$promise;

            return promisetest;

            // return passwordtoreset;
        };

        $rootScope.$on('resetPasswordRequest', function() {
        });

        return {
            ping: ping,
            signUpwithroles: signUpwithroles,
            signUp: signUp,
            signIn: signIn,
            logOut: logOut,
            resetPwdreq: resetPwdreq,
            resetPwd: resetPwd
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
