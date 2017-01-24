'use strict';
var controllername = 'createcustomaudience';
var crypto = require('crypto');
var Papa = require('papaparse');
var Dropzone = require('dropzone');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$timeout', '$state', '$scope', '$http', '$rootScope', databroker + '.customaudience', databroker + '.user', databroker + '.files'];

    function controller($timeout, $state, $scope, $http, $rootScope, customaudience, user, files) {
        var vm = this;
        vm.controllername = fullname;

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

        vm.filename = "Upload un fichier pour pouvoir passer à l'étape suivante";

        vm.filenameclass = "file-name-content-no-file"

        vm.loaderon = false;
        vm.loaderonper = false;

        vm.nofileboolean = false;
        vm.fileboolean = true;

        user.getcurrentUser().then(function(model) {
            console.log('current user');
            vm.currentUser = model;
            console.log(model);
        });

        $rootScope.$on('progressPercentage', function(event, data) {
            console.log(data.value);
        });

        vm.errormd5head = false;

        vm.upload = function() {
            files.handleCSVFile(vm.file).then(function(result) {
                var currentDate = new Date().getTime();
                var filename = currentDate + '_' + result.file.name;
                vm.sizeAudience = result.size;
                vm.loaderonper = true;
                files.uploadFile(result.file, filename).then(function() {
                    console.log('on passe a letape suivante');
                    vm.nextstepfunction();
                    vm.filename = filename;
                }, function(err) {
                    console.log(err);
                    console.log('erreur upload');
                });
            }, function(error) {
                console.log('le fichier doit contenir lentete md5');
                vm.errormd5head = true;
                console.log(error);
            });
        };

        vm.audiencetodisplay = [];

        vm.match = function() {
            vm.loaderon = true;
            console.log(vm.currentUser.username);
            console.log(vm.audiencename);
            customaudience.createAudience(vm.currentUser.username, vm.audiencename).then(function(audience) {
                customaudience.match(vm.currentUser.username, vm.filename, audience.id).then(function(result) {
                    console.log('resultat matching');
                    console.log(result.data);
                    console.log(audience.id);
                    vm.audiencetodisplay = result.data;
                    vm.sizetodisplay = 0;
                    for (var i = 0; i < result.data.length; i++) {
                        vm.sizetodisplay = vm.sizetodisplay + result.data[i].count;
                    }
                    console.log(vm.sizetodisplay)
                    customaudience.updateAudience(audience.id, vm.sizeAudience, result.data);
                    vm.nextstepfunction();
                }).catch(function(error) {
                    vm.loaderon = false;
                    $rootScope.$broadcast('matchfailure', null);
                });;
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

        vm.nextstepboolean = false;
        vm.nextstepstyle = 'next-btn-disabled';
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

        // vm.saveaudiencetest = function() {
        //     vm.id = '';
        //     var name = vm.audiencename;
        //     var nbpublisher = 3;
        //     var size = vm.audiencetest[0].publisher[0].size + vm.audiencetest[0].publisher[1].size + vm.audiencetest[0].publisher[2].size;
        //     var publisher = vm.audiencetest[0].publisher;
        //     var publisher1 = vm.audiencetest[0].publisher[0];
        //     var publisher2 = vm.audiencetest[0].publisher[1];
        //     var publisher3 = vm.audiencetest[0].publisher[2];

        //     customaudience.addaudiencetest(name, nbpublisher, size, publisher1, publisher2, publisher3).then(function onSuccess(entity) {}).catch(function onError(error) {});

        // };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
