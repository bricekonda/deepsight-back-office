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

            tags.loadAdlltagsByUserId(vm.iduserchosentocreateaudience).then(function(tags) {
                vm.tagstodisplay = tags;

            }).catch(function(error) {
                throw error;
            })

            vm.nofilebooleanuser = true;
            vm.filtershownuser = "filterslideup";
            vm.filterclassuser = "rotateCounterwise";
            vm.filterbottomuser = "choicebottomanimationup";
        };

        /*********************************************
                 Popup
        *********************************************/
        vm.closeopenbool = false;

        vm.deletepopup = function(index) {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
                vm.tagtodelete = vm.tagstodisplay[index];
                console.log(vm.tagtodelete)
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
                vm.tagtodelete = [];
            }
        }

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('tagdeletionsuccess', function(event, data) {

            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 6000);
        });

        vm.deletetagbyId = function() {
            vm.pageloadingboolean = true;
            console.log(vm.tagtodelete.id)
            tags.deletetagById(vm.tagtodelete.id).then(function(tag) {
                $rootScope.$broadcast('tagdeletionsuccess', null);
                vm.deletepopup();
                var container = document.getElementById('tagblock');
                var scrollTo = document.getElementById('top');
                container.scrollTop = scrollTo.offsetTop;
                vm.pageloadingboolean = false;
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                throw error
            })

        }

        /*********************************************
                 Modify Tag
        *********************************************/
        vm.modifyaudience = false;

        vm.modify = function() {
            if (vm.modifyaudience === false) {
                vm.modifyaudience = true;
            } else if (vm.modifyaudience === true) {
                vm.modifyaudience = false;
            }
        }

        vm.loadtag = function(index) {
            vm.tagtomodify = vm.tagstodisplay[index];
            console.log(vm.tagtomodify);
            vm.title = vm.tagtomodify.title;
            vm.numberofvariable = vm.tagtomodify.variables.length;
            vm.variablelist = vm.tagtomodify.variables;
            vm.url = vm.tagtomodify.url;
            vm.description = vm.tagtomodify.description;
            vm.creator = vm.tagtomodify.creator;
            vm.tagid = vm.tagtomodify.id

        }

        $scope.$watch(function() {
            vm.allvariablessetboolean = true;
            for (var l = 0; l < vm.variablelist.length; l++) {
                if (vm.variablelist[l].variable === '') {
                    vm.allvariablessetboolean = false;
                }
            }
        })

        vm.variablelist = [{
            'variable': ''
        }, {
            'variable': ''
        }, {
            'variable': ''
        }];

        vm.addvariable = function() {
            vm.variablelist.push({
                'variable': ''
            })
            vm.numberofvariable = vm.numberofvariable + 1;

        }

        vm.removevariable = function(index) {

            vm.variablelist.splice(index, 1);
            vm.numberofvariable = vm.numberofvariable - 1;

        }

        vm.showmessagemodification = 'information-block-success-campaign-up';

        $rootScope.$on('tagmodificatisuccess', function(event, data) {

            vm.showmessagemodification = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessagemodification = 'information-block-success-campaign-up';
            }, 6000);
        });

        $rootScope.$on('reloadtags', function(event, data) {
            tags.loadAdlltagsByUserId(vm.iduserchosentocreateaudience).then(function(tags) {
                vm.tagstodisplay = tags;

            }).catch(function(error) {
                throw error;
            })
        });

        vm.submitForm = function(isValid) {
            vm.loaderon = true;
            if (isValid) {
                var variables = vm.variablelist;
                var description = vm.description;
                var urlpage = vm.url;
                var title = vm.title;
                var tagid = vm.tagid;
                tags.updatetagByID(tagid, variables, description, urlpage, title).then(function(newtag) {
                    $rootScope.$broadcast('tagmodificatisuccess', null);
                    $rootScope.$broadcast('reloadtags', null);
                    vm.tagid = '';
                    vm.tagtomodify = '';
                    vm.title = '';
                    vm.numberofvariable = '';
                    vm.variablelist = '';
                    vm.url = '';
                    vm.description = '';
                    vm.creator = '';
                    var container = document.getElementById('tagblock');
                    var scrollTo = document.getElementById('top');
                    container.scrollTop = scrollTo.offsetTop;
                    vm.modify()
                    vm.loaderon = false;
                }).catch(function(error) {
                    vm.loaderon = false;
                    throw error
                })
            }
        }

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
