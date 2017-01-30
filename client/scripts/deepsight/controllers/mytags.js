'use strict';
var controllername = 'mytags';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$http', '$timeout', '$rootScope', '$state', '$scope', '$location', databroker + '.tags', databroker + '.user', 'Customaudience'];

    function controller($http, $timeout, $rootScope, $state, $scope, $location, tags, user, Customaudience) {
        var vm = this;
        vm.controllername = fullname;

        vm.pageloadingboolean = true;

        vm.createtag = function() {
            vm.pageloadingboolean = true;
            tags.createtag().then(function() {
                vm.pageloadingboolean = false;
            }).catch(function onError(error) {
                vm.pageloadingboolean = false;
            });
        }

        vm.taglist = [];

        tags.findtag().then(function(list) {
            vm.taglist = list;
            vm.pageloadingboolean = false;
        }).catch(function onError(error) {
            vm.pageloadingboolean = false;
        });
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
