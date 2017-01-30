'use strict';
var controllername = 'mycampaigns';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$window', '$timeout', '$rootScope', '$state', '$scope', databroker + '.user', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.campaign'];

    function controller($window, $timeout, $rootScope, $state, $scope, user, lookalikeaudience, customaudience, campaign) {
        var vm = this;
        vm.controllername = fullname;

        //popup cancel
        vm.closeopenbool = false;

        vm.loadindextodelete = function($index) {
            vm.indextodelete = $index;
        }

        vm.deleteaudience = function() {

            //Attention à vm.audiencesloaded si reverse dans le ng-repeat
            vm.closeopenbool = false;
            vm.pageloadingboolean = true;

            var audienceid = vm.audiencesloaded[vm.indextodelete].id

            campaign.deletecampaignbyid(audienceid).then(function(model) {
                $rootScope.$broadcast('reloadcampaigns', null);
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


        vm.gotoreporting = function(index) {
            vm.audiencetoshow = vm.audiencesloaded[index];
            $state.go('home.reports').then(function() {
                $rootScope.$broadcast('loadreport', vm.audiencetoshow);
            });
        }


        // filter lookalike
        vm.customaudience = 'kikoo';

        vm.pageloadingboolean = true;

        vm.filterclass = "rotateCounterwise";
        vm.filtershown = "filterslideup";
        vm.filterbottom = "filterbottomanimationup";
        vm.moreinfoboolean = false;

        vm.closemoreinfo = function() {
            if (vm.moreinfoboolean === false) {
                vm.moreinfoboolean = true
            } else if (vm.moreinfoboolean === true) {
                vm.moreinfoboolean = false
            }
        }

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
            'name': '- + BUDGET',
            'kinveyname': '+budget',
        }, {
            'name': '+ - BUDGET',
            'kinveyname': '-budget',
        }, {
            'name': '- +  REACH.',
            'kinveyname': '+reach',
        }, {
            'name': '+ - REACH',
            'kinveyname': '-reach',
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

        vm.loadmorebool = true;

        user.getcurrentUser().then(function(currentuser) {
            vm.currentuser = currentuser;
            console.log(currentuser);

            campaign.loadcampaigns(vm.currentuser.id).then(function(audience) {
                console.log(audience);
                vm.pageloadingboolean = false;
                vm.audiencesloaded = audience;
                vm.audienceshown = vm.audiencesloaded.length;
                vm.initialoffset = 5;
                vm.counter = 0;
                if (vm.audiencesloaded.length === 0) {
                    vm.noaudiencebool = true;
                }
                campaign.loadmorecampaigns(vm.initialoffset, vm.currentuser.id).then(function(moreaudience) {
                    console.log(moreaudience);
                    if (moreaudience.length === 0) {
                        vm.loadmorebool = false;
                    }

                }).catch(function(error) {});
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                throw error;
            });
        }).catch(function(error) {});

        $rootScope.$on('reloadcampaigns', function(event, data) {
            vm.loadmorebool = true;
            user.getcurrentUser().then(function(currentuser) {
                vm.currentuser = currentuser;
                campaign.loadcampaigns(vm.currentuser.id).then(function(audience) {
                    vm.pageloadingboolean = false;
                    vm.audiencesloaded = audience;
                    vm.audienceshown = vm.audiencesloaded.length;
                    vm.initialoffset = 5;
                    vm.counter = 0;
                    if (vm.audiencesloaded.length === 0) {
                        vm.noaudiencebool = true;
                    }
                    campaign.loadmorecampaigns(vm.initialoffset, vm.currentuser.id).then(function(moreaudience) {
                        if (moreaudience.length === 0) {
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
            campaign.loadmorecampaigns(vm.counter, vm.currentuser.id).then(function(model) {
                vm.pageloadingboolean = false;
                vm.audiencetoadd = model;
                vm.audiencesloaded = vm.audiencesloaded.concat(vm.audiencetoadd);
                vm.audienceshown = vm.audiencesloaded.length;

                campaign.loadmorecampaigns(vm.counter + 5, vm.currentuser.id).then(function(model) {
                    if (model.length === 0) {
                        vm.loadmorebool = false;
                    }
                }).catch(function(error) {});

            }).catch(function(error) {
                vm.pageloadingboolean = false;
            });

        };

        vm.audiencetodetail = {};

        vm.loadmoreinfo = function(index) {
            vm.pageloadingboolean = true;
            vm.campaigntodetail = vm.audiencesloaded[index];

            user.getcurrentUser().then(function(creator) {
                vm.creatorofthecampaign = creator;
            }).catch(function(error) {});

            if (vm.campaigntodetail.available === false) {
                vm.available = "La campagne n'est pas disponible";
            } else if (vm.campaigntodetail.available === true) {
                vm.available = "La campagne est disponible prête à être lancée";
            }

            lookalikeaudience.findaudiencebyID(vm.campaigntodetail.id_audience).then(function(audience) {
                vm.audienceused = audience;
                vm.pageloadingboolean = false;

                var ABtest = ['DeepsightA', 'DeepsightB'];
                var trackingvariable = ['open', 'click'];
                vm.listorurls = [];
                for (var i = 0; i < audience.publishers_list.length; i++) {
                    var urlset = {};
                    urlset.publisher = audience.publishers_list[i].publisher_name;
                    urlset.Aclick = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'click').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'A').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', audience.publishers_list[i].publisher_name);
                    urlset.Bclick = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'click').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'B').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', audience.publishers_list[i].publisher_name);
                    urlset.Aopen = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'open').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'A').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', audience.publishers_list[i].publisher_name);
                    urlset.Bopen = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'open').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'B').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', audience.publishers_list[i].publisher_name);
                    vm.listorurls.push(urlset);
                }
                vm.urlderedirection = vm.campaigntodetail.url_campaign.concat('?').concat('utm_source', '=').concat(vm.campaigntodetail.utm_source).concat('&', 'utm_medium', '=').concat(vm.campaigntodetail.utm_medium).concat('&', 'utm_term', '=').concat(vm.campaigntodetail.utm_term).concat('&', 'utm_content', '=').concat(vm.campaigntodetail.utm_content).concat('&', 'utm_campaign', '=').concat(vm.campaigntodetail.id);
            }).catch(function(error) {
                customaudience.findaudiencebyID(vm.campaigntodetail.id_audience).then(function(customaudience) {
                    vm.audienceused = customaudience;
                    vm.pageloadingboolean = false;

                    var ABtest = ['DeepsightA', 'DeepsightB'];
                    var trackingvariable = ['open', 'click'];
                    vm.listorurls = [];
                    for (var i = 0; i < customaudience.publishers_list.length; i++) {
                        var urlset = {};
                        urlset.publisher = customaudience.publishers_list[i].publisher_name;
                        urlset.Aclick = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'click').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'A').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', customaudience.publishers_list[i].publisher_name);
                        urlset.Bclick = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'click').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'B').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', customaudience.publishers_list[i].publisher_name);
                        urlset.Aopen = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'open').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'A').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', customaudience.publishers_list[i].publisher_name);
                        urlset.Bopen = vm.campaigntodetail.url_tracking_raw.concat('track?', 'e', '=', 'open').concat('&', 'type_campaign').concat('=', vm.campaigntodetail.type_campaign).concat('&', 'ABtest_segment').concat('=', 'B').concat('&', 'id_campaign').concat('=', vm.campaigntodetail.id).concat('&', 'publisher').concat('=', customaudience.publishers_list[i].publisher_name);
                        vm.listorurls.push(urlset);
                    }
                    vm.urlderedirection = vm.campaigntodetail.url_campaign.concat('?').concat('utm_source', '=').concat(vm.campaigntodetail.utm_source).concat('&', 'utm_medium', '=').concat(vm.campaigntodetail.utm_medium).concat('&', 'utm_term', '=').concat(vm.campaigntodetail.utm_term).concat('&', 'utm_content', '=').concat(vm.campaigntodetail.utm_content).concat('&', 'utm_campaign', '=').concat(vm.campaigntodetail.id);
                }).catch(function(error) {});
                vm.pageloadingboolean = false;
            });

        };

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
