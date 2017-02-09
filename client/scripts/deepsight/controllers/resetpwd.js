'use strict';
var controllername = 'resetpwd';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$rootScope','$timeout', '$scope', authentication + '.authentication'];

    function controller($rootScope,$timeout, $scope, authentication) {
        var vm = this;
        vm.controllername = fullname;

        vm.emailboolean === false;

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
                var email = vm.user.email;
                authentication.resetPwdreq(email).then(function(response) {
                    $rootScope.$broadcast('resetpwdSuccess', null);
                }).catch(function(error) {
                    $rootScope.$broadcast('resetpwdfailed', null);
                });
            }

        };

        vm.showmessage = 'sign-in-information-block-up';

        $rootScope.$on('resetpwdfailed', function(event, data) {
            vm.messagetoshow = "L'utilisateur n'existe pas. Essayez avec un autre e-mail"
            vm.showmessage = 'sign-in-information-block-down';
            $timeout(function() {
                vm.showmessage = 'sign-in-information-block-up';
            }, 6000);
        });

        vm.resetpwd === false;

        $rootScope.$on('resetpwdfailed', function() {
            vm.resetpwd = true
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
