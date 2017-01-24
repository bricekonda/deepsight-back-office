'use strict';
var controllername = 'createcampaign';
var Papa = require('papaparse');
var Dropzone = require('dropzone');

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$location', '$window', '$anchorScroll', '$timeout', '$rootScope', '$scope', '$state', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.user', databroker + '.files', databroker + '.campaign'];

    function controller($location, $window, $anchorScroll, $timeout, $rootScope, $scope, $state, lookalikeaudience, customaudience, user, files, campaign) {
        var vm = this;
        vm.controllername = fullname;

        //Choisir votre audience 

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "choicebottomanimationup-campaign";
        vm.nofileboolean = false;

        vm.showfilter = function() {
            if (vm.filterclass === "rotateCounterwise") {
                vm.filtershown = "filterslidedown";
                vm.filterclass = "rotate";
                vm.filterbottom = "choicebottomanimationdown-campaign";
            } else if (vm.filterclass === "rotate") {
                vm.filtershown = "filterslideup";
                vm.filterclass = "rotateCounterwise";
                vm.filterbottom = "choicebottomanimationup-campaign";
            }
        };

        vm.choicename = 'Choisissez une audience commune afin de construire une audience similaire';
        vm.sortparameter = '';

        vm.audiencetochose = [];
        vm.audiencechoice = {};

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;
            customaudience.loadallaudienceLoop(vm.currentuser.username).then(function(customaudience) {
                for (var i = 0; i < customaudience.length; i++) {
                    vm.audiencetochose.push(customaudience[i])
                }
                lookalikeaudience.loadallaudiencebycreatorid(vm.currentuser.username).then(function(lookalikeaudience) {
                    for (var k = 0; k < lookalikeaudience.length; k++) {
                        if (lookalikeaudience[k].makeadealboolean === true) {
                            vm.audiencetochose.push(lookalikeaudience[k])
                        }
                    }
                }).catch(function(error) {
                    console.log('Bad AudienceLoop ne fonctionne pas');
                    throw error;
                });
            }).catch(function(error) {
                console.log('Bad AudienceLoop ne fonctionne pas');
                throw error;
            });

        }).catch(function(error) {});

        vm.selectfilter = function(index) {
            vm.audiencechoice = vm.audiencetochose[index];
            vm.choicename = vm.audiencetochose[index].name;

            vm.reach = vm.audiencechoice.size;

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup-campaign";
        };

        //Volume des parties AB Test

        vm.ABtestboolean = false;

        //Choisir votre type de campagne

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

        vm.campaigntype = [{
            'type': 'regular',
            'name': 'Regular'
        }, {
            'type': 'ab',
            'name': 'AB'

        }]

        vm.choicecampaigntype = vm.campaigntype[0].type;

        vm.choicecampaignname = vm.campaigntype[0].name;

        vm.selectfiltercampaigntype = function(index) {
            vm.campaigntypetochoseobject = vm.campaigntype[index];
            vm.choicecampaignname = vm.campaigntype[index].name;
            vm.choicecampaigntype = vm.campaigntype[index].type;

            if (vm.choicecampaigntype === 'ab') {
                vm.ABtestboolean = true;
                vm.perreachA = 50;
                vm.perreachB = 100 - vm.perreachA;
            } else if (vm.choicecampaigntype === 'regular') {
                vm.ABtestboolean = false;
                vm.perreachA = '';
                vm.perreachB = '';
            }

            vm.filtershowncampaigntype = "filterslideup";
            vm.filterclasscampaigntype = "rotateCounterwise";
            vm.filterbottomcampaigntype = "choicebottomanimationup-campaign";
        };

        $scope.$watch(function() {
            vm.perreachB = 100 - vm.perreachA;
        });

        //Choisir votre type de format

        vm.format = [{
            format: 'VIDEO',
            id: 'video'
        }, {
            format: 'NATIVE',
            id: 'native'
        }, {
            format: 'EMAIL',
            id: 'email'
        }, {
            format: 'DISPLAY',
            id: 'display'
        }];

        vm.formatchosen = "";

        vm.choseformat = function(index) {
            vm.formatchosen = vm.format[index].id;
            console.log(vm.formatchosen);
            vm.index = index;

        }

        //Choisir votre type de rémunération

        vm.remuneration = [{
            rem: 'CPM',
            id: 'cpm'
        }, {
            rem: 'CPC',
            id: 'cpc'
        }, {
            rem: 'CPL',
            id: 'cpl'
        }, {
            rem: 'CPA',
            id: 'cpa'
        }];

        vm.remunerationchosen = "";

        vm.choseremuneration = function(index) {
            vm.remunerationchosen = vm.remuneration[index].id;
            console.log(vm.remunerationchosen);
            vm.indexrem = index;

        }

        $scope.$watch(function() {
            vm.budget = vm.volumeremuneration * vm.price;
        });

        vm.upload = function() {
            files.handleCSVFile(vm.file).then(function(result) {
                var currentDate = new Date().getTime();
                var filename = currentDate + '_' + result.file.name;
                vm.sizeAudience = result.size;
                vm.loaderonper = true;
                files.uploadFile(result.file, filename).then(function() {
                    console.log('on passe a letape suivante');
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

        vm.chossefile1 = 'chose-file-drag-and-drop-block-campaign';
        vm.chossefile2 = 'chose-file-drag-and-drop-inner-block-campaign';
        vm.chossefile3 = 'chose-file-drag-and-drop-title-campaign';

        vm.dropin = function() {
            vm.chossefile1 = 'chose-file-drag-and-drop-block-hover-campaign';
            vm.chossefile2 = 'chose-file-drag-and-drop-inner-block-hover-campaign';
            vm.chossefile3 = 'chose-file-drag-and-drop-title-hover-campaign';
        };

        vm.dropout = function() {
            vm.chossefile1 = 'chose-file-drag-and-drop-block-campaign';
            vm.chossefile2 = 'chose-file-drag-and-drop-inner-block-campaign';
            vm.chossefile3 = 'chose-file-drag-and-drop-title-campaign';
        };

        angular.element(document).ready(function() {
            var config = {
                url: 'a',
                autoProcessQueue: false,
                autoDiscover: false,
                clickable: '#select-zone-campaign',
                previewTemplate: document.getElementById('preview-template-campaign').innerHTML
            };
            var myDropzone = new Dropzone('div#dropzone-container-campaign', config);
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

        vm.test = function() {

            console.log("on y est");

        };

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('campaigncreationsuccess', function(event, data) {
            console.log('campaigncreationsuccess')

            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 10000);
        });

        vm.loaderon = false;

        $scope.$watch(function() {
                    vm.utmsource = 'deepsight';
        vm.utmmedium = vm.formatchosen.concat(vm.remunerationchosen);
        });

        vm.utmterm ="";
        vm.utmcontent ="";

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.loaderon = true;

                var idcreator = '';
                var name = vm.campaignname;
                var audience = vm.audiencechoice.id;
                var typecampaign = vm.choicecampaigntype;
                if (vm.choicecampaigntype === 'ab') {
                    var reachA = vm.perreachA;
                    var reachB = vm.perreachB;
                } else {
                    var reachA = 100;
                    var reachB = 0;
                }
                var subject = vm.campaignsubject;
                var date = new Date();
                var format = vm.formatchosen;
                var urlfile = 'http://www.urlducreatif';
                var information = vm.complementaryinformation;
                var compensationmode = vm.remunerationchosen;
                var compensationprice = vm.price;
                var compensationvolume = vm.volumeremuneration;
                var compensationbudget = vm.budget;
                var reach = vm.audiencechoice.size;
                var utmsource = vm.utmsource;
                var utmmedium = vm.utmmedium;
                var utmterm = vm.utmterm;
                var utmcontent = vm.utmcontent;
                var utmcampaign = '';
                var redirectionurl = vm.campaignurlredirection;
                var trackingurl = vm.campaignurltracking;

                console.log("on va scroller");

                user.getcurrentUser().then(function(user) {
                    var idcreator = user.id;
                    campaign.createcampaign(idcreator, name, audience, typecampaign, reachA, reachB, subject, date, format, urlfile, information, compensationmode, compensationprice, compensationvolume, compensationbudget, reach, utmsource, utmmedium, utmterm, utmcontent, utmcampaign, redirectionurl, trackingurl).then(function(campaign) {
                        $rootScope.$broadcast('campaigncreationsuccess', null);
                        var idcreator = '';
                        vm.campaignname = '';
                        vm.audiencechoice.id = '';
                        vm.choicecampaigntype = 'regular'
                        vm.campaignsubject = '';
                        vm.formatchosen = '';
                        vm.index = '';
                        vm.complementaryinformation = '';
                        vm.remunerationchosen = '';
                        vm.price = '';
                        vm.volumeremuneration = '';
                        vm.budget = ''
                        vm.utmsource = '';
                        vm.utmmedium = '';
                        vm.utmterm = '';
                        vm.utmcontent = '';
                        vm.campaignurlredirection = '';
                        vm.campaignurltracking = '';
                        var container = document.getElementById('block');
                        var scrollTo = document.getElementById('top');
                        container.scrollTop = scrollTo.offsetTop;
                        vm.loaderon = false;
                    }).catch(function(error) {
                        vm.loaderon = false;
                        throw error;
                    });

                }).catch(function(error) {
                    vm.loaderon = false;
                    throw error;
                });

            };

        }

    };

    controller.$inject = deps;
    app.controller(fullname, controller);
};
