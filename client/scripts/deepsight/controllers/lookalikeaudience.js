'use strict';
var controllername = 'lookalikeaudience';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$window', '$timeout', '$rootScope', '$state', '$scope', databroker + '.user', databroker + '.lookalikeaudience', databroker + '.customaudience'];

    function controller($window, $timeout, $rootScope, $state, $scope, user, lookalikeaudience, customaudience) {
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

        vm.loadindextodelete = function($index) {
            vm.indextodelete = $index;
        }

        vm.deleteaudience = function() {

            //Attention à vm.audiencesloaded si reverse dans le ng-repeat
            vm.closeopenbool = false;

            var audienceid = vm.audiencesloaded[vm.indextodelete].id
            vm.pageloadingboolean = true;

            lookalikeaudience.deleteaudienceLoop(audienceid).then(function(model) {
                $rootScope.$broadcast('reloadlookalikeaudience', null);
                vm.pageloadingboolean = false;
                if (vm.moreinfoboolean === true) {
                    vm.moreinfoboolean = false
                }
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

        vm.pageloadingboolean = true;

        vm.refresh = function() {
            $window.location.reload()
        };

        // filter lookalike
        vm.customaudience = 'kikoo'

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "filterbottomanimationup";
        vm.moreinfoboolean = false;

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

        vm.audienceshown = "0";

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

        for (var i = 0; i < vm.filter.length; i++) {

        }

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

        vm.readyboolean = false;

        vm.audiencenotreadyout = function() {
            vm.readyboolean = false;
        };

        vm.audiencenotreadyin = function(index) {
            if (vm.audiencesloaded[index].waitboolean === true) {
                var y = 78 + (index) * 50;
                var ypx = y.toString().concat('px');
                vm.readyboolean = true;
                $timeout(function() {
                    document.getElementById('notready').style.setProperty("top", ypx);
                });
            } else {
                vm.readyboolean = false;
            }
        };

        //Load more audience

        vm.counterload = 0;
        vm.loadmorebool = true;

        //Module pour ajouter des audiences test

        vm.addaudienceLoop = function() {
            var date = new Date();
            var creator = 'brice@deepsight.io';
            var name = "Produit pour pharmacien -40%";
            var nb_publishers = 13;
            var size = 17765;
            var format = 'Display';
            var waitboolean = false;
            var readyboolean = true;
            var makeadealboolean = false;
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

            lookalikeaudience.addaudienceLoop(creator, name, nb_publishers, size, format, date, publishers_list, waitboolean, readyboolean, makeadealboolean).then(function(model) {}).catch(function(error) {
                throw error;
            });
        };

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

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;

            lookalikeaudience.loadaudienceLoop(vm.currentuser.id).then(function(model) {
                vm.audiencesloaded = [];
                for (var i = 0; i < model.length; i++) {
                    var date = new Date(model[i].date);
                    model[i].date = vm.styledate(date);
                    if (isNaN(model[i].size) || model[i].size === null) {
                        model[i].size = '_'
                    }
                    vm.audiencesloaded.push(model[i])
                }
                vm.audienceshown = vm.audiencesloaded.length;
                vm.initialoffset = 5;
                vm.counter = 0;
                    if (vm.audiencesloaded.length === 0) {
                        vm.noaudiencebool = true;
                    } else if (vm.audiencesloaded.length !== 0){
                        vm.noaudiencebool = false;
                    }
                vm.pageloadingboolean = false;
                lookalikeaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.id).then(function(model) {
                    if (model.length === 0) {

                        vm.loadmorebool = false;

                    }
                }).catch(function(error) {});
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                throw error;
            });
        }).catch(function(error) {});

        $rootScope.$on('reloadlookalikeaudience', function(event, data) {
            vm.loadmorebool = true;

            user.getcurrentUser().then(function(model) {
                vm.currentuser = model;

                lookalikeaudience.loadaudienceLoop(vm.currentuser.id).then(function(model) {
                    vm.pageloadingboolean = false;
                    vm.audiencesloaded = [];
                    for (var i = 0; i < model.length; i++) {
                        var date = new Date(model[i].date);
                        model[i].date = vm.styledate(date);
                        if (isNaN(model[i].size) || model[i].size === null) {
                            model[i].size = '_'
                        }
                        vm.audiencesloaded.push(model[i])
                    }
                    vm.audienceshown = vm.audiencesloaded.length;
                    vm.initialoffset = 5;
                    vm.counter = 0;
                    if (vm.audiencesloaded.length === 0) {
                        vm.noaudiencebool = true;
                    } else if (vm.audiencesloaded.length !== 0){
                        vm.noaudiencebool = false;
                    }
                    lookalikeaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.id).then(function(model) {
                        if (model.length === 0) {
                            vm.loadmorebool = false;
                        }

                    }).catch(function(error) {});
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                    throw error;
                });
            }).catch(function(error) {});

        });

        vm.loadmore = function() {
            vm.pageloadingboolean = true;
            vm.counter = vm.counter + 5;
            lookalikeaudience.loadmoreaudienceLoop(vm.counter, vm.currentuser.id).then(function(model) {
                vm.pageloadingboolean = false;
                vm.audiencetoadd = [];
                for (var i = 0; i < model.length; i++) {
                    var date = new Date(model[i].date);
                    model[i].date = vm.styledate(date);
                    if (isNaN(model[i].size) || model[i].size === null) {
                        model[i].size = '_'
                    }
                    vm.audiencetoadd.push(model[i])
                }
                vm.audiencesloaded = vm.audiencesloaded.concat(vm.audiencetoadd);
                vm.audienceshown = vm.audiencesloaded.length;

                lookalikeaudience.loadmoreaudienceLoop(vm.counter + 5, vm.currentuser.id).then(function(model) {
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }
                }).catch(function(error) {});

            }).catch(function(error) {
                vm.pageloadingboolean = false;
            });

        };

        //Load more info about a Lookalike audience

        vm.audiencetodetail = {};

        vm.displaymoreinfo = function(index) {
            if (vm.audiencesloaded[index].waitboolean === false) {
                if (vm.moreinfoboolean === false) {
                    vm.moreinfoboolean = true
                } else if (vm.moreinfoboolean === true) {
                    vm.moreinfoboolean = false
                }
            }
        };

        vm.closemodalmoreinfo = function() {
            if (vm.moreinfoboolean === false) {
                vm.moreinfoboolean = true
            } else if (vm.moreinfoboolean === true) {
                vm.moreinfoboolean = false
            }
        };

        vm.loadmoreinfo = function(index) {
            if (vm.audiencesloaded[index].waitboolean === false) {
                vm.audiencetodetail = vm.audiencesloaded[index];
            }

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
