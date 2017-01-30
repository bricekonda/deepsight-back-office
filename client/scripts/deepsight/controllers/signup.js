'use strict';
var controllername = 'signup';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$rootScope', '$scope', authentication + '.authentication'];

    function controller($rootScope, $scope, authentication) {
        var vm = this;
        vm.controllername = fullname;

        vm.signupboolean = false; 

        vm.tvaboolean === false;

        vm.passwordboolean === false;

        vm.emailboolean === false;

        vm.tvatest = function() {
            var regTva = /^[A-Z]{2}[0-9]{11}$/;
            vm.tvaboolean = regTva.test(vm.user.tva);
        };

        vm.passwordtest = function() {
            var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            vm.passwordboolean = regPassword.test(vm.user.password);
        };

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.signupboolean = true; 
                var username = vm.user.email;
                var password = vm.user.password;
                var firstname = vm.user.firstname;
                var lastname = vm.user.lastname;
                var organization = vm.user.organization;
                var tva = vm.user.tva;
                var email = vm.user.email;
                authentication.signUp(username, password, firstname, lastname, organization, tva,email).then(function(user) {
                $rootScope.$broadcast('signupSuccess', null);
                vm.signupboolean = false; 
            }).catch(function(error) {
                $rootScope.$broadcast('signupfailed', null);
                throw error;
            });
            }

        };

        vm.signupfailed === false;

        $rootScope.$on('signupfailed', function(){
            $scope.$apply(vm.signupfailed = true);
        });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
