'use strict';
var servicename = 'user';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Deepsightuser'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Deepsightuser) {

        // var getUser = function() {

        //     var promise = new $q(function(resolve) {
        //         resolve($kinvey.User.getActiveUser());
        //     });

        //     return promise;
        // };

        var getcurrentUser = function() {
            var currentUser = Deepsightuser.getCurrent().$promise;

            return currentUser;
        };

        var getcurrentUserbyID = function() {
            var creator = Deepsightuser.findById().$promise;

            return creator;
        };

        var updateUser = function(firstname, lastname, organization, tva, creator, id) {
            var usertoupdate = Deepsightuser.prototype$updateAttributes({
                'firstname': firstname,
                'lastname': lastname,
                'organization': organization,
                'tva': tva,
                'id': id
            }).$promise;

            console.log(creator)

            return usertoupdate

        };

        var testoldPassword = function(currentuser, oldpassword) {
            var oldpasswordtest = currentuser.hasPassword(oldpassword).$promise;

            return oldpasswordtest;
        };

        var updatePassword = function(newpassword, id) {
            var usertoupdate = Deepsightuser.prototype$updateAttributes({
                'password': newpassword,
                'id': id,
            }).$promise;

            return usertoupdate;
        }

        // var saveUser = function(firstname, lastname, organization, email, username, tva) {

        //     var promise = $q(function(resolve) {
        //         resolve($kinvey.User.getActiveUser());
        //     });

        //     promise.then(function(user) {
        //         if (user) {
        //             return user.update({
        //                 firstname: firstname,
        //                 lastname: lastname,
        //                 organization: organization,
        //                 tva: tva,
        //             });
        //         }
        //         return user;
        //     })

        //     return promise;
        // };

        return {
            // getUser: getUser,
            testoldPassword: testoldPassword,
            getcurrentUser: getcurrentUser,
            updateUser: updateUser,
            updatePassword: updatePassword,
            getcurrentUserbyID: getcurrentUserbyID,
            // saveUser: saveUser
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
