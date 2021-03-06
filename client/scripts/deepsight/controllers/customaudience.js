'use strict';
var controllername = 'customaudience';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var databroker = require('../../databroker')(app.name.split('.')[0]).name;
    var deps = ['$window', '$rootScope', '$timeout', '$state', '$scope', databroker + '.customaudience', databroker + '.user', 'Deepsightuser', 'Customaudience'];

    function controller($window, $rootScope, $timeout, $state, $scope, customaudience, user, Deepsightuser, Customaudience) {
        var vm = this;
        vm.controllername = fullname;

        vm.pageloadingboolean = true;

        //popup cancel
        vm.closeopenbool = false;

        vm.loadindextodelete = function($index) {
            vm.indextodelete = $index;
        }

        vm.deleteaudience = function() {

            vm.closeopenbool = false;

            vm.pageloadingboolean = true;
            //Attention à vm.audiencesloaded si reverse dans le ng-repeat

            var audienceid = vm.audiencesloaded[vm.indextodelete].id

            customaudience.deleteaudienceLoop(audienceid).then(function(model) {
                $rootScope.$broadcast('reloadcustomaudience', null);
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

        //Envoi mail
        vm.sendMail = function(index) {

            var name = vm.audiencesloaded[index].name;

            var subject = "Demande d'activation de l'audience commune ".concat(name)

            var message = "Bonjour Brice,"

            $window.open("mailto:" + 'brice@deepsight.io' + "?subject=" + subject + "&body=" + message, "_self");
        };

        vm.sendMail1 = function() {

            var name = vm.audiencetodetail.name;

            var subject = "Demande d'activation de l'audience commune ".concat(name)

            var message = "Bonjour Brice,"

            $window.open("mailto:" + 'brice@deepsight.io' + "?subject=" + subject + "&body=" + message, "_self");
        };

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

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;
            vm.pageloadingboolean = false;

            customaudience.loadaudienceLoop(vm.currentuser.id).then(function(model) {
                vm.audiencesloaded = [];
                for (var i = 0; i < model.length; i++) {
                    var date = new Date(model[i].date);
                    model[i].date = vm.styledate(date);
                    vm.audiencesloaded.push(model[i])
                }
                // vm.audiencesloaded = model;
                vm.audienceshown = vm.audiencesloaded.length;
                vm.initialoffset = 30;
                vm.counter = 0;
                if (vm.audiencesloaded.length === 0) {
                    vm.noaudiencebool = true;
                } else if (vm.audiencesloaded.length !== 0) {
                    vm.noaudiencebool = false;
                }
                customaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.id).then(function(model) {
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }

                }).catch(function(error) {});
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                throw error;
            });
        }).catch(function(error) {});

        $rootScope.$on('reloadcustomaudience', function(event, data) {
            vm.loadmorebool = true;
            user.getcurrentUser().then(function(model) {
                vm.currentuser = model;

                customaudience.loadaudienceLoop(vm.currentuser.id).then(function(model) {
                    vm.audiencesloaded = [];
                    for (var i = 0; i < model.length; i++) {
                        var date = new Date(model[i].date);
                        model[i].date = vm.styledate(date);
                        vm.audiencesloaded.push(model[i])
                    }
                    vm.audienceshown = vm.audiencesloaded.length;
                    vm.initialoffset = 30;
                    vm.counter = 0;
                    if (vm.audiencesloaded.length === 0) {
                        vm.noaudiencebool = true;
                    } else if (vm.audiencesloaded.length !== 0) {
                        vm.noaudiencebool = false;
                    }
                    vm.pageloadingboolean = false;
                    customaudience.loadmoreaudienceLoop(vm.initialoffset, vm.currentuser.id).then(function(model) {
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
            vm.counter = vm.counter + 30;
            customaudience.loadmoreaudienceLoop(vm.counter, vm.currentuser.id).then(function(model) {
                vm.pageloadingboolean = false;
                vm.audiencetoadd = [];
                for (var i = 0; i < model.length; i++) {
                    var date = new Date(model[i].date);
                    model[i].date = vm.styledate(date);
                    vm.audiencetoadd.push(model[i])
                }
                vm.audiencesloaded = vm.audiencesloaded.concat(vm.audiencetoadd);
                vm.audienceshown = vm.audiencesloaded.length;

                customaudience.loadmoreaudienceLoop(vm.counter + 30, vm.currentuser.id).then(function(model) {
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }
                }).catch(function(error) {});

            }).catch(function(error) {
                vm.pageloadingboolean = false;
            });

        };

        //More info

        vm.moreinfoboolean = false;

        vm.closemoreinfo = function() {
            if (vm.moreinfoboolean === false) {
                vm.moreinfoboolean = true;
            } else if (vm.moreinfoboolean === true) {
                vm.moreinfoboolean = false;
            }
        }

        //Modification de l'audience

        vm.audiencetodetail = {};

        vm.modifyaudience = false;

        vm.loadaudience = function() {
            if (vm.modifyaudience === true) {
                vm.modifyaudience = false;
            } else if (vm.modifyaudience === false) {
                vm.modifyaudience = true
            }
        }

        vm.loadaudiencedetail = function(index) {
            vm.audiencetodetail = vm.audiencesloaded[index];
            console.log(vm.audiencetodetail);

        };

        vm.emailboolean = true;

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.audiencetodetail.creator);
        }

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('customaudienceupdated', function(event, data) {
            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 6000);
        });

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.pageloadingboolean = true;
                console.log("kikoo")
                var id = vm.audiencetodetail.id
                var name = vm.audiencetodetail.name;
                var size = vm.audiencetodetail.size;
                var nb_publishers = vm.audiencetodetail.nb_publishers;
                var creator = vm.audiencetodetail.creator;
                console.log(id);

                customaudience.updateallparametersAudience(id, name, size, nb_publishers, creator).then(function(audience) {
                    $rootScope.$broadcast('customaudienceupdated', null);
                    $rootScope.$broadcast('reloadcustomaudience', null);
                    vm.loadaudience()
                    var container = document.getElementById('customaudienceblock');
                    container.scrollTop = scrollTo.offsetTop;
                    console.log(audience);
                    vm.audiencetodetail = {};
                    vm.pageloadingboolean = false;
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                    throw error
                })

                // user.updateuserattributes(id, firstname, lastname, organization, username).then(function(user) {
                //     authentication.updateuserwithroles(id, vm.usertomodifytype).then(function(res) {
                //         console.log(res)
                //         $rootScope.$broadcast('userupdatesuccess', null);
                //         $rootScope.$broadcast('reloadusermanagement', null);
                //         vm.modifyinformationf();
                //         vm.pageloadingboolean = false;
                //         vm.user.firstname = '';
                //         vm.user.lastname = '';
                //         vm.user.organization = '';
                //         vm.user.email = '';
                //         vm.user.id = '';
                //         var container = document.getElementById('usermanagementblock');
                //         // var scrollTo = document.getElementById('top');
                //         container.scrollTop = scrollTo.offsetTop;
                //         console.log(user)
                //     }).catch(function(error) {
                //         vm.pageloadingboolean = false;
                //     });

                // }).catch(function(error) {
                //     vm.pageloadingboolean = false;
                // });
            };
        };

    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};
