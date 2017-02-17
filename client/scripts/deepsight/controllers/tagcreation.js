'use strict';
var controllername = 'tagcreation';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$location', '$window', '$anchorScroll', '$timeout', '$rootScope', '$scope', '$state', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.user', databroker + '.files', databroker + '.campaign', databroker + '.tags'];

    function controller($location, $window, $anchorScroll, $timeout, $rootScope, $scope, $state, lookalikeaudience, customaudience, user, files, campaign, tags) {
        var vm = this;
        vm.controllername = fullname;

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

        vm.selectfilteruser = function(index) {
            vm.choiceuser = vm.usertochoselist[index];
            vm.iduserchosentocreateaudience = vm.usertochose[index].id;
            console.log(vm.usertochose[index]);
            vm.usernameuserchosentocreateaudience = vm.usertochose[index].username;

            vm.nofilebooleanuser = true;
            vm.filtershownuser = "filterslideup";
            vm.filterclassuser = "rotateCounterwise";
            vm.filterbottomuser = "choicebottomanimationup";
        };

        /*********************************************
         Choix Nombre de variable
        *********************************************/

        vm.filterclasscampaigntype = "rotateCounterwise";
        vm.filtershowncampaigntype = "filterslideup";
        vm.filterbottomcampaigntype = "choicebottomanimationup-campaign";

        vm.showfiltercampaigntype = function() {
            if (vm.filterclasscampaigntype === "rotateCounterwise") {
                vm.filtershowncampaigntype = "filterslidedown";
                vm.filterclasscampaigntype = "rotate";
                vm.filterbottomcampaigntype = "choicebottomanimationdown-campaign";
            } else if (vm.filterclasscampaigntype === "rotate") {
                vm.filtershowncampaigntype = "filterslideup";
                vm.filterclasscampaigntype = "rotateCounterwise";
                vm.filterbottomcampaigntype = "choicebottomanimationup-campaign";
            }
        };

        vm.variablelist = [{
            'variable': ''
        }, {
            'variable': ''
        }, {
            'variable': ''
        }];

        console.log(vm.variablelist[1].variable)

        vm.numberofvariable = vm.variablelist.length;

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

        $scope.$watch(function() {
            vm.allvariablessetboolean = true;
            for (var l = 0; l < vm.variablelist.length; l++) {
                if (vm.variablelist[l].variable === '') {
                    vm.allvariablessetboolean = false;
                }
            }
        })

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('tagcreationsuccess', function(event, data) {

            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 10000);
        });

        vm.submitForm = function(isValid) {
            vm.loaderon = true;
            if (isValid) {
                var userId = vm.iduserchosentocreateaudience;
                var variables = vm.variablelist;
                var description = vm.description;
                var urlpage = vm.url;
                var title = vm.title;
                var date = new Date()
                user.getcurrentUser().then(function(user) {
                    var creator = user.username
                    tags.createtag(userId, creator, date, variables, description, urlpage, title).then(function(newtag) {
                        $rootScope.$broadcast('tagcreationsuccess', null);
                        console.log(newtag)
                        vm.variablelist = [{
                            'variable': ''
                        }, {
                            'variable': ''
                        }, {
                            'variable': ''
                        }];
                        var description = '';
                        var urlpage = '';
                        var title = '';
                        vm.choiceuser = 'Liste des utilisateurs disponibles pour lesquels vous pouvez créer un tag';
                        var container = document.getElementById('tagcreationblock');
                        var scrollTo = document.getElementById('top');
                        container.scrollTop = scrollTo.offsetTop;
                        vm.loaderon = false;
                    }).catch(function(error) {
                        vm.loaderon = false;
                        throw error
                    })
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
