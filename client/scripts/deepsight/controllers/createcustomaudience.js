'use strict';
var controllername = 'createcustomaudience';
var crypto = require('crypto');
var Papa = require('papaparse');
var Dropzone = require('dropzone');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$window', '$timeout', '$state', '$scope', '$http', '$rootScope', databroker + '.customaudience', databroker + '.user', databroker + '.files'];

    function controller($window, $timeout, $state, $scope, $http, $rootScope, customaudience, user, files) {
        var vm = this;
        vm.controllername = fullname;

        // Choix user;

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "choicebottomanimationup";
        vm.nofileboolean = false;

        // $rootScope.$on('loadcustomaudiencetoextend', function(event, args) {
        //     vm.choice = args.name;
        //     vm.customchosen = args.id;
        //     vm.sizetodisplay = args.size;
        //     vm.audienceselected = args;
        //     vm.nofileboolean = true;

        //     vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

        // });

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

        vm.choice = 'Liste des utilisateurs disponibles pour lesquels vous pouvez créer une audience';
        vm.sortparameter = '';

        user.loadallusers().then(function(users) {
            console.log(users);
            vm.audiencetochose = [];
            vm.usertochose = users;
            for (var k = 0; k < users.length; k++) {
                var company = users[k].organization;
                var username = users[k].username;
                var nametodisplay = company.concat(' ', '-', ' ', username);
                vm.audiencetochose.push(nametodisplay)

            }
            console.log(vm.audiencetochose);
        }).catch(function(error) {
            console.log(error)
            throw error
        })

        vm.audiencetochose = [];

        vm.selectfilter = function(index) {
            vm.choice = vm.audiencetochose[index];
            vm.iduserchosentocreateaudience = vm.usertochose[index].id;
            vm.usernameuserchosentocreateaudience = vm.usertochose[index].username;


            // vm.customchosen = vm.audiencetochose[index].id;
            // vm.audienceselected = vm.audiencetochose[index];
            // vm.sizetodisplay = vm.audienceselected.size;
            // vm.lookalikeaudiencename = 'LA - '.concat(vm.styledate(new Date), ' ', vm.choice);

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup";
        };

        //popup log out
        vm.closeopenbool = false;

        vm.cancelfirststep = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        }

        vm.cancel = function() {
            $state.go('home.customaudience');
        }

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        //           Envoi email  

        vm.sendMail1 = function() {

            var name = vm.audiencetoshow.name;

            var subject = "Demande d'activation de l'audience commune ".concat(name)

            var message = "Bonjour Brice,"

            $window.open("mailto:" + 'brice@deepsight.io' + "?subject=" + subject + "&body=" + message, "_self");
        };

        //mesage bug matching

        vm.showmessage = 'information-block-error-done-up';

        $rootScope.$on('matchfailure', function(event, data) {
            vm.showmessage = 'information-block-error-done-down';
            $timeout(function() {
                vm.showmessage = 'information-block-error-done-up';
            }, 10000);
        });

        //message bug matching

        //End of popup log out

        vm.filename = "Chargez un fichier pour pouvoir passer à l'étape suivante";

        vm.filenameclass = "file-name-content-no-file"

        vm.loaderon = false;
        vm.loaderonper = false;

        vm.nofileboolean = false;
        vm.fileboolean = true;

        user.getcurrentUser().then(function(model) {
            vm.currentUser = model;
        });

        $rootScope.$on('progressPercentage', function(event, data) {});

        vm.errormd5head = false;

        vm.upload = function() {
            files.handleCSVFile(vm.file).then(function(result) {
                var currentDate = new Date().getTime();
                var filename = currentDate + '_' + result.file.name;
                vm.sizeAudience = result.size;
                vm.loaderonper = true;
                files.uploadFile(result.file, filename).then(function() {
                    vm.nextstepfunction();
                    vm.filename = filename;
                }, function(err) {
                    //Error upload
                });
            }, function(error) {
                vm.errormd5head = true;
            });
        };

        vm.audiencetodisplay = [];

        vm.match = function() {
            vm.loaderon = true;
            customaudience.createAudience(vm.iduserchosentocreateaudience, vm.currentUser.username, vm.audiencename).then(function(audience) {
                customaudience.match(vm.currentUser.username, vm.filename, audience.id).then(function(result) {
                    vm.audiencetodisplay = result.publishers;
                    vm.sizetodisplay = result.total;
                    // for (var i = 0; i < result.data.length; i++) {
                    //     vm.sizetodisplay = vm.sizetodisplay + result.data[i].count;
                    // }
                    customaudience.updateAudience(audience.id, result.total, result.publishers).then(function(audienceupdated) {
                        vm.audiencetoshow = audienceupdated;
                        vm.nextstepfunction();
                        vm.loaderon = false;
                    }).catch(function(error) {
                        throw erroe;
                    });
                }).catch(function(error) {
                    vm.loaderon = false;
                    $rootScope.$broadcast('matchfailure', null);
                });
            });
        };

        angular.element(document).ready(function() {
            var config = {
                url: 'a',
                autoProcessQueue: false,
                autoDiscover: false,
                clickable: '#select-zone',
                previewTemplate: document.getElementById('preview-template').innerHTML
            };
            var myDropzone = new Dropzone('div#dropzone-container', config);
            myDropzone.on('addedfile', function(file) {
                $scope.$apply(function() {
                    vm.file = file;
                    vm.filename = file.name;
                    vm.nofileboolean = true;
                    vm.fileboolean = false;
                    vm.filenameclass = "file-name-content";
                });

            });
        });

        vm.chossefile1 = 'chose-file-drag-and-drop-block';
        vm.chossefile2 = 'chose-file-drag-and-drop-inner-block';
        vm.chossefile3 = 'chose-file-drag-and-drop-title';

        vm.dropin = function() {
            vm.chossefile1 = 'chose-file-drag-and-drop-block-hover';
            vm.chossefile2 = 'chose-file-drag-and-drop-inner-block-hover';
            vm.chossefile3 = 'chose-file-drag-and-drop-title-hover';
        };

        vm.dropout = function() {
            vm.chossefile1 = 'chose-file-drag-and-drop-block';
            vm.chossefile2 = 'chose-file-drag-and-drop-inner-block';
            vm.chossefile3 = 'chose-file-drag-and-drop-title';
        };

        vm.gotocreatelookalike = function() {
            $state.go('home.lookalikeaudience.createlookalikeaudience').then(function() {
                $rootScope.$broadcast('loadcustomaudiencetoextend', vm.audiencetoshow);
            });
        }

        vm.gotocreatecampaign = function() {
            $state.go('home.createcampaign')
        }

        vm.nextstepboolean = false;
        vm.nextstepstyle = 'next-btn-disabled';
        // vm.temporaryaudiencename = 'exemple : clients janvier 2017';
        vm.audiencename = '';

        vm.counterstep = 1;
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

        vm.nextstepfunction = function() {

            // if (vm.counterstep === 1) {
            //     vm.loaderon = true;
            // } else if (vm.counterstep === 2) {} else if (vm.counterstep === 3) {} else if (vm.counterstep === 4) {}

            vm.loaderonper = false;
            vm.loaderon = false;

            // $timeout(function() {
            // vm.loaderon = false;
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
            } else if (vm.counterstep === 4) {
                vm.step1boolean = false;
                vm.step2boolean = false;
                vm.step3boolean = false;
                vm.step4boolean = true;
                vm.progressionstatenumber1 = "progression-state-number1-completed";
                vm.progressionstatenumber2 = "progression-state-number2-completed";
                vm.progressionstatenumber3 = "progression-state-number3-completed";
                vm.progressionstatenumber4 = "progression-state-number4-completed";
                vm.progressionstatename1 = "progression-state-name1-completed";
                vm.progressionstatename2 = "progression-state-name2-completed";
                vm.progressionstatename3 = "progression-state-name3-completed";
                vm.progressionstatename4 = "progression-state-name4-completed";
                vm.progressionbar12 = "progression-bar-1-2-completed";
                vm.progressionbar23 = "progression-bar-2-3-completed";
                vm.progressionbar34 = "progression-bar-3-4-completed";
            }
            // }, 3000);
        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
