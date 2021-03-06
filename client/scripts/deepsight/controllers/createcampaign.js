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

        vm.chosecustomaudienceboolean = false;

        vm.audiencetochose = [];

        vm.loadallcustomaudienceByuserId = function() {
            vm.chosecustomaudienceboolean = true;
            console.log("hello")
            customaudience.loadallaudienceLoopById(vm.iduserchosentocreateaudience).then(function(customaudience) {
                for (var i = 0; i < customaudience.length; i++) {
                    vm.audiencetochose.push(customaudience[i])
                }
                lookalikeaudience.loadallaudienceById(vm.iduserchosentocreateaudience).then(function(lookalikeaudience) {
                    for (var k = 0; k < lookalikeaudience.length; k++) {
                        if (lookalikeaudience[k].makeadealboolean === true) {
                            vm.audiencetochose.push(lookalikeaudience[k])
                        }
                    }
                }).catch(function(error) {
                    throw error;
                });
            }).catch(function(error) {
                throw error;
            });
        }

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

        // user.getcurrentUser().then(function(model) {
        //     vm.currentuser = model;
        //     customaudience.loadallaudienceLoop(vm.currentuser.id).then(function(customaudience) {
        //         for (var i = 0; i < customaudience.length; i++) {
        //             vm.audiencetochose.push(customaudience[i])
        //         }
        //         lookalikeaudience.loadallaudiencebycreatorid(vm.currentuser.id).then(function(lookalikeaudience) {
        //             for (var k = 0; k < lookalikeaudience.length; k++) {
        //                 if (lookalikeaudience[k].makeadealboolean === true) {
        //                     vm.audiencetochose.push(lookalikeaudience[k])
        //                 }
        //             }
        //         }).catch(function(error) {
        //             throw error;
        //         });
        //     }).catch(function(error) {
        //         throw error;
        //     });

        // }).catch(function(error) {});

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
                vm.perreachA = 100;
                vm.perreachB = 0;
            } else if (vm.choicecampaigntype === 'regular') {
                vm.ABtestboolean = false;
                vm.perreachA = '';
                vm.perreachB = '';
            }

            vm.filtershowncampaigntype = "filterslideup";
            vm.filterclasscampaigntype = "rotateCounterwise";
            vm.filterbottomcampaigntype = "choicebottomanimationup-campaign";
        };

        // $scope.$watch(function() {
        //     vm.perreachB = 100 - vm.perreachA;
        // });

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
            vm.indexrem = index;

        }

        console.log(vm.indexrem)

        $scope.$watch(function() {
            vm.budget = vm.volumeremuneration * vm.price;
        });

        // vm.upload = function() {
        //     files.handleCSVFile(vm.file).then(function(result) {
        //         var currentDate = new Date().getTime();
        //         var filename = currentDate + '_' + result.file.name;
        //         vm.sizeAudience = result.size;
        //         vm.loaderonper = true;
        //         files.uploadFile(result.file, filename).then(function() {
        //             vm.filename = filename;
        //         }, function(err) {});
        //     }, function(error) {
        //         vm.errormd5head = true;
        //     });
        // };

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

        // angular.element(document).ready(function() {
        //     var config = {
        //         url: 'a',
        //         autoProcessQueue: false,
        //         autoDiscover: false,
        //         clickable: '#select-zone-campaign',
        //         previewTemplate: document.getElementById('preview-template-campaign').innerHTML
        //     };
        //     var myDropzone = new Dropzone('div#dropzone-container-campaign', config);
        //     myDropzone.on('addedfile', function(file) {
        //         $scope.$apply(function() {
        //             vm.file = file;
        //             vm.filename = file.name;
        //             vm.nofileboolean = true;
        //             vm.fileboolean = false;
        //             vm.filenameclass = "file-name-content";
        //         });

        //     });
        // });

        vm.test = function() {

        };

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('campaigncreationsuccess', function(event, data) {

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

        vm.utmterm = "";
        vm.utmcontent = "";
        vm.budget = '';
        vm.volumeremuneration = '';

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.loaderon = true;

                var userId = '';
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
                var urlfile = '';
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

                user.getcurrentUser().then(function(user) {
                    var creator = user.username;
                    campaign.createcampaign(vm.iduserchosentocreateaudience, creator, name, audience, typecampaign, reachA, reachB, subject, date, format, urlfile, information, compensationmode, compensationprice, compensationvolume, compensationbudget, reach, utmsource, utmmedium, utmterm, utmcontent, utmcampaign, redirectionurl, trackingurl).then(function(campaign) {
                        $rootScope.$broadcast('campaigncreationsuccess', null);
                        var idcreator = '';
                        var creator = user.username;
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
                        vm.choiceuser = 'Liste des utilisateurs disponibles pour lesquels vous pouvez créer une audience';
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
