'use strict';
var servicename = 'user';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Deepsightuser'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Deepsightuser) {

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


        return {
            testoldPassword: testoldPassword,
            getcurrentUser: getcurrentUser,
            updateUser: updateUser,
            updatePassword: updatePassword,
            getcurrentUserbyID: getcurrentUserbyID,
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
