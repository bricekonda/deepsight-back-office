'use strict';
var controllername = 'customaudience';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var databroker = require('../../databroker')(app.name.split('.')[0]).name;
    var deps = ['$rootScope', '$timeout', '$state', '$scope', databroker + '.customaudience', databroker + '.user', 'Deepsightuser', 'Customaudience'];

    function controller($rootScope, $timeout, $state, $scope, customaudience, user, Deepsightuser, Customaudience) {
        var vm = this;
        vm.controllername = fullname;

        // vm.pageloadingboolean = true;

        vm.pageloadingboolean = true;


        //popup cancel
        vm.closeopenbool = false;

        vm.loadindextodelete = function($index){
            vm.indextodelete = $index; 
        }
        vm.deleteaudience = function() {
            console.log(vm.indextodelete);

            vm.closeopenbool = false;
            
            vm.pageloadingboolean = true;
            //Attention à vm.audiencesloaded si reverse dans le ng-repeat

            console.log(vm.indextodelete);

            var audienceid = vm.audiencesloaded[vm.indextodelete].id

            customaudience.deleteaudienceLoop(audienceid).then(function(model) {
                $rootScope.$broadcast('reloadcustomaudience', null);
                vm.pageloadingboolean = false;
            }).catch(function(error) {
                vm.pageloadingboolean = false;
            });
        };

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        //End of popup cancel


        //Test Loopback

        vm.brice = function() {
            Publisheruser.create({
                'md5': 'FE24GEZT2'
            }).$promise.then(function(response) {
                console.log("ok");
            });
        };

        //End of test Loopback

        // filter

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "filterbottomanimationup";

        vm.showfilter = function() {
            if (vm.filterclass === "rotateCounterwise") {
                vm.filtershown = "filterslidedown";
                vm.filterclass = "rotate";
                vm.filterbottom = "filterbottomanimationdown";
            } else if (vm.filterclass === "rotate") {
                vm.filtershown = "filterslideup";
                vm.filterclass = "rotateCounterwise";
                vm.filterbottom = "filterbottomanimationup";
            }
        };

        vm.activefilter = "Aucun";
        vm.sortparameter = '';

        vm.filter = [{
            'name': 'Aucun',
            'kinveyname': '',
        }, {
            'name': '- + Nom',
            'kinveyname': '+name',
        }, {
            'name': '+ - Nom',
            'kinveyname': '-name',
        }, {
            'name': '- + Taille',
            'kinveyname': '+size',
        }, {
            'name': '+ - Taille',
            'kinveyname': '-size',
        }, {
            'name': '- +  NB Éd.',
            'kinveyname': '+nb_publishers',
        }, {
            'name': '+ - NB Éd.',
            'kinveyname': '-nb_publishers',
        }, {
            'name': '- + Date',
            'kinveyname': '+date',
        }, {
            'name': '+ - Date',
            'kinveyname': '-date',
        }];

        vm.selectfilter = function(index) {
            for (var i = 0; i < vm.filter.length; i++) {
                if (vm.filter[index].name === vm.filter[i].name) {
                    vm.sortparameter = vm.filter[i].kinveyname;
                    vm.activefilter = vm.filter[i].name;
                    vm.filtershown = "filterslideup";
                    vm.filterclass = "rotateCounterwise";
                    vm.filterbottom = "filterbottomanimationup";
                }
            }
        };

        //Load audience

        vm.noaudiencebool = false;
        vm.audienceshown = 0;

        var quantityofaudiencestoloadfirst = 5;
        var firsttoskipnumber = 0;

        // customaudience.loadaudience(quantityofaudiencestoloadfirst, firsttoskipnumber).subscribe(function onNext(entities) {
        //     $scope.$apply(function() {
        //         vm.audiencesloaded = entities;
        //     });
        // }, function onError(error) {
        //     $rootScope.$broadcast('customaudienceloadingfailure', null);
        //     throw error;
        // }, function onComplete() {
        //     if (vm.audiencesloaded.length === 0) {
        //         vm.noaudiencebool = true;
        //     }

        //     $scope.$apply(function() {
        //         vm.audienceshown = vm.audiencesloaded.length
        //     })

        //     vm.pageloadingboolean = false;

        //     customaudience.loadaudience(1, vm.counterload + 5).subscribe(function onNext(entities) {
        //         vm.audiencetest = entities;
        //     }, function onError(error) {
        //         throw error;
        //     }, function onComplete() {
        //         $scope.$apply(function() {
        //             if (vm.audiencetest.length === 0) {
        //                 vm.loadmorebool = false;
        //             }
        //         });

        //     });
        // });

        //Load more audience

        vm.counterload = 0;
        vm.loadmorebool = true;

        //Module pour ajouter des audiences test

        var date = new Date();
        console.log(date);

        vm.addaudienceLoop = function() {
            var date = new Date();
            console.log(date);
            var creator = 'brice@deepsight.io';
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

            customaudience.addaudienceLoop(creator, name, nb_publishers, size, format, date, publishers_list).then(function(user) {
                console.log('Top AudienceLoop fonctionne');
            }).catch(function(error) {
                console.log('Bad AudienceLoop ne fonctionne pas');
                throw error;
            });
        };

        //Fin de module pour ajouter des audiences test

        //Current User

        // $scope.$apply(function() {
        //     user.getcurrentUser().then(function(model) {
        //         vm.currentuser = model;
        //         console.log(vm.currentuser.username);
        //     }).catch(function(error) {});
        // });

        //Charger les audiences et loadmore

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;
            console.log(vm.currentuser.username);

            customaudience.loadaudienceLoop(vm.currentuser.username).then(function(model) {
                vm.pageloadingboolean = false;
                vm.audiencesloaded = model;
                vm.audienceshown = vm.audiencesloaded.length;
                console.log(vm.audiencesloaded);
                console.log(vm.audiencesloaded.slice().reverse())
                vm.initialoffset = 5;
                vm.counter = 0;
                if (vm.audiencesloaded.length === 0) {
                    vm.noaudiencebool = true;
                }
                console.log("ok");
                customaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.username).then(function(model) {
                    console.log(model.length);
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }

                }).catch(function(error) {});
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                console.log('On ne parvient pas à charger les audience');
                throw error;
            });
        }).catch(function(error) {});

        $rootScope.$on('reloadcustomaudience', function(event, data) {
            vm.loadmorebool = true;
            user.getcurrentUser().then(function(model) {
                vm.currentuser = model;
                console.log(vm.currentuser.username);

                customaudience.loadaudienceLoop(vm.currentuser.username).then(function(model) {
                    vm.pageloadingboolean = false;
                    vm.audiencesloaded = model;
                    vm.audienceshown = vm.audiencesloaded.length;
                    console.log(vm.audiencesloaded);
                    console.log(vm.audiencesloaded.slice().reverse())
                    vm.initialoffset = 5;
                    vm.counter = 0;
                    if (vm.audiencesloaded.length === 0) {
                        vm.noaudiencebool = true;
                    }
                    console.log("ok");
                    customaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.username).then(function(model) {
                        console.log(model.length);
                        if (model.length === 0) {
                            vm.loadmorebool = false;
                        }

                    }).catch(function(error) {});
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                    console.log('On ne parvient pas à charger les audience');
                    throw error;
                });
            }).catch(function(error) {});
        });

        vm.loadmore = function() {
            vm.pageloadingboolean = true;
            vm.counter = vm.counter + 5;
            customaudience.loadmoreaudienceLoop(vm.counter, vm.currentuser.username).then(function(model) {
                vm.pageloadingboolean = false;
                vm.audiencetoadd = model;
                vm.audiencesloaded = vm.audiencesloaded.concat(vm.audiencetoadd);
                console.log(vm.audiencesloaded);
                vm.audienceshown = vm.audiencesloaded.length;

                customaudience.loadmoreaudienceLoop(vm.counter + 5, vm.currentuser.username).then(function(model) {
                    console.log(model.length);
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }
                }).catch(function(error) {});

            }).catch(function(error) {
                vm.pageloadingboolean = false;
            });

        };



        //Fin de charger les audiences et loadmore

        // var test = Customaudience.find({
        //     limit: 5
        // }, function() {
        //     //...
        // });

        // console.log(test);

        // vm.loadmore = function() {
        //     vm.counterload = vm.counterload + 5;
        //     customaudience.loadaudience(5, vm.counterload).subscribe(function onNext(entities) {
        //         vm.audiencesbis = entities;

        //     }, function onError(error) {
        //         throw error;
        //     }, function onComplete() {
        //         $scope.$apply(function() {
        //             vm.audiencesloaded = vm.audiencesloaded.concat(vm.audiencesbis);
        //             vm.audienceshown = vm.audiencesloaded.length;
        //             customaudience.loadaudience(1, vm.counterload + 5).subscribe(function onNext(entities) {
        //                 vm.audiencetest = entities;
        //             }, function onError(error) {
        //                 throw error;
        //             }, function onComplete() {
        //                 $scope.$apply(function() {
        //                     if (vm.audiencetest.length === 0) {
        //                         vm.loadmorebool = false;
        //                     }
        //                 });

        //             });
        //         });

        //     });

        // };

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