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

        vm.pageloadingboolean = false;

        /*********************************************
                 Choix USER
                *********************************************/

        vm.filterclassuser = "rotateCounterwise";
        vm.filtershownuser = "filterslideup";
        vm.filterbottomuser = "choicebottomanimationup";
        vm.nofilebooleanuser = false;

        vm.showfilteruser = function() {
            if (vm.filterclassuser === "rotateCounterwise") {
                vm.filtershownuser = "filterslidedown";
                vm.filterclassuser = "rotate";
                vm.filterbottomuser = "choicebottomanimationdown";
            } else if (vm.filterclassuser === "rotate") {
                vm.filtershownuser = "filterslideup";
                vm.filterclassuser = "rotateCounterwise";
                vm.filterbottomuser = "choicebottomanimationup";
            }
        };

        vm.choiceuser = 'Liste des utilisateurs disponibles pour lesquels vous pouvez créer un tag';
        vm.sortparameteruser = '';

        user.loadallusers().then(function(users) {
            console.log(users);
            vm.usertochoselist = [];
            vm.usertochose = users;
            for (var k = 0; k < users.length; k++) {
                var company = users[k].organization;
                var username = users[k].username;
                var nametodisplay = company.concat(' ', '-', ' ', username);
                vm.usertochoselist.push(nametodisplay)
            }
            console.log(vm.usertochoselist);
        }).catch(function(error) {
            console.log(error)
            throw error
        })

        vm.tagstodisplay = [];

        vm.selectfilteruser = function(index) {
            vm.choiceuser = vm.usertochoselist[index];
            vm.iduserchosentocreateaudience = vm.usertochose[index].id;
            console.log(vm.usertochose[index]);
            vm.usernameuserchosentocreateaudience = vm.usertochose[index].username;

            tags.loadAdlltagsByUserId(vm.iduserchosentocreateaudience).then(function(tags){
                vm.tagstodisplay = tags;

            }).catch(function(error){
                throw error;
            })

            vm.nofilebooleanuser = true;
            vm.filtershownuser = "filterslideup";
            vm.filterclassuser = "rotateCounterwise";
            vm.filterbottomuser = "choicebottomanimationup";
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
