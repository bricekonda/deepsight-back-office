'use strict';
var controllername = 'resetpwdfinal';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$rootScope', '$scope', authentication + '.authentication', '$stateParams'];

    function controller($rootScope, $scope, authentication, $stateParams) {
        var vm = this;
        vm.controllername = fullname;

        vm.emailboolean === false;

        vm.passwordtest = function() {
            var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            vm.passwordboolean = regPassword.test(vm.user.password);
        };

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.signupboolean = true;
                var password = vm.user.password;
                var access_token = $stateParams.access_token;
                var id = $stateParams.id;
                authentication.resetPwd(access_token,id,password).then(function(user) {
                    $rootScope.$broadcast('resetpwdfinalSuccess', null);
                }).catch(function(error) {
                    throw error;
                });
            }

        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
