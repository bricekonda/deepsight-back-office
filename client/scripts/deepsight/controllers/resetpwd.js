'use strict';
var controllername = 'resetpwd';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$rootScope', '$scope', authentication + '.authentication'];

    function controller($rootScope, $scope, authentication) {
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
                    console.log(response);
                    $rootScope.$broadcast('resetpwdSuccess', null);
                    console.log("le password va être reset")
                }).catch(function(error) {
                    $rootScope.$broadcast('resetpwdfailed', null);
                    console.log("pb dans le reset du password")
                });
            }

        };

        vm.resetpwd === false;

        $rootScope.$on('resetpwdfailed', function() {
            vm.resetpwd = true
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
