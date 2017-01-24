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

        // var signUp = function(username, password, firstname, lastname, organization, tva, email) {

        //     var newuser = $kinvey.User.signup({
        //         username: username,
        //         password: password,
        //         firstname: firstname,
        //         lastname: lastname,
        //         organization: organization,
        //         tva: tva,
        //         email: email
        //     })

        //     return newuser;

        // };

        var signIn = function(username, password) {
            var usertoconnect = Deepsightuser.login({
                username: username,
                password: password,
            }).$promise

            return usertoconnect;

        };

        // var signIn = function(username, password) {
        //     var usertoconnect = $kinvey.User.login(username, password);

        //     return usertoconnect;

        // };

        var logOut = function() {
            var promise = Deepsightuser.logout().$promise

            return promise;
        };

        // var logOut = function() {
        //     var promise = $kinvey.User.logout();
        //     return promise;
        // };

        var resetPwdreq = function(username) {

            var passwordtoreset = Deepsightuser.resetPassword({
                email: username
            }, function(value, responseHeaders) {
                console.log(username)
                console.log(value);
                console.log(responseHeaders);

            }).$promise

            return passwordtoreset;
        };

        var resetPwd = function(access_token, id, password) {

            // var promise = Deepsightuser.findById(accessToken.userId, function(err, user) {

            // })
            console.log('on y passe oui');

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
            console.log("L'évènement pour le reset est bien émis")
        });

        // var resetPwd = function(username) {
        //     var passwordtoreset = $kinvey.User.resetPassword(username)

        //     return passwordtoreset;
        // };

        return {
            ping: ping,
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
