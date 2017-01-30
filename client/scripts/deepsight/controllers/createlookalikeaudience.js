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

        vm.choice = 'Choisissez une audience commune afin de construire une audience similaire';
        vm.sortparameter = '';

        vm.audiencetochose = [];

        user.getcurrentUser().then(function(model) {

            vm.currentuser = model;

            customaudience.loadallaudienceLoop(vm.currentuser.username).then(function(entities) {
                vm.audiencetochose = entities;
            }).catch(function(error) {
                throw error;
            });
        }).catch(function(error) {});

        // vm.audiencetochose = customaudience.load

        vm.selectfilter = function(index) {
            vm.choice = vm.audiencetochose[index].name;
            vm.customchosen = vm.audiencetochose[index].id;

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup";
        };

        vm.check = function(value) {
            if (value) {
                vm.loaderon = true;

                $timeout(function() {
                    vm.loaderon = false;
                    vm.nextstepfunction();
                    // vm.totalmatchedcalcf();
                    // vm.fonctiontest();
                }, 700);
            }

        };

        $rootScope.$on('loadcustomaudiencetoextend', function(event, args) {
            vm.choice = args.name;
            vm.customchosen = args.id;

        });

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
                totalmatchedcalcf();
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

        vm.check = function(value) {
            if (value) {
                vm.loaderon = true;
                vm.id = '';
                var name = vm.lookalikeaudiencename;
                var customaudience = vm.customchosen;
                var size = 45135;
                var date = new Date();
                var publishers_list = [{
                    'publisher_name': 'passeportsante',
                    'size': 1547,
                    'pertotal': 0
                }, {
                    'publisher_name': 'sixplay',
                    'size': 28172,
                    'pertotal': 0
                }, {
                    'publisher_name': 'fourchettebikini',
                    'size': 5837,
                    'pertotal': 0
                }, {
                    'publisher_name': 'meteocity',
                    'size': 3330,
                    'pertotal': 0
                }, {
                    'publisher_name': 'cuisineaz',
                    'size': 6249,
                    'pertotal': 0
                }]
                var nb_publishers = publishers_list.length;
                var waitboolean = vm.audiencetest[0].waitboolean;
                var readyboolean = vm.audiencetest[0].readyboolean;
                var makeadealboolean = vm.audiencetest[0].makeadealboolean;

                user.getcurrentUser().then(function(model) {
                    var creator = model.username
                    var id = model.id
                    lookalikeaudience.addaudienceLoop(id, creator, name, customaudience, nb_publishers, size, date, publishers_list, waitboolean, readyboolean, makeadealboolean).then(function onSuccess(entity) {
                        vm.loaderon = false;
                        vm.nextstepfunction();
                    }).catch(function onError(error) {
                        vm.loaderon = false;
                    });
                }).catch(function(error) {
                    vm.loaderon = false;
                });
            }

        };

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
