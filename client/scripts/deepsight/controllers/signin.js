'use strict';
var controllername = 'signin';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$rootScope', '$timeout', '$scope', '$state', authentication + '.authentication', databroker + '.user'];

    function controller($rootScope, $timeout, $scope, $state, authentication, user) {
        var vm = this;
        vm.controllername = fullname;

        vm.signinboolean = false;

        vm.emailboolean === false;

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.logout = function() {
            authentication.logOut().then(function() {
            }).catch(function() {
            })
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.signinboolean = true;
                var username = vm.user.email;
                var password = vm.user.password;
                authentication.signIn(username, password).then(function(user) {
                    $rootScope.$broadcast('signinSuccess', null);
                    vm.signinboolean = false;
                }).catch(function(error) {
                    vm.signinboolean = false;
                    $rootScope.$broadcast('signinfailed', null);
                    throw error;
                });
            }

        };

        vm.signinfailed === false;

        $rootScope.$on('signinfailed', function() {
            vm.signinfailed = true
        });

        vm.testmessage = function() {
            $rootScope.$broadcast('resetpwdrequestsuccessconfirmation', null);
        }

        vm.showmessage = 'sign-in-information-block-up';

        $rootScope.$on('resetpwdrequestsuccessconfirmation', function(event, data) {
            vm.messagetoshow = 'Un mail vous a été envoyé pour réinitialiser votre mot de passe';
            vm.showmessage = 'sign-in-information-block-down';
            $timeout(function() {
                vm.showmessage = 'sign-in-information-block-up';
            }, 6000);
        });

        $rootScope.$on('resetpwdsuccessconfirmation', function(event, data) {
            vm.messagetoshow = 'Votre mot de passe a été réinitialisé avec succès';
            vm.showmessage = 'sign-in-information-block-down';
            $timeout(function() {
                vm.showmessage = 'sign-in-information-block-up';
            }, 6000);
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
