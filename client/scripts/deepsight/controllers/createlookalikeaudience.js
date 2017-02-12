'use strict';
var controllername = 'createlookalikeaudience';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$timeout', '$rootScope', '$scope', '$state', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.user'];

    function controller($timeout, $rootScope, $scope, $state, lookalikeaudience, customaudience, user) {
        var vm = this;
        vm.controllername = fullname;

        // Choix user;

        vm.filterclassuser = "rotateCounterwise";
        vm.filtershownuser = "filterslideup";
        vm.filterbottomuser = "choicebottomanimationup";
        vm.nofilebooleanuser = false;

        // $rootScope.$on('loadcustomaudiencetoextend', function(event, args) {
        //     vm.choice = args.name;
        //     vm.customchosen = args.id;
        //     vm.sizetodisplay = args.size;
        //     vm.audienceselected = args;
        //     vm.nofileboolean = true;

        //     vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

        // });

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

        vm.choiceuser = 'Liste des utilisateurs disponibles pour lesquels vous pouvez créer une audience';
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

        // vm.audiencetochose = [];

        vm.selectfilteruser = function(index) {
            vm.choiceuser = vm.usertochoselist[index];
            vm.iduserchosentocreateaudience = vm.usertochose[index].id;
            console.log(vm.usertochose[index]);
            vm.usernameuserchosentocreateaudience = vm.usertochose[index].username;

            // vm.customchosen = vm.audiencetochose[index].id;
            // vm.audienceselected = vm.audiencetochose[index];
            // vm.sizetodisplay = vm.audienceselected.size;
            // vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

            vm.nofilebooleanuser = true;
            vm.filtershownuser = "filterslideup";
            vm.filterclassuser = "rotateCounterwise";
            vm.filterbottomuser = "choicebottomanimationup";
        };

        //popup cancel
        vm.closeopenbool = false;

        vm.cancelfirststep = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        }

        vm.cancel = function() {
            $state.go('home.lookalikeaudience');
        }

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        //End of popup cancel

        // filter

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "choicebottomanimationup";
        vm.nofileboolean = false;

        $rootScope.$on('loadcustomaudiencetoextend', function(event, args) {
            vm.choice = args.name;
            vm.customchosen = args.id;
            vm.sizetodisplay = args.size;
            vm.audienceselected = args;
            vm.nofileboolean = true;

            vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

        });
        vm.showfilter = function() {
            if (vm.filterclass === "rotateCounterwise") {
                vm.filtershown = "filterslidedown";
                vm.filterclass = "rotate";
                vm.filterbottom = "choicebottomanimationdown";
            } else if (vm.filterclass === "rotate") {
                vm.filtershown = "filterslideup";
                vm.filterclass = "rotateCounterwise";
                vm.filterbottom = "choicebottomanimationup";
            }
        };

        vm.choice = 'Liste des audiences communes disponibles';
        vm.sortparameter = '';

        vm.audiencetochose = [];

        // user.getcurrentUser().then(function(model) {

        //     vm.currentuser = model;

        //     customaudience.loadallaudienceLoopById(vm.iduserchosentocreateaudience).then(function(entities) {
        //         vm.audiencetochose = entities;
        //         console.log(entities.length);
        //     }).catch(function(error) {
        //         throw error;
        //     });
        // }).catch(function(error) {});

        vm.chosecustomaudienceboolean = false;

        vm.loadallcustomaudienceByuserId = function() {
                vm.chosecustomaudienceboolean = true;
                console.log("hello")
                customaudience.loadallaudienceLoopById(vm.iduserchosentocreateaudience).then(function(entities) {
                    vm.audiencetochose = entities;
                    console.log(entities.length);
                }).catch(function(error) {
                    throw error;
                });
            }

            //Date

        vm.styledate = function(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var seconds = date.getSeconds();

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
            if (seconds < 10) {
                var secondstring = '0'.concat(seconds.toString())
            } else {
                var secondstring = seconds.toString();
            }

            var validdate = datestring.concat(monthstring, yearstring, hourstring, minutestring, secondstring)

            return validdate
        };

        // vm.audiencetochose = customaudience.load

        vm.selectfilter = function(index) {
            vm.choice = vm.audiencetochose[index].name;
            vm.customchosen = vm.audiencetochose[index].id;
            vm.audienceselected = vm.audiencetochose[index];
            vm.sizetodisplay = vm.audienceselected.size;
            vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup";
        };

        vm.createlookalikeaudience = function() {
            vm.loaderon = true;
            vm.id = '';
            var name = vm.lookalikeaudiencename;
            var id_customaudience = vm.audienceselected.id;
            var publishers_list = vm.audienceselected.publishers_list;
            var size = '_';
            var date = new Date();
            var nb_publishers = vm.audienceselected.nb_publishers;
            var waitboolean = true;
            var makeadealboolean = false;

            user.getcurrentUser().then(function(model) {
                var creator = model.username
                var id = model.id;
                console.log(vm.iduserchosentocreateaudience)
                lookalikeaudience.addaudienceLoop(vm.iduserchosentocreateaudience, creator, name, id_customaudience, nb_publishers, size, date, waitboolean, makeadealboolean,publishers_list).then(function onSuccess(entity) {
                    vm.loaderon = false;
                    vm.nextstepfunction();
                }).catch(function onError(error) {
                    vm.loaderon = false;
                });
            }).catch(function(error) {
                vm.loaderon = false;
            });
        };

        vm.check = function(value) {
            if (value) {
                vm.loaderon = true;

                $timeout(function() {
                    vm.loaderon = false;
                    vm.nextstepfunction();
                }, 700);
            }

        };

        // Menu déroulant audience

        vm.customaudience = 'kikoo';

        vm.names = [{
            'drname': 'Audience 1'
        }, {
            'drname': 'Audience2'
        }, {
            'drname': 'Audience 3'
        }]

        vm.audiencematched = [{
            "name": 'Audience numero 1',
            "size": 23000,
            "overlap": "17%",
        }, {
            "name": 'Audience numero 2',
            "size": 45000,
            "overlap": "17%",
        }, {
            "name": 'Audience numero 4',
            "size": 60000,
            "overlap": "17%",
        }];

        vm.audiencefromkinvey = [{
            "name": 'Audience numero 1',
            "nbpublisher": "",
            "size": 60000,
            "lastuseddate": '',
            "publishers": [{
                'name': 'Le monde',
                'size': 12000,
                'overlapper': 17.1,
                'totalper': 12,
            }, {
                'name': 'Le figaro',
                'size': 5000,
                'overlapper': 17.1,
                'totalper': 5,
            }, {
                'name': "L'Equipe",
                'size': 15000,
                'overlapper': 17.1,
                'totalper': 4.4,
            }, {
                'name': 'Planet.fr',
                'size': 6000,
                'overlapper': 17.1,
                'totalper': 3.5,
            }, {
                'name': 'Libération',
                'size': 8000,
                'overlapper': 17.1,
                'totalper': 25,
            }],
        }];

        vm.totalmatched = 0;

        vm.totalmatchedcalcf = function() {
            for (var i = 0; i < vm.audiencematched.length; i++) {
                vm.totalmatched = vm.totalmatched + vm.audiencematched[i].size
            }
        };

        vm.counterstep = 1;
        vm.step1boolean = true;
        vm.step2boolean = false;
        vm.step3boolean = false;
        vm.progressionstatenumber1 = "progression-state-number1-completed";
        vm.progressionstatenumber2 = "progression-state-number2";
        vm.progressionstatenumber3 = "progression-state-number3";
        vm.progressionstatename1 = "progression-state-name1-completed";
        vm.progressionstatename2 = "progression-state-name2";
        vm.progressionstatename3 = "progression-state-name3";
        vm.progressionbar12 = "progression-bar-1-2";
        vm.progressionbar23 = "progression-bar-2-3";

        vm.nextstepfunction = function() {
            vm.counterstep = vm.counterstep + 1;
            if (vm.counterstep === 1) {
                vm.step1boolean = true;
                vm.step2boolean = false;
                vm.step3boolean = false;
                vm.step4boolean = false;
                vm.progressionstatenumber1 = "progression-state-number1-completed";
                vm.progressionstatenumber2 = "progression-state-number2";
                vm.progressionstatenumber3 = "progression-state-number3";
                vm.progressionstatenumber4 = "progression-state-number4";
                vm.progressionstatename1 = "progression-state-name1-completed";
                vm.progressionstatename2 = "progression-state-name2";
                vm.progressionstatename3 = "progression-state-name3";
                vm.progressionstatename4 = "progression-state-name4";
                vm.progressionbar12 = "progression-bar-1-2";
                vm.progressionbar23 = "progression-bar-2-3";
                vm.progressionbar34 = "progression-bar-3-4";
            } else if (vm.counterstep === 2) {
                vm.step1boolean = false;
                vm.step2boolean = true;
                vm.step3boolean = false;
                vm.step4boolean = false;
                vm.progressionstatenumber1 = "progression-state-number1-completed";
                vm.progressionstatenumber2 = "progression-state-number2-completed";
                vm.progressionstatenumber3 = "progression-state-number3";
                vm.progressionstatenumber4 = "progression-state-number4";
                vm.progressionstatename1 = "progression-state-name1-completed";
                vm.progressionstatename2 = "progression-state-name2-completed";
                vm.progressionstatename3 = "progression-state-name3";
                vm.progressionstatename4 = "progression-state-name4";
                vm.progressionbar12 = "progression-bar-1-2-completed";
                vm.progressionbar23 = "progression-bar-2-3";
                vm.progressionbar34 = "progression-bar-3-4";
            } else if (vm.counterstep === 3) {
                vm.step1boolean = false;
                vm.step2boolean = false;
                vm.step3boolean = true;
                vm.step4boolean = false;
                vm.progressionstatenumber1 = "progression-state-number1-completed";
                vm.progressionstatenumber2 = "progression-state-number2-completed";
                vm.progressionstatenumber3 = "progression-state-number3-completed";
                vm.progressionstatenumber4 = "progression-state-number4";
                vm.progressionstatename1 = "progression-state-name1-completed";
                vm.progressionstatename2 = "progression-state-name2-completed";
                vm.progressionstatename3 = "progression-state-name3-completed";
                vm.progressionstatename4 = "progression-state-name4";
                vm.progressionbar12 = "progression-bar-1-2-completed";
                vm.progressionbar23 = "progression-bar-2-3-completed";
                vm.progressionbar34 = "progression-bar-3-4";
            }
        }

        vm.audiencetest = [{
            'name': 'Audience 1 on va voir ce que ça donne',
            'size': '_',
            'nbpublisher': 3,
            'waitboolean': true,
            'readyboolean': false,
            'makeadealboolean': false,
            'publisher': [{
                'publisherid': 'publisher1',
                'name': 'Le Figaro',
                'size': '_',
                'overlapper': '_',
                'totalper': '_',
            }, {
                'publisherid': 'publisher2',
                'name': 'M6 Web',
                'size': '_',
                'overlapper': '_',
                'totalper': '_',
            }, {
                'publisherid': 'publisher3',
                'name': 'Prisma Media',
                'size': '_',
                'overlapper': '_',
                'totalper': '_',
            }]
        }];

        vm.saveaudiencetest = function() {
            vm.id = '';
            var name = vm.lookalikeaudiencename;
            var nbpublisher = '_';
            var size = '_';
            var waitboolean = vm.audiencetest[0].waitboolean;
            var readyboolean = vm.audiencetest[0].readyboolean;
            var makeadealboolean = vm.audiencetest[0].makeadealboolean;
            var publisher = vm.audiencetest[0].publisher;
            var publisher1 = vm.audiencetest[0].publisher[0];
            var publisher2 = vm.audiencetest[0].publisher[1];
            var publisher3 = vm.audiencetest[0].publisher[2];

            lookalikeaudience.addaudience(name, nbpublisher, size, waitboolean, readyboolean, makeadealboolean, publisher1, publisher2, publisher3).then(function onSuccess(entity) {}).catch(function onError(error) {});

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
