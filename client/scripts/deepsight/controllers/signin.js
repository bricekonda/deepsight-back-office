'use strict';
var controllername = 'signin';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$rootScope', '$scope', '$state', authentication + '.authentication', databroker + '.user'];

    function controller($rootScope, $scope, $state, authentication, user) {
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
                console.log("le logout est un succès")
            }).catch(function() {
                console.log("il y a un problème dans le logout")
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
                    console.log("ok");
                }).catch(function(error) {
                    vm.signinboolean = false;
                    $rootScope.$broadcast('signinfailed', null);
                    throw error;
                    console.log("bof");
                });
            }

        };

        vm.signinfailed === false;

        $rootScope.$on('signinfailed', function() {
            vm.signinfailed = true
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
