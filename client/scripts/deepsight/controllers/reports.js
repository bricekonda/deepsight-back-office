'use strict';
var controllername = 'reports';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$location', '$window', '$anchorScroll', '$timeout', '$rootScope', '$scope', '$state', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.user', databroker + '.files', databroker + '.campaign', databroker + '.analytics'];

    function controller($location, $window, $anchorScroll, $timeout, $rootScope, $scope, $state, lookalikeaudience, customaudience, user, files, campaign, analytics) {
        var vm = this;
        vm.controllername = fullname;

        /*********************************************
            Choix de la campagne
        *********************************************/

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

        vm.choicename = 'Choix de la campagne';
        vm.sortparameter = '';

        vm.campaigntochose = [];
        vm.campaignchoice = {};

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;
            campaign.loadallcampaignbycreatorid(vm.currentuser.id).then(function(campaigns) {
                vm.campaigntochose = campaigns;
            }).catch(function(error) {
                throw error;
            });

        }).catch(function(error) {});

        $rootScope.$on('loadreport', function(event, args) {
            vm.campaignchoice = args;
            vm.choicename = args.name;
            $rootScope.$broadcast('loadanalytics', null);

        });

        vm.selectfilter = function(index) {
            vm.campaignchoice = vm.campaigntochose[index];
            vm.choicename = vm.campaigntochose[index].name;

            vm.reach = vm.campaignchoice.reach;

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup-campaign";

            $rootScope.$broadcast('loadanalytics', null);
        };

        /*********************************************
            Choix du type de campagne
        *********************************************/

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
            'type': 'avsb',
            'name': 'Comparaison A et B'

        }, {
            'type': 'ab',
            'name': 'A + B '
        }, {
            'type': 'a',
            'name': 'A'

        }, {
            'type': 'b',
            'name': 'B'

        }]

        vm.choicecampaigntype = vm.campaigntype[0].type;

        vm.choicecampaignname = vm.campaigntype[0].name;

        vm.selectfiltercampaigntype = function(index) {
            vm.campaigntypetochoseobject = vm.campaigntype[index];
            vm.choicecampaignname = vm.campaigntype[index].name;
            vm.choicecampaigntype = vm.campaigntype[index].type;

            vm.filtershowncampaigntype = "filterslideup";
            vm.filterclasscampaigntype = "rotateCounterwise";
            vm.filterbottomcampaigntype = "choicebottomanimationup-campaign";

            $rootScope.$broadcast('loadanalytics', null);
        };

        /*********************************************
            Choix du mode d'affichage AB, A, AB, AvsB, Regular
        *********************************************/

        vm.informationboolean = true;

        vm.abtestcomparisonboolean = false;

        vm.abtestboolean = false;

        vm.analyticsboolean = false;

        // vm.analyticsboolean = true;

        if (vm.choicename === 'Choix de la campagne') {
            vm.informationboolean = false;
        } else {
            vm.informationboolean = true;
        }

        if (vm.campaignchoice.type_campaign === 'ab') {
            vm.abtestboolean = true;
        } else {
            vm.abtestboolean = false;
        }

        if (vm.campaignchoice.type_campaign === 'ab' & vm.choicecampaigntype === 'avsb') {
            vm.analyticsboolean = false;
            vm.abtestcomparisonboolean = true;
        } else if (vm.choicename === 'Choix de la campagne') {
            vm.analyticsboolean = false;
        } else {
            vm.analyticsboolean = true;
        }

        $scope.$watch(function() {

            if (vm.choicename === 'Choix de la campagne') {
                vm.informationboolean = false;
            } else {
                vm.informationboolean = true;
            }

            if (vm.campaignchoice.type_campaign === 'ab') {
                vm.abtestboolean = true;
            } else {
                vm.abtestboolean = false;
            }

            if (vm.campaignchoice.type_campaign === 'ab' & vm.choicecampaigntype === 'avsb') {
                vm.analyticsboolean = false;
                vm.abtestcomparisonboolean = true;
            } else if (vm.choicename === 'Choix de la campagne') {
                vm.analyticsboolean = false;
            } else {
                vm.abtestcomparisonboolean = false;
                vm.analyticsboolean = true;
            }
        });

        /*********************************************
         *********************************************/
        /*********************************************
            ANALYTICS
        *********************************************/
        /*********************************************
         *********************************************/

        vm.campagnetest = '123456';

        $rootScope.$on('loadanalytics', function() {

            vm.typeofcampaigntodisplay = vm.campaignchoice.type_campaign;
            vm.idofcampaigntodisplay = vm.campaignchoice.id;

            vm.campaignname = vm.campaignchoice.name; // Commun à tous les affichages
            vm.campaignsubject = vm.campaignchoice.subject; // Commun à tous les affichages
            vm.campaigncompensationmode = vm.campaignchoice.compensation_mode; // Commun à tous les affichages
            vm.campaigncompensationprice = vm.campaignchoice.compensation_price; // Commun à tous les affichages

            if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'a') {

                //Requête avec filtre a + Gros $watch

                /*********************************************
                Toutes les variables SEGMENT A AB/TEST
                *********************************************/

                vm.volumetotal = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_A) / 100);
                vm.campaingbudget = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_A) / 100;

                vm.mainkpisboolean = true;
                vm.clicksandopensboolean = true;
                vm.registrationsandsalesboolean = true;

                analytics.getOpensAB(vm.campagnetest, 'A').then(function(opens) {
                    vm.openstodisplay = opens.count;
                    analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                        vm.clickstodisplay = clicks.count;
                        analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.mainkpisboolean = false;
                                    analytics.getopensclicksDataAB(vm.campagnetest, 'A', vm.period[0].code).then(function(dataset) {
                                        vm.data1 = dataset.data.dataset;
                                        vm.clicksandopensboolean = false;
                                        analytics.getregistrationssalesDataAB(vm.campagnetest, 'A', vm.period[0].code).then(function(dataset) {
                                            vm.data2 = dataset.data.dataset;
                                            vm.registrationsandsalesboolean = false;
                                        }).catch(function(error) {
                                            throw error;
                                        });
                                    }).catch(function(error) {
                                        throw error;
                                    });
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'b') {

                /*********************************************
                Toutes les variables SEGMENT B AB/TEST
                *********************************************/

                vm.volumetotal = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_B) / 100);
                vm.campaingbudget = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_B) / 100;

                vm.mainkpisboolean = true;
                vm.clicksandopensboolean = true;
                vm.registrationsandsalesboolean = true;

                analytics.getOpensAB(vm.campagnetest, 'B').then(function(opens) {
                    vm.openstodisplay = opens.count;
                    analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                        vm.clickstodisplay = clicks.count;
                        analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.mainkpisboolean = false;
                                    analytics.getopensclicksDataAB(vm.campagnetest, 'B', vm.period[0].code).then(function(dataset) {
                                        vm.data1 = dataset.data.dataset;
                                        vm.clicksandopensboolean = false;
                                        analytics.getregistrationssalesDataAB(vm.campagnetest, 'B', vm.period[0].code).then(function(dataset) {
                                            vm.data2 = dataset.data.dataset;
                                            vm.registrationsandsalesboolean = false;
                                        }).catch(function(error) {
                                            throw error;
                                        });
                                    }).catch(function(error) {
                                        throw error;
                                    });
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'avsb') {

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                vm.volumetotalA = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_A) / 100);
                vm.campaingbudgetA = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_A) / 100;

                vm.avsbloadingboolean = true;

                analytics.getOpensAB(vm.campagnetest, 'A').then(function(opens) {
                    vm.openstodisplayA = opens.count;
                    analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                        vm.clickstodisplayA = clicks.count;
                        analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                            vm.salestodisplayA = sales.count;
                            analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                                vm.registrationstodisplayA = registrations.count;
                                analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                                    vm.totalsalesA = totalsales.data.totalsales;
                                    vm.orA = Math.round(vm.openstodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                    vm.ctrA = Math.round(vm.openstodisplayA / vm.clickstodisplayA * 100 * 100) / 100;
                                    vm.averagebasketA = Math.round(vm.totalsalesA / vm.salestodisplayA);
                                    vm.cacA = Math.round(vm.campaingbudgetA / vm.salestodisplayA * 100) / 100;
                                    vm.crA = Math.round(vm.salestodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                    vm.cplA = Math.round(vm.campaingbudgetA / vm.registrationstodisplayA * 100) / 100;
                                    vm.trA = Math.round(vm.registrationstodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

                vm.volumetotalB = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_B) / 100);
                vm.campaingbudgetB = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_B) / 100;

                analytics.getOpensAB(vm.campagnetest, 'B').then(function(opens) {
                    vm.openstodisplayB = opens.count;
                    analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                        vm.clickstodisplayB = clicks.count;
                        analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                            vm.salestodisplayB = sales.count;
                            analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                                vm.registrationstodisplayB = registrations.count;
                                analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                                    vm.totalsalesB = totalsales.data.totalsales;
                                    vm.orB = Math.round(vm.openstodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                    vm.ctrB = Math.round(vm.openstodisplayB / vm.clickstodisplayB * 100 * 100) / 100;
                                    vm.averagebasketB = Math.round(vm.totalsalesB / vm.salestodisplayB);
                                    vm.cacB = Math.round(vm.campaingbudgetB / vm.salestodisplayB * 100) / 100;
                                    vm.crB = Math.round(vm.salestodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                    vm.cplB = Math.round(vm.campaingbudgetB / vm.registrationstodisplayB * 100) / 100;
                                    vm.trB = Math.round(vm.registrationstodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                    vm.avsbloadingboolean = false;
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'ab') {

                /*********************************************
                Toutes les variables TOUTE LA CAMPAGNE
                *********************************************/

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                vm.mainkpisboolean = true;
                vm.clicksandopensboolean = true;
                vm.registrationsandsalesboolean = true;

                analytics.getOpens(vm.campagnetest).then(function(opens) {
                    vm.openstodisplay = opens.count;
                    analytics.getClicks(vm.campagnetest).then(function(clicks) {
                        vm.clickstodisplay = clicks.count;
                        analytics.getSales(vm.campagnetest).then(function(sales) {
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.mainkpisboolean = false;
                                    analytics.getopensclicksData(vm.campagnetest, vm.period[0].code).then(function(dataset) {
                                        vm.data1 = dataset.data.dataset;
                                        vm.clicksandopensboolean = false;
                                        analytics.getregistrationssalesData(vm.campagnetest, vm.period[0].code).then(function(dataset) {
                                            vm.data2 = dataset.data.dataset;
                                            vm.registrationsandsalesboolean = true;
                                        }).catch(function(error) {
                                            throw error;
                                        });
                                    }).catch(function(error) {
                                        throw error;
                                    });
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

            } else if (vm.campaignchoice.type_campaign === 'regular') {

                /*********************************************
                Toutes les variables TOUTE LA CAMPAGNE
                *********************************************/

                vm.mainkpisboolean = true;
                vm.clicksandopensboolean = true;
                vm.registrationsandsalesboolean = true;

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                analytics.getOpens(vm.campagnetest).then(function(opens) {
                    vm.openstodisplay = opens.count;
                    analytics.getClicks(vm.campagnetest).then(function(clicks) {
                        vm.clickstodisplay = clicks.count;
                        analytics.getSales(vm.campagnetest).then(function(sales) {
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                                    // console.log(registrations.count)
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.mainkpisboolean = false;
                                    vm.data1 = [[10000,40000,20000,15000,10000,7000,5000,4000,3000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000],[1500,4400,2000,2500,1500,1200,800,1000,1400,900,700,600,500,500,500,500,500,500,500,500,500,500,500,500]];
                                    vm.data2 = [[10000,40000,20000,15000,10000,7000,5000,4000,3000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000],[1500,4400,2000,2500,1500,1200,800,1000,1400,900,700,600,500,500,500,500,500,500,500,500,500,500,500,500]];
                                    // analytics.getopensclicksData(vm.campagnetest, vm.period[0].code).then(function(dataset) {
                                    //     vm.data1 = dataset.data.dataset;
                                    //     console.log(vm.data1);
                                    //     vm.clicksandopensboolean = false;
                                    //     analytics.getregistrationssalesData(vm.campagnetest, vm.period[0].code).then(function(dataset) {
                                    //         vm.data2 = dataset.data.dataset;
                                    //         vm.registrationsandsalesboolean = false;
                                    //     }).catch(function(error) {
                                    //         throw error;
                                    //     });
                                    // }).catch(function(error) {
                                    //     throw error;
                                    // });
                                }).catch(function(error) {
                                    throw error;
                                });
                            }).catch(function(error) {
                                throw error;
                            });
                        }).catch(function(error) {
                            throw error;
                        });
                    }).catch(function(error) {
                        throw error;
                    });
                }).catch(function(error) {
                    throw error;
                });

            }

        });

        /*********************************************
            Toutes les DATA pour les courbes
        *********************************************/

        /*********************************************
            Commun aux deux graphs
        *********************************************/

        vm.period = [{
            'period': "24 hours",
            'code': "24-hours",
        }, {
            'period': "14 days",
            'code': "14-days",
        }, {
            'period': "30 days",
            'code': "30-days",
        }]

        vm.labellist = [
            ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"],
            ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14"],
            ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J20", "J21", "J22", "J23", "J24", "J25", "J26", "J27", "J28", "J29", "J29"]
        ]

        /*********************************************
            Graphique 1
        *********************************************/

        vm.series1 = ['Opens', 'Clicks'];

        vm.booleanperiod1 = false;

        vm.choseperiod1 = function() {
            if (vm.booleanperiod1 === false) {
                vm.booleanperiod1 = true
            } else if (vm.booleanperiod1 === true) {
                vm.booleanperiod1 = false
            }
        }

        vm.selectedperiod1 = vm.period[0].period;

        vm.selectperiod1 = function(index) {
            vm.selectedperiod1 = vm.period[index].period;
            vm.label1 = vm.labellist[index];
            vm.booleanperiod1 = false;
            vm.clicksandopensboolean = true;

            if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'a') {
                analytics.getopensclicksDataAB(vm.campagnetest, 'A', vm.period[index].code).then(function(dataset) {
                    vm.data1 = dataset.data.dataset;
                    vm.clicksandopensboolean = false;
                }).catch(function(error) {
                    vm.clicksandopensboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'b') {
                analytics.getopensclicksDataAB(vm.campagnetest, 'B', vm.period[index].code).then(function(dataset) {
                    vm.data1 = dataset.data.dataset;
                    vm.clicksandopensboolean = false;
                }).catch(function(error) {
                    vm.clicksandopensboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'ab') {
                analytics.getopensclicksData(vm.campagnetest, vm.period[index].code).then(function(dataset) {
                    vm.data1 = dataset.data.dataset;
                    vm.clicksandopensboolean = false;
                }).catch(function(error) {
                    vm.clicksandopensboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'regular') {
                analytics.getopensclicksData(vm.campagnetest, vm.period[index].code).then(function(dataset) {
                    vm.data1 = dataset.data.dataset;
                    vm.clicksandopensboolean = false;
                }).catch(function(error) {
                    vm.clicksandopensboolean = false;
                    throw error;
                });
            }

        }

        vm.label1 = vm.labellist[0];

        vm.onClick1 = function(points, evt) {}

        vm.datasetOverride1 = [{
            yAxisID: 'y-axis-1'
        }, {
            yAxisID: 'y-axis-2'
        }];

        vm.options1 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }, {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }]
            }
        };

        vm.chartcolor1 = ['#1580EF', '#50E3C2']

        /*********************************************
            Graphique 2
        *********************************************/

        vm.series2 = ['Sales', 'Registrations'];

        vm.booleanperiod2 = false;

        vm.choseperiod2 = function() {
            if (vm.booleanperiod2 === false) {
                vm.booleanperiod2 = true
            } else if (vm.booleanperiod2 === true) {
                vm.booleanperiod2 = false
            }
        }

        vm.selectedperiod2 = vm.period[0].period;

        vm.selectperiod2 = function(index) {
            vm.selectedperiod2 = vm.period[index].period;
            vm.label2 = vm.labellist[index];
            vm.booleanperiod2 = false;
            vm.registrationsandsalesboolean = true;

            if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'a') {
                analytics.getregistrationssalesDataAB(vm.campagnetest, 'A', vm.period[index].code).then(function(dataset) {
                    vm.data2 = dataset.data.dataset;
                    vm.registrationsandsalesboolean = false;
                }).catch(function(error) {
                    vm.registrationsandsalesboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'b') {
                analytics.getregistrationssalesDataAB(vm.campagnetest, 'B', vm.period[index].code).then(function(dataset) {
                    vm.data2 = dataset.data.dataset;
                    vm.registrationsandsalesboolean = false;
                }).catch(function(error) {
                    vm.registrationsandsalesboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'ab') {
                analytics.getregistrationssalesData(vm.campagnetest, vm.period[index].code).then(function(dataset) {
                    vm.data2 = dataset.data.dataset;
                    vm.registrationsandsalesboolean = false;
                }).catch(function(error) {
                    vm.registrationsandsalesboolean = false;
                    throw error;
                });
            } else if (vm.campaignchoice.type_campaign === 'regular') {
                analytics.getregistrationssalesData(vm.campagnetest, vm.period[index].code).then(function(dataset) {
                    vm.data2 = dataset.data.dataset;
                    vm.registrationsandsalesboolean = false;
                }).catch(function(error) {
                    vm.registrationsandsalesboolean = false;
                    throw error;
                });
            }

        }

        vm.label2 = vm.labellist[0];

        vm.onClick2 = function(points, evt) {}

        vm.datasetOverride2 = [{
            yAxisID: 'y-axis-1'
        }, {
            yAxisID: 'y-axis-2'
        }];

        vm.options2 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }, {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }]
            }
        };

        vm.chartcolor2 = ['#EB4A4C', '#F5A623']

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
