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

        vm.choicename = 'Choix de la campagne';
        vm.sortparameter = '';

        vm.campaigntochose = [];
        vm.campaignchoice = {};

        user.getcurrentUser().then(function(model) {
            vm.currentuser = model;
            campaign.loadallcampaignbycreatorid(vm.currentuser.id).then(function(campaigns) {
                console.log('on va tenter de charger')
                console.log(campaigns);
                vm.campaigntochose = campaigns;
            }).catch(function(error) {
                console.log("On ne parvient pas à charger les campagnes dans l'outil de rapport");
                throw error;
            });

        }).catch(function(error) {});

        vm.selectfilter = function(index) {
            vm.campaignchoice = vm.campaigntochose[index];
            vm.choicename = vm.campaigntochose[index].name;

            vm.reach = vm.campaignchoice.size;

            vm.nofileboolean = true;
            vm.filtershown = "filterslideup";
            vm.filterclass = "rotateCounterwise";
            vm.filterbottom = "choicebottomanimationup-campaign";

            $rootScope.$broadcast('loadanalytics', null);
        };

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

        //Analytics à montrer

        vm.informationboolean = true;

        vm.abtestcomparisonboolean = false;

        vm.abtestboolean = false;

        // vm.analyticsboolean = true;

        vm.analyticsboolean = false;

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

        // vm.campagnetest = '5880f3183f81a5465a33b49c';

        vm.campagnetest = '123456';

        $rootScope.$on('loadanalytics', function() {

        });

        $rootScope.$on('loadanalytics', function() {
            console.log("on charge l'analytics");

            vm.typeofcampaigntodisplay = vm.campaignchoice.type_campaign;
            vm.idofcampaigntodisplay = vm.campaignchoice.id;

            vm.campaignname = vm.campaignchoice.name; // Commun à tous les affichages
            vm.campaignsubject = vm.campaignchoice.subject; // Commun à tous les affichages
            vm.campaigncompensationmode = vm.campaignchoice.compensation_mode; // Commun à tous les affichages
            vm.campaigncompensationprice = vm.campaignchoice.compensation_price; // Commun à tous les affichages

            if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'a') {
                console.log("on charge segment A");

                //Requête avec filtre a + Gros $watch

                /*********************************************
                Toutes les variables SEGMENT A AB/TEST
                *********************************************/

                vm.volumetotal = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_A) / 100);
                vm.campaingbudget = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_A) / 100;

                analytics.getOpensAB(vm.campagnetest, 'A').then(function(opens) {
                    console.log("Voici le nombre d'opens A");
                    vm.openstodisplay = opens.count;
                    console.log(vm.openstodisplay);
                    analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                        console.log("Voici le nombre de clicks A");
                        vm.clickstodisplay = clicks.count;
                        console.log(vm.clickstodisplay);
                        analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                            console.log("Voici le nombre de ventes A");
                            vm.salestodisplay = sales.count;
                            console.log(vm.salestodisplay);
                            analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                                console.log("Voici le nombre d'inscrits A");
                                vm.registrationstodisplay = registrations.count;
                                console.log(vm.registrationstodisplay);
                                analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                                    console.log("Voici le montant total des ventes A");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsales = totalsales.data.totalsales;
                                    console.log(vm.totalsales)
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                //     console.log("Voici le nombre de clicks A");
                //     vm.clickstodisplay = clicks.count;
                //     console.log(vm.clickstodisplay);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                //     console.log("Voici le nombre de ventes A");
                //     vm.salestodisplay = sales.count;
                //     console.log(vm.salestodisplay);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits A");
                //     vm.registrationstodisplay = registrations.count;
                //     console.log(vm.registrationstodisplay)
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                //     console.log("Voici le montant total des ventes A");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsales = totalsales.data.totalsales;
                //     console.log(vm.totalsales)
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                // vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                // vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                // vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                // vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'b') {

                console.log("on charge segment B");

                // Requête avec filtre b + Gros $watch

                /*********************************************
                Toutes les variables SEGMENT B AB/TEST
                *********************************************/

                vm.volumetotal = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_B) / 100);
                vm.campaingbudget = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_B) / 100;

                analytics.getOpensAB(vm.campagnetest, 'B').then(function(opens) {
                    console.log("Voici le nombre d'opens B");
                    vm.openstodisplay = opens.count;
                    console.log(vm.openstodisplay);
                    analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                        console.log("Voici le nombre de clicks B");
                        vm.clickstodisplay = clicks.count;
                        console.log(vm.clickstodisplay);
                        analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                            console.log("Voici le nombre de ventes B");
                            vm.salestodisplay = sales.count;
                            console.log(vm.salestodisplay);
                            analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                                console.log("Voici le nombre d'inscrits B");
                                vm.registrationstodisplay = registrations.count;
                                console.log(vm.registrationstodisplay);
                                analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                                    console.log("Voici le montant total des ventes B");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsales = totalsales.data.totalsales;
                                    console.log(vm.totalsales)
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                //     console.log("Voici le nombre de clicks B");
                //     vm.clickstodisplay = clicks.count;
                //     console.log(vm.clickstodisplay);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                //     console.log("Voici le nombre de ventes B");
                //     vm.salestodisplay = sales.count;
                //     console.log(vm.salestodisplay);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits B");
                //     vm.registrationstodisplay = registrations.count;
                //     console.log(vm.registrationstodisplay)
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                //     console.log("Voici le montant total des ventes B");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsales = totalsales.data.totalsales;
                //     console.log(vm.totalsales)
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                // vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                // vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                // vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                // vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'avsb') {

                console.log("on charge segment avsb");

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                vm.volumetotalA = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_A) / 100);
                vm.campaingbudgetA = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_A) / 100;

                analytics.getOpensAB(vm.campagnetest, 'A').then(function(opens) {
                    console.log("Voici le nombre d'opens A");
                    vm.openstodisplayA = opens.count;
                    console.log(vm.openstodisplayA);
                    analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                        console.log("Voici le nombre de clicks A");
                        vm.clickstodisplayA = clicks.count;
                        console.log(vm.clickstodisplayA);
                        analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                            console.log("Voici le nombre de ventes A");
                            vm.salestodisplayA = sales.count;
                            console.log(vm.salestodisplayA);
                            analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                                console.log("Voici le nombre d'inscrits A");
                                vm.registrationstodisplayA = registrations.count;
                                console.log(vm.registrationstodisplayA);
                                analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                                    console.log("Voici le montant total des ventes A");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsalesA = totalsales.data.totalsales;
                                    console.log(vm.totalsalesA);
                                    vm.orA = Math.round(vm.openstodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                    vm.ctrA = Math.round(vm.openstodisplayA / vm.clickstodisplayA * 100 * 100) / 100;
                                    vm.averagebasketA = Math.round(vm.totalsalesA / vm.salestodisplayA);
                                    vm.cacA = Math.round(vm.campaingbudgetA / vm.salestodisplayA * 100) / 100;
                                    vm.crA = Math.round(vm.salestodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                    vm.cplA = Math.round(vm.campaingbudgetA / vm.registrationstodisplayA * 100) / 100;
                                    vm.trA = Math.round(vm.registrationstodisplayA / vm.volumetotalA * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
                //     console.log("Voici le nombre de clicks A");
                //     vm.clickstodisplayA = clicks.count;
                //     console.log(vm.clickstodisplayA);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
                //     console.log("Voici le nombre de ventes A");
                //     vm.salestodisplayA = sales.count;
                //     console.log(vm.salestodisplayA);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits A");
                //     vm.registrationstodisplayA = registrations.count;
                //     console.log(vm.registrationstodisplayA)
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
                //     console.log("Voici le montant total des ventes A");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsalesA = totalsales.data.totalsales;
                //     console.log(vm.totalsalesA)
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.orA = Math.round(vm.openstodisplayA / vm.volumetotalA * 100 * 100) / 100;
                // vm.ctrA = Math.round(vm.openstodisplayA / vm.clickstodisplayA * 100 * 100) / 100;
                // vm.averagebasketA = Math.round(vm.totalsalesA / vm.salestodisplayA);
                // vm.cacA = Math.round(vm.campaingbudgetA / vm.salestodisplayA * 100) / 100;
                // vm.crA = Math.round(vm.salestodisplayA / vm.volumetotalA * 100 * 100) / 100;
                // vm.cplA = Math.round(vm.campaingbudgetA / vm.registrationstodisplayA * 100) / 100;
                // vm.trA = Math.round(vm.registrationstodisplayA / vm.volumetotalA * 100 * 100) / 100;

                vm.volumetotalB = Math.round((vm.campaignchoice.reach * vm.campaignchoice.reach_B) / 100);
                vm.campaingbudgetB = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_B) / 100;

                analytics.getOpensAB(vm.campagnetest, 'B').then(function(opens) {
                    console.log("Voici le nombre d'opens B");
                    vm.openstodisplayB = opens.count;
                    console.log(vm.openstodisplayB);
                    analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                        console.log("Voici le nombre de clicks B");
                        vm.clickstodisplayB = clicks.count;
                        console.log(vm.clickstodisplayB);
                        analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                            console.log("Voici le nombre de ventes B");
                            vm.salestodisplayB = sales.count;
                            console.log(vm.salestodisplayB);
                            analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                                console.log("Voici le nombre d'inscrits B");
                                vm.registrationstodisplayB = registrations.count;
                                console.log(vm.registrationstodisplayB);
                                analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                                    console.log("Voici le montant total des ventes B");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsalesB = totalsales.data.totalsales;
                                    console.log(vm.totalsalesB);
                                    vm.orB = Math.round(vm.openstodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                    vm.ctrB = Math.round(vm.openstodisplayB / vm.clickstodisplayB * 100 * 100) / 100;
                                    vm.averagebasketB = Math.round(vm.totalsalesB / vm.salestodisplayB);
                                    vm.cacB = Math.round(vm.campaingbudgetB / vm.salestodisplayB * 100) / 100;
                                    vm.crB = Math.round(vm.salestodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                    vm.cplB = Math.round(vm.campaingbudgetB / vm.registrationstodisplayB * 100) / 100;
                                    vm.trB = Math.round(vm.registrationstodisplayB / vm.volumetotalB * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
                //     console.log("Voici le nombre de clicks B");
                //     vm.clickstodisplayB = clicks.count;
                //     console.log(vm.clickstodisplayB);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
                //     console.log("Voici le nombre de ventes B");
                //     vm.salestodisplayB = sales.count;
                //     console.log(vm.salestodisplayB);
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits B");
                //     vm.registrationstodisplayB = registrations.count;
                //     console.log(vm.registrationstodisplayB)
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
                //     console.log("Voici le montant total des ventes B");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsalesB = totalsales.data.totalsales;
                //     console.log(vm.totalsalesB)
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.orB = Math.round(vm.openstodisplayB / vm.volumetotalB * 100 * 100) / 100;
                // vm.ctrB = Math.round(vm.openstodisplayB / vm.clickstodisplayB * 100 * 100) / 100;
                // vm.averagebasketB = Math.round(vm.totalsalesB / vm.salestodisplayB);
                // vm.cacB = Math.round(vm.campaingbudgetB / vm.salestodisplayB * 100) / 100;
                // vm.crB = Math.round(vm.salestodisplayB / vm.volumetotalB * 100 * 100) / 100;
                // vm.cplB = Math.round(vm.campaingbudgetB / vm.registrationstodisplayB * 100) / 100;
                // vm.trB = Math.round(vm.registrationstodisplayB / vm.volumetotalB * 100 * 100) / 100;

                // Requête avec filtre a + Gros $watch
                // Requête avec filtre b + Gros $watch

            } else if (vm.campaignchoice.type_campaign === 'ab' && vm.choicecampaigntype === 'ab') {

                console.log("on charge segment ab");

                console.log("on charge segment tout");

                // Requête sans filtre + Gros $watch

                /*********************************************
                Toutes les variables TOUTE LA CAMPAGNE
                *********************************************/

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                analytics.getOpens(vm.campagnetest).then(function(opens) {
                    console.log("Voici le nombre d'opens");
                    console.log(opens.count)
                    vm.openstodisplay = opens.count;
                    analytics.getClicks(vm.campagnetest).then(function(clicks) {
                        console.log("Voici le nombre de clicks");
                        console.log(clicks.count)
                        vm.clickstodisplay = clicks.count;
                        analytics.getSales(vm.campagnetest).then(function(sales) {
                            console.log("Voici le nombre de ventes");
                            console.log(sales.count);
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                                console.log("Voici le nombre d'inscrits");
                                console.log(registrations.count)
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                                    console.log("Voici le montant total des ventes");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicks(vm.campagnetest).then(function(clicks) {
                //     console.log("Voici le nombre de clicks");
                //     console.log(clicks.count)
                //     vm.clickstodisplay = clicks.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSales(vm.campagnetest).then(function(sales) {
                //     console.log("Voici le nombre de ventes");
                //     console.log(sales.count);
                //     vm.salestodisplay = sales.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits");
                //     console.log(registrations.count)
                //     vm.registrationstodisplay = registrations.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                //     console.log("Voici le montant total des ventes");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsales = totalsales.data.totalsales;
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                // vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                // vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                // vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                // vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;

            } else if (vm.campaignchoice.type_campaign === 'regular') {

                console.log("on charge segment tout");

                // Requête sans filtre + Gros $watch

                /*********************************************
                Toutes les variables TOUTE LA CAMPAGNE
                *********************************************/

                vm.volumetotal = vm.campaignchoice.reach;
                vm.campaingbudget = vm.campaignchoice.compensation_budget;

                analytics.getOpens(vm.campagnetest).then(function(opens) {
                    console.log("Voici le nombre d'opens");
                    console.log(opens.count)
                    vm.openstodisplay = opens.count;
                    analytics.getClicks(vm.campagnetest).then(function(clicks) {
                        console.log("Voici le nombre de clicks");
                        console.log(clicks.count)
                        vm.clickstodisplay = clicks.count;
                        analytics.getSales(vm.campagnetest).then(function(sales) {
                            console.log("Voici le nombre de ventes");
                            console.log(sales.count);
                            vm.salestodisplay = sales.count;
                            analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                                console.log("Voici le nombre d'inscrits");
                                console.log(registrations.count)
                                vm.registrationstodisplay = registrations.count;
                                analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                                    console.log("Voici le montant total des ventes");
                                    console.log(totalsales.data.totalsales);
                                    // console.log(registrations.count)
                                    vm.totalsales = totalsales.data.totalsales;
                                    vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                                    vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                                    vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                                    vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                                    vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                                    vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;
                                }).catch(function(error) {
                                    console.log("Erreur getTotalSales");
                                    throw error;
                                });
                            }).catch(function(error) {
                                console.log("Erreur getClicks");
                                throw error;
                            });
                        }).catch(function(error) {
                            console.log("Erreur getClicks");
                            throw error;
                        });
                    }).catch(function(error) {
                        console.log("Erreur getClicks");
                        throw error;
                    });
                }).catch(function(error) {
                    console.log("Erreur getOpens");
                    throw error;
                });

                // analytics.getClicks(vm.campagnetest).then(function(clicks) {
                //     console.log("Voici le nombre de clicks");
                //     console.log(clicks.count)
                //     vm.clickstodisplay = clicks.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getSales(vm.campagnetest).then(function(sales) {
                //     console.log("Voici le nombre de ventes");
                //     console.log(sales.count);
                //     vm.salestodisplay = sales.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
                //     console.log("Voici le nombre d'inscrits");
                //     console.log(registrations.count)
                //     vm.registrationstodisplay = registrations.count;
                // }).catch(function(error) {
                //     console.log("Erreur getClicks");
                //     throw error;
                // });

                // analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
                //     console.log("Voici le montant total des ventes");
                //     console.log(totalsales.data.totalsales);
                //     // console.log(registrations.count)
                //     vm.totalsales = totalsales.data.totalsales;
                // }).catch(function(error) {
                //     console.log("Erreur getTotalSales");
                //     throw error;
                // });

                // vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
                // vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
                // vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
                // vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
                // vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
                // vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;

            }

        });

        // vm.campagnetest = '5880f3183f81a5465a33b49c';

        // vm.campagnetest = '123456';

        // vm.typeofcampaigntodisplay = vm.campaignchoice.type_campaign;
        // vm.idofcampaigntodisplay = vm.campaignchoice.id;

        // /*********************************************
        //     Toutes les variables TOUTE LA CAMPAGNE
        // *********************************************/

        // $scope.$watch(function() {
        //     vm.volumetotal = vm.campaignchoice.reach;
        //     vm.campaignname = vm.campaignchoice.name; // Commun à tous les affichages
        //     vm.campaignsubject = vm.campaignchoice.subject; // Commun à tous les affichages
        //     vm.campaingbudget = vm.campaignchoice.compensation_budget;
        //     vm.campaigncompensationmode = vm.campaignchoice.compensation_mode; // Commun à tous les affichages
        //     vm.campaigncompensationprice = vm.campaignchoice.compensation_price; // Commun à tous les affichages
        //     vm.or = Math.round(vm.openstodisplay / vm.volumetotal * 100 * 100) / 100;
        //     vm.ctr = Math.round(vm.openstodisplay / vm.clickstodisplay * 100 * 100) / 100;
        //     vm.averagebasket = Math.round(vm.totalsales / vm.salestodisplay);
        //     vm.cac = Math.round(vm.campaingbudget / vm.salestodisplay * 100) / 100;
        //     vm.cr = Math.round(vm.salestodisplay / vm.volumetotal * 100 * 100) / 100;
        //     vm.cpl = Math.round(vm.campaingbudget / vm.registrationstodisplay * 100) / 100;
        //     vm.tr = Math.round(vm.registrationstodisplay / vm.volumetotal * 100 * 100) / 100;

        // })

        // vm.openstodisplay = 0;
        // vm.clickstodisplay = 0;
        // vm.salestodisplay = 0;
        // vm.registrationstodisplay = 0;
        // vm.totalsales = 0;

        // analytics.getOpens(vm.campagnetest).then(function(opens) {
        //     console.log("Voici le nombre d'opens");
        //     console.log(opens.count)
        //     vm.openstodisplay = opens.count;
        // }).catch(function(error) {
        //     console.log("Erreur getOpens");
        //     throw error;
        // });

        // analytics.getClicks(vm.campagnetest).then(function(clicks) {
        //     console.log("Voici le nombre de clicks");
        //     console.log(clicks.count)
        //     vm.clickstodisplay = clicks.count;
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getSales(vm.campagnetest).then(function(sales) {
        //     console.log("Voici le nombre de ventes");
        //     console.log(sales.count);
        //     vm.salestodisplay = sales.count;
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getRegistrations(vm.campagnetest).then(function(registrations) {
        //     console.log("Voici le nombre d'inscrits");
        //     console.log(registrations.count)
        //     vm.registrationstodisplay = registrations.count;
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getTotalsales(vm.campagnetest).then(function(totalsales) {
        //     console.log("Voici le montant total des ventes");
        //     console.log(totalsales.data.totalsales);
        //     // console.log(registrations.count)
        //     vm.totalsales = totalsales.data.totalsales;
        // }).catch(function(error) {
        //     console.log("Erreur getTotalSales");
        //     throw error;
        // });

        // /*********************************************
        //     Toutes les variables SEGMENT A AB/TEST
        // *********************************************/

        // vm.volumetotalA = (vm.campaignchoice.reach * vm.campaignchoice.reach_A) / 100;
        // vm.campaingbudgetA = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_A) / 100;

        // vm.openstodisplayA = 0;
        // vm.clickstodisplayA = 0;
        // vm.salestodisplayA = 0;
        // vm.registrationstodisplayA = 0;
        // vm.totalsalesA = 0;

        // vm.or = Math.round(vm.openstodisplayA / vm.volumetotalA * 100 * 100) / 100;
        // vm.ctr = Math.round(vm.openstodisplayA / vm.clickstodisplayA * 100 * 100) / 100;
        // vm.averagebasket = Math.round(vm.totalsalesA / vm.salestodisplayA);
        // vm.cac = Math.round(vm.campaingbudgetA / vm.salestodisplayA * 100) / 100;
        // vm.cr = Math.round(vm.salestodisplayA / vm.volumetotalA * 100 * 100) / 100;
        // vm.cpl = Math.round(vm.campaingbudgetA / vm.registrationstodisplayA * 100) / 100;
        // vm.tr = Math.round(vm.registrationstodisplayA / vm.volumetotalA * 100 * 100) / 100;

        // analytics.getOpensAB(vm.campagnetest, 'A').then(function(opens) {
        //     console.log("Voici le nombre d'opens A");
        //     vm.openstodisplayA = opens.count;
        //     console.log(vm.openstodisplayA);
        // }).catch(function(error) {
        //     console.log("Erreur getOpens");
        //     throw error;
        // });

        // analytics.getClicksAB(vm.campagnetest, 'A').then(function(clicks) {
        //     console.log("Voici le nombre de clicks A");
        //     vm.clickstodisplayA = clicks.count;
        //     console.log(vm.clickstodisplayA);
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getSalesAB(vm.campagnetest, 'A').then(function(sales) {
        //     console.log("Voici le nombre de ventes A");
        //     vm.salestodisplayA = sales.count;
        //     console.log(vm.salestodisplayA);
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getRegistrationsAB(vm.campagnetest, 'A').then(function(registrations) {
        //     console.log("Voici le nombre d'inscrits A");
        //     vm.registrationstodisplayA = registrations.count;
        //     console.log(vm.registrationstodisplayA)
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getTotalsalesAB(vm.campagnetest, 'A').then(function(totalsales) {
        //     console.log("Voici le montant total des ventes A");
        //     console.log(totalsales.data.totalsales);
        //     // console.log(registrations.count)
        //     vm.totalsalesA = totalsales.data.totalsales;
        //     console.log(vm.totalsalesA)
        // }).catch(function(error) {
        //     console.log("Erreur getTotalSales");
        //     throw error;
        // });

        // /*********************************************
        //     Toutes les variables SEGMENT B AB/TEST
        // *********************************************/

        // vm.volumetotalB = (vm.campaignchoice.reach * vm.campaignchoice.reach_B) / 100;
        // vm.campaingbudgetB = (vm.campaignchoice.compensation_budget * vm.campaignchoice.reach_B) / 100;

        // vm.openstodisplayB = 0;
        // vm.clickstodisplayB = 0;
        // vm.salestodisplayA = 0;
        // vm.registrationstodisplayB = 0;
        // vm.totalsalesB = 0;

        // vm.or = Math.round(vm.openstodisplayB / vm.volumetotalB * 100 * 100) / 100;
        // vm.ctr = Math.round(vm.openstodisplayB / vm.clickstodisplayB * 100 * 100) / 100;
        // vm.averagebasket = Math.round(vm.totalsalesB / vm.salestodisplayB);
        // vm.cac = Math.round(vm.campaingbudgetB / vm.salestodisplayB * 100) / 100;
        // vm.cr = Math.round(vm.salestodisplayB / vm.volumetotalB * 100 * 100) / 100;
        // vm.cpl = Math.round(vm.campaingbudgetB / vm.registrationstodisplayB * 100) / 100;
        // vm.tr = Math.round(vm.registrationstodisplayB / vm.volumetotalB * 100 * 100) / 100;

        // analytics.getOpensAB(vm.campagnetest, 'B').then(function(opens) {
        //     console.log("Voici le nombre d'opens B");
        //     vm.openstodisplayB = opens.count;
        //     console.log(vm.openstodisplayB);
        // }).catch(function(error) {
        //     console.log("Erreur getOpens");
        //     throw error;
        // });

        // analytics.getClicksAB(vm.campagnetest, 'B').then(function(clicks) {
        //     console.log("Voici le nombre de clicks B");
        //     vm.clickstodisplayB = clicks.count;
        //     console.log(vm.clickstodisplayB);
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getSalesAB(vm.campagnetest, 'B').then(function(sales) {
        //     console.log("Voici le nombre de ventes B");
        //     vm.salestodisplayB = sales.count;
        //     console.log(vm.salestodisplayB);
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getRegistrationsAB(vm.campagnetest, 'B').then(function(registrations) {
        //     console.log("Voici le nombre d'inscrits B");
        //     vm.registrationstodisplayB = registrations.count;
        //     console.log(vm.registrationstodisplayB)
        // }).catch(function(error) {
        //     console.log("Erreur getClicks");
        //     throw error;
        // });

        // analytics.getTotalsalesAB(vm.campagnetest, 'B').then(function(totalsales) {
        //     console.log("Voici le montant total des ventes B");
        //     console.log(totalsales.data.totalsales);
        //     // console.log(registrations.count)
        //     vm.totalsalesB = totalsales.data.totalsales;
        //     console.log(vm.totalsalesB)
        // }).catch(function(error) {
        //     console.log("Erreur getTotalSales");
        //     throw error;
        // });

        /*********************************************
            Toutes les DATA pour les courbes
        *********************************************/

        //Graph 1
        //Graph 1
        //Graph 1

        // vm.labels1 = ["Janvier", "Février", "Mars", "Avril"];
        vm.labels1 = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"];

        vm.series1 = ['Opens', 'Clicks'];

        // vm.data1 = [
        //     [1, 2, 3, 4],
        //     [0.5, 1, 1.5, 2]
        // ];

        analytics.getopensclicksData(vm.campagnetest).then(function(dataset) {
            vm.data1 = dataset.data.dataset;
        }).catch(function(error) {
            console.log("Erreur getopensclicksData");
            throw error;
        });

        vm.onClick1 = function(points, evt) {
            console.log(points, evt);
        }

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

        //Graph 2
        //Graph 2
        //Graph 2

        vm.labels2 = ["1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h", "23h", "24h"];

        vm.series2 = ['Sales', 'Registrations'];

        // vm.data2 = [
        //     [1, 2, 3, 4],
        //     [0.5, 1, 1.5, 2]
        // ];

        analytics.getregistrationssalesData(vm.campagnetest).then(function(dataset) {
            // console.log("Voici les data");
            // console.log(dataset);
            // console.log(dataset.data.dataset);
            // console.log(registrations.count);

            vm.data2 = dataset.data.dataset;
        }).catch(function(error) {
            console.log("Erreur getregistrationssalesData");
            throw error;
        });

        vm.onClick2 = function(points, evt) {
            console.log(points, evt);
        }

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
