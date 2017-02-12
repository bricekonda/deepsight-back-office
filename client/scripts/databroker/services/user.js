'use strict';
var servicename = 'user';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Deepsightuser', 'Deepsightrolemapping', 'Deepsightrole'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Deepsightuser, Deepsightrolemapping, Deepsightrole) {

        var getcurrentUser = function() {
            var currentUser = Deepsightuser.getCurrent().$promise;

            return currentUser;
        };

        var getcurrentUserbyID = function() {
            var creator = Deepsightuser.findById().$promise;

            return creator;
        };

        var updateUser = function(firstname, lastname, organization, creator, id) {
            var usertoupdate = Deepsightuser.prototype$updateAttributes({
                'firstname': firstname,
                'lastname': lastname,
                'organization': organization,
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

        var loadallusers = function() {
            var allusers = Deepsightuser.find({
                "filter": {
                    order: 'date DESC',
                }
            }).$promise;

            return allusers;
        }

        var loaduserByID = function(id) {
            var allusers = Deepsightuser.find({
                "filter": {
                    where: {
                        id: id
                    },
                }
            }).$promise;

            return allusers;
        }

        // var loaduserByID = function(id) {
        //     var user = Deepsightuser.findById(id).$promise;

        //     return user;
        // }

        var deleteuserById = function(id) {

            var user = Deepsightuser.deleteById(id).$promise;

            return user;
        }

        var updateuserattributes = function(id, firstname, lastname, organization, username) {

            var user = Deepsightuser.prototype$updateAttributes({
                'id': id,
                'firstname': firstname,
                'lastname': lastname,
                'organization': organization,
                'username': username,
                'email': username

            }).$promise;

            return user;
        }

        var getRole = function(id) {
            var role = Deepsightrolemapping.find({
                "filter": {
                    where: {
                        principalId: id
                    },
                }
            }).$promise

            return role
        }

        var getRoletype = function(id) {
            var role = Deepsightrole.find({
                "filter": {
                    where: {
                        id: id
                    },
                }
            }).$promise
            return role
        }

        return {
            testoldPassword: testoldPassword,
            getcurrentUser: getcurrentUser,
            updateUser: updateUser,
            updatePassword: updatePassword,
            getcurrentUserbyID: getcurrentUserbyID,
            loadallusers: loadallusers,
            loaduserByID: loaduserByID,
            deleteuserById: deleteuserById,
            updateuserattributes: updateuserattributes,
            getRole: getRole,
            getRoletype: getRoletype,
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
