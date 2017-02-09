'use strict';
var controllername = 'generalinformation';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$window', '$scope', '$kinvey', '$rootScope', '$q', '$state', '$timeout', databroker + '.user', authentication + '.authentication'];

    function controller($window, $scope, $kinvey, $rootScope, $q, $state, $timeout, user, authentication) {
        var vm = this;
        vm.controllername = fullname;

        //popup cancel
        vm.closeopenbool = false;

        vm.cancelfirststep = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        }

        vm.cancel = function() {
             if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }
             if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
             if (vm.forgotpwd === true) {
                vm.forgotpwd = false;
            }
        }

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        //End of popup cancel

        vm.generalinformationboolean = false;

        vm.refresh = function() {
            $window.location.reload()
        };

        vm.modifyinformationf = function() {
            if (vm.generalinformationboolean === false) {
                vm.generalinformationboolean = true;
            } else if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }

        }

        vm.user = [];

        vm.pageloadingboolean = true;

        user.getcurrentUser().then(function(user) {
            vm.currentuser = user;
            vm.user.firstname = user.firstname;
            vm.user.lastname = user.lastname;
            vm.user.email = user.email;
            vm.user.organization = user.organization;
            vm.user.tva = user.tva;
            vm.user.id = user.id
            vm.pageloadingboolean = false;
        }).catch(function(error) {
            vm.pageloadingboolean = false;
        });

        vm.tvaboolean === true;

        vm.emailboolean === true;

        vm.passwordboolean === false;

        vm.tvatest = function() {
            var regTva = /^[A-Z]{2}[0-9]{11}$/;
            vm.tvaboolean = regTva.test(vm.user.tva);
        };

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.passwordtest = function() {
            var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            vm.passwordboolean = regPassword.test(vm.pwd.newpwd);
            if (vm.passwordboolean === false) {
                vm.pwd.newpwdconf = '';
            }
        };

        vm.forgotpwd = false;

        vm.changepwd = function() {
            if (vm.forgotpwd === false) {
                vm.forgotpwd = true;
            } else if (vm.forgotpwd === true) {
                vm.forgotpwd = false;
            }

        }

        vm.testoldpassword = function() {
            var email = user.email;
            var oldpassword = vm.pwd.oldpwd;
            var currentuser = vm.currentuser;

            user.testoldPassword(currentuser, oldpassword).then(function(response) {
            }).catch(function() {
            });
        };

        vm.submitForm = function(isValid) {
            if (isValid) {
                var firstname = vm.user.firstname;
                var lastname = vm.user.lastname;
                var organization = vm.user.organization;
                var creator = vm.user.email;
                var id = vm.user.id;

                user.updateUser(firstname, lastname, organization, creator, id).then(function(user) {
                    vm.modifyinformationf();
                }).catch(function(error) {
                });
            };

        };

        vm.submitpwdForm = function(isValid) {
            if (isValid) {
                var newpassword = vm.pwd.newpwd;
                var id = vm.user.id;

                user.updatePassword(newpassword, id).then(function(response) {
                    vm.changepwd();
                }).catch(function(error) {
                });
            };

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
