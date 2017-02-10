'use strict';
var controllername = 'usermanagement';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var databroker = require('../../databroker')(app.name.split('.')[0]).name;
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$window', '$rootScope', '$timeout', '$state', '$scope', databroker + '.customaudience', databroker + '.user', 'Deepsightuser', 'Customaudience',authentication + '.authentication'];

    function controller($window, $rootScope, $timeout, $state, $scope, customaudience, user, Deepsightuser, Customaudience, authentication) {
        var vm = this;
        vm.controllername = fullname;

        //userquery

        vm.userquery = '';

        vm.pageloadingboolean = true;

        //popup cancel
        vm.closeopenbool = false;

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        vm.testtest = function() {
            console.log("pas disabled")
        }

        vm.check = function(value) {
            if (value) {
                vm.loaderon = true;

                $timeout(function() {
                    vm.loaderon = false;
                    vm.nextstepfunction();
                }, 700);
            }

        };

        vm.usercreationboolean = false;

        vm.createauseroc = function() {
            if (vm.usercreationboolean === false) {
                vm.usercreationboolean = true
            } else if (vm.usercreationboolean = true) {
                vm.usercreationboolean = false
            }
        }

        //End of popup cancel

        //Envoi mail
        // vm.sendMail = function(index) {

        //     var name = vm.audiencesloaded[index].name;

        //     var subject = "Demande d'activation de l'audience commune ".concat(name)

        //     var message = "Bonjour Brice,"

        //     $window.open("mailto:" + 'brice@deepsight.io' + "?subject=" + subject + "&body=" + message, "_self");
        // };

        // vm.sendMail1 = function() {

        //     var name = vm.audiencetodetail.name;

        //     var subject = "Demande d'activation de l'audience commune ".concat(name)

        //     var message = "Bonjour Brice,"

        //     $window.open("mailto:" + 'brice@deepsight.io' + "?subject=" + subject + "&body=" + message, "_self");
        // };

        //Test Loopback

        vm.brice = function() {
            Publisheruser.create({
                'md5': 'FE24GEZT2'
            }).$promise.then(function(response) {});
        };

        //End of test Loopback

        vm.gotocreatelookalike = function(index) {
            $state.go('home.lookalikeaudience.createlookalikeaudience').then(function() {
                $rootScope.$broadcast('loadcustomaudiencetoextend', vm.audiencetodetail);
            });
        }

        // filter

        // vm.filterclass = "rotateCounterwise";
        // vm.filtershown = "filterslideup";
        // vm.filterbottom = "filterbottomanimationup";

        // vm.showfilter = function() {
        //     if (vm.filterclass === "rotateCounterwise") {
        //         vm.filtershown = "filterslidedown";
        //         vm.filterclass = "rotate";
        //         vm.filterbottom = "filterbottomanimationdown";
        //     } else if (vm.filterclass === "rotate") {
        //         vm.filtershown = "filterslideup";
        //         vm.filterclass = "rotateCounterwise";
        //         vm.filterbottom = "filterbottomanimationup";
        //     }
        // };

        // vm.activefilter = "Aucun";
        // vm.sortparameter = '';

        // vm.filter = [{
        //     'name': 'Aucun',
        //     'kinveyname': '',
        // }, {
        //     'name': '- + Nom',
        //     'kinveyname': '+name',
        // }, {
        //     'name': '+ - Nom',
        //     'kinveyname': '-name',
        // }, {
        //     'name': '- + Taille',
        //     'kinveyname': '+size',
        // }, {
        //     'name': '+ - Taille',
        //     'kinveyname': '-size',
        // }, {
        //     'name': '- +  NB Éd.',
        //     'kinveyname': '+nb_publishers',
        // }, {
        //     'name': '+ - NB Éd.',
        //     'kinveyname': '-nb_publishers',
        // }, {
        //     'name': '- + Date',
        //     'kinveyname': '+date',
        // }, {
        //     'name': '+ - Date',
        //     'kinveyname': '-date',
        // }];

        // vm.selectfilter = function(index) {
        //     for (var i = 0; i < vm.filter.length; i++) {
        //         if (vm.filter[index].name === vm.filter[i].name) {
        //             vm.sortparameter = vm.filter[i].kinveyname;
        //             vm.activefilter = vm.filter[i].name;
        //             vm.filtershown = "filterslideup";
        //             vm.filterclass = "rotateCounterwise";
        //             vm.filterbottom = "filterbottomanimationup";
        //         }
        //     }
        // };

        //Load audience

        vm.noaudiencebool = false;
        vm.audienceshown = 0;

        var quantityofaudiencestoloadfirst = 5;
        var firsttoskipnumber = 0;

        //Load more audience

        vm.counterload = 0;
        vm.loadmorebool = true;

        //Module pour ajouter des audiences test

        var date = new Date();

        vm.addaudienceLoop = function() {
            var date = new Date();
            var name = 'Parfum kenzo Homme, Campagne automne';
            var nb_publishers = 56;
            var size = 1392495;
            var format = 'Display';
            var publishers_list = [{
                'publisher_name': 'Le monde',
                'size': 64740,
                'pertotal': '25%',
            }, {
                'publisher_name': 'Le parisien',
                'size': 69920,
                'pertotal': '27%',
            }, {
                'publisher_name': 'Le Figaro',
                'size': 124302,
                'pertotal': '48%',
            }]

            user.getcurrentUser().then(function(user) {
                customaudience.addaudienceLoop(user.id, name, nb_publishers, size, format, date, publishers_list).then(function(audience) {}).catch(function(error) {
                    throw error;
                });
            }).catch(function(error) {
                throw error
            })
        };

        //Fin de module pour ajouter des audiences test

        //Charger les audiences et loadmore

        var date = new Date();

        vm.styledate = function(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hour = date.getHours();
            var minute = date.getMinutes();

            if (day < 10) {
                var datestring = '0'.concat(day.toString())
            } else {
                var datestring = day.toString();
            }
            if (month < 10) {
                var monthstring = '0'.concat(month.toString())
            } else {
                var monthstring = month.toString();
            }
            var yearstring = year.toString();
            if (hour < 10) {
                var hourstring = '0'.concat(hour.toString())
            } else {
                var hourstring = hour.toString();
            }
            if (minute < 10) {
                var minutestring = '0'.concat(minute.toString())
            } else {
                var minutestring = minute.toString();
            }

            var validdate = datestring.concat('/', monthstring, '/', yearstring, ' à ', hourstring, ':', minutestring)

            return validdate
        };

        user.loadallusers().then(function(allusers) {
            vm.allusers = [];
            for (var i = 0; i < allusers.length; i++) {
                var date = new Date(allusers[i].date);
                allusers[i].date = vm.styledate(date);
                vm.allusers.push(allusers[i])
            }
            vm.allusers = allusers;
            vm.pageloadingboolean = false;
            console.log(allusers);
        }).catch(function(error) {
            vm.pageloadingboolean = false;
            console.log(error);
            throw error;
        })

        $rootScope.$on('reloadusermanagement', function(event, data) {
            console.log('on reaload les users')
            user.loadallusers().then(function(allusers) {
                vm.allusers = [];
                for (var i = 0; i < allusers.length; i++) {
                    var date = new Date(allusers[i].date);
                    allusers[i].date = vm.styledate(date);
                    vm.allusers.push(allusers[i])
                }
                vm.allusers = allusers;
                vm.pageloadingboolean = false;
                console.log(allusers);
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                console.log(error);
                throw error;
            })
        });

        vm.loadindextodelete = function($index) {
            vm.indextodelete = $index;
            console.log(vm.indextodelete)
        }

        vm.deleteuserById = function() {
            console.log('on clique');
            if (vm.deleteconfirmation === 'SUPPRIMER') {
                console.log('on va supprimer, beware');
                user.deleteuserById(vm.allusers[vm.indextodelete]).then(function(user) {
                    console.log(user)
                    vm.closepopup();
                    $rootScope.$broadcast('reloadusermanagement', null);
                }).catch(function(error) {
                    throw error;
                })
            }
        }

        vm.updateuser = function() {

        }

        vm.generalinformationboolean = false;

        vm.modifyinformationf = function() {
            if (vm.generalinformationboolean === false) {
                vm.generalinformationboolean = true;
            } else if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }
        }

        vm.loadusertomodify = function(index) {
            vm.pageloadingboolean = true;
            user.loaduserByID(vm.allusers[index]).then(function(user) {
                console.log(user);
                vm.user = user;
                vm.pageloadingboolean = false;
            }).catch(function(error) {
                console.log(error);
                vm.pageloadingboolean = false;
                throw error
            })
        }

        vm.emailboolean = true;

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.cancel = function() {
            if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.pageloadingboolean = true;
                console.log("kikoo")
                var firstname = vm.user.firstname;
                var lastname = vm.user.lastname;
                var organization = vm.user.organization;
                var username = vm.user.email;
                var id = vm.user.id;
                console.log(id);

                user.updateuserattributes(id, firstname, lastname, organization, username).then(function(user) {
                    $rootScope.$broadcast('userupdatesuccess', null);
                    $rootScope.$broadcast('reloadusermanagement', null);
                    vm.modifyinformationf();
                    vm.pageloadingboolean = false;
                    vm.user.firstname = '';
                    vm.user.lastname = '';
                    vm.user.organization = '';
                    vm.user.email = '';
                    vm.user.id = '';
                    var container = document.getElementById('usermanagementblock');
                    // var scrollTo = document.getElementById('top');
                    container.scrollTop = scrollTo.offsetTop;
                    console.log(user)
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                });
            };
        };

        vm.submitusercreationForm = function(isValid) {
            if (isValid) {
                vm.pageloadingboolean = true;
                console.log("kikoo")
                var firstname = vm.newuser.firstname;
                var lastname = vm.newuser.lastname;
                var organization = vm.newuser.organization;
                var username = vm.newuser.email;
                var password = vm.newuser.password;
                var usertype = vm.newuser.usertype;
                console.log(id);

                authentication.signUpwithroles(username,password, firstname, lastname, organization,username, usertype).then(function(user) {
                    $rootScope.$broadcast('userupdatesuccess', null);
                    $rootScope.$broadcast('reloadusermanagement', null);
                    vm.createauseroc();
                    vm.pageloadingboolean = false;
                    vm.newuser.firstname = '';
                    vm.newuser.lastname = '';
                    vm.newuser.organization = '';
                    vm.newuser.email = '';
                    vm.newuser.password = '';
                    var container = document.getElementById('usermanagementblock');
                    container.scrollTop = scrollTo.offsetTop;
                    console.log(user)
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                });
            };
        };

        //User update confirmation

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('userupdatesuccess', function(event, data) {
            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 6000);
        });

        //More info

        vm.moreinfoboolean = false;

        vm.closemoreinfo = function() {
            if (vm.moreinfoboolean === false) {
                vm.moreinfoboolean = true;
            } else if (vm.moreinfoboolean === true) {
                vm.moreinfoboolean = false;
            }
        }

        //Load more info about a Custom audience

        vm.audiencetodetail = {};
        vm.loadmoreinfo = function(index) {
            vm.audiencetodetail = vm.audiencesloaded[index];

        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
