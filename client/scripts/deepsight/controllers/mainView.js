'use strict';
var controllername = 'mainView';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$http', '$timeout', '$rootScope', '$state', '$scope', '$location', authentication + '.authentication', databroker + '.user', 'Customaudience'];

    function controller($http, $timeout, $rootScope, $state, $scope, $location, authentication, user, Customaudience) {
        var vm = this;
        vm.controllername = fullname;

        vm.testusercreation = function() {
            authentication.signUpwithroles('jimmy@gmail.com', 'Deepsight02', 'jimmy', 'jimmy', 'Deepsight SAS', 'jimmy@gmail.com', 'client').then(function(user) {
            }).catch(function(error) {
                throw error;
            })
        };

        //popup log out
        vm.closeopenbool = false;

        vm.logOutfirststep = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        }

        vm.logOut = function() {
            vm.logoutboolean = true;
            authentication.logOut().then(function onSuccess() {
                vm.logoutboolean = false;
                $rootScope.$broadcast('logoutSuccess', null);
            }).catch(function onError(error) {
                vm.logoutboolean = false;
                $rootScope.$broadcast('logoutfailed', null);
            });
        }

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        //End of popup log out

        vm.brice = function() {
            Customaudience.create({
                name: 'Comparadise'
            }).$promise.then(function(response) {});
        };

        // user.getUser().then(function(user) {
        //     vm.activeusername = user.data.firstname;
        //     vm.userorganization = user.data.organization;
        // }).catch(function(error) {

        // });

        user.getcurrentUser().then(function(model) {
            vm.activeusername = model.firstname;
        }).catch(function(error) {});

        vm.logoutboolean = false;

        //top bar 

        //detail block top bar
        vm.detailshowync = false;

        vm.topbarshowclass = "rotateCounterwise";
        vm.notifshowyn = false;

        vm.showdetail = function() {
            if (vm.detailshowync === true) {
                vm.detailshowync = false;
                vm.notifshowyn = false;
                vm.topbarshowclass = "rotateCounterwise";
            } else if (vm.detailshowync === false) {
                vm.detailshowync = true;
                vm.notifshowyn = false;
                vm.topbarshowclass = "rotate";
            }
        };

        vm.shownotif = function() {
            if (vm.notifshowyn === true) {
                vm.detailshowync = false;
                vm.notifshowyn = false;
                vm.topbarshowclass = "rotateCounterwise";
            } else if (vm.notifshowyn === false) {
                vm.detailshowync = false;
                vm.notifshowyn = true;
                vm.topbarshowclass = "rotateCounterwise";

            }
        };

        vm.showyn = "slideup";
        vm.rotate = "rotateCounterwise";
        vm.subcategoryiconpath = "images/category-icon.png";

        vm.gotostate = function() {
            $state.go('home.summary');
        };

        //Side bar 
        // à modifier à l'ajout de nouvelles catégories

        vm.showyn = "slideup";
        vm.rotate = "rotateCounterwise";
        vm.homeclass = 'subcategory-link-home';

        vm.goto = function(parentindex, index) {
            $state.go(vm.categorybis[parentindex].subcategoryname[index].statename);
        };

        vm.categorybis = [{
            'name': 'Gestion',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Utilisateurs',
                'statename': 'home.usermanagement',
                'class': 'subcategory-link',
                'picto': 'images/general-information-grey.svg'
            }]
        },{
            'name': 'Tags',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Plan de taggage',
                'statename': 'home.mytags',
                'class': 'subcategory-link',
                'picto': 'images/tag-grey.svg',
            }]
        },{
            'name': 'Audience',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Audience commune',
                'statename': 'home.customaudience',
                'class': 'subcategory-link',
                'picto': 'images/custom-grey.svg',
            }, {
                'name': 'Audience similaire',
                'statename': 'home.lookalikeaudience',
                'class': 'subcategory-link',
                'picto': 'images/lookalike-grey.svg'
            }]
        }, {
            'name': 'Campagnes',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Créer une campagne',
                'statename': 'home.createcampaign',
                'class': 'subcategory-link',
                'picto': 'images/create-campaign-grey.svg',
            }, {
                'name': 'Mes campagnes',
                'statename': 'home.mycampaigns',
                'class': 'subcategory-link',
                'picto': 'images/my-campaigns-grey.svg'
            }, {
                'name': 'Rapport de campagnes',
                'statename': 'home.reports',
                'class': 'subcategory-link',
                'picto': 'images/reports-grey.svg'
            }]
        }, {
            'name': 'Facturation',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Mes factures',
                'statename': 'home.billing',
                'class': 'subcategory-link',
                'picto': 'images/billing-grey.svg',
            }, {
                'name': 'Paiement',
                'statename': 'home.payment',
                'class': 'subcategory-link',
                'picto': 'images/payment-grey.svg'
            }]
        }, {
            'name': 'Paramètres',
            'statename': '',
            'class': 'slideup',
            'classbis': 'rotateCounterwise',
            'subcategoryname': [{
                'name': 'Informations générales',
                'statename': 'home.generalinformation',
                'class': 'subcategory-link',
                'picto': 'images/general-information-grey.svg'
            }, {
                'name': 'Conditions générales',
                'statename': 'home.tandcs',
                'class': 'subcategory-link',
                'picto': 'images/terms-and-conditions-grey.svg'
            }]
        }];

        // vm.categorybis = [{
        //     'name': 'Audience',
        //     'statename': '',
        //     'class': 'slideup',
        //     'classbis': 'rotateCounterwise',
        //     'subcategoryname': [{
        //         'name': 'Audience commune',
        //         'statename': 'home.customaudience',
        //         'class': 'subcategory-link',
        //         'picto': 'images/custom-grey.svg',
        //     }, {
        //         'name': 'Audience similaire',
        //         'statename': 'home.lookalikeaudience',
        //         'class': 'subcategory-link',
        //         'picto': 'images/lookalike-grey.svg'
        //     }]
        // }, {
        //     'name': 'Campagnes',
        //     'statename': '',
        //     'class': 'slideup',
        //     'classbis': 'rotateCounterwise',
        //     'subcategoryname': [{
        //         'name': 'Mes campagnes',
        //         'statename': 'home.mycampaigns',
        //         'class': 'subcategory-link',
        //         'picto': 'images/my-campaigns-grey.svg'
        //     }, {
        //         'name': 'Rapport de campagnes',
        //         'statename': 'home.reports',
        //         'class': 'subcategory-link',
        //         'picto': 'images/reports-grey.svg'
        //     }]
        // },{
        //     'name': 'Paramètres',
        //     'statename': '',
        //     'class': 'slideup',
        //     'classbis': 'rotateCounterwise',
        //     'subcategoryname': [{
        //         'name': 'Informations générales',
        //         'statename': 'home.generalinformation',
        //         'class': 'subcategory-link',
        //         'picto': 'images/general-information-grey.svg'
        //     }, {
        //         'name': 'Termes et conditions',
        //         'statename': 'home.tandcs',
        //         'class': 'subcategory-link',
        //         'picto': 'images/terms-and-conditions-grey.svg'
        //     }]
        // }];

        vm.showyncategory = function(index) {
            if (vm.categorybis[index].class === "slideup") {
                vm.categorybis[index].class = "slidedown";
                vm.categorybis[index].classbis = "rotate";
            } else if (vm.categorybis[index].class === "slidedown") {
                vm.categorybis[index].class = "slideup";
                vm.categorybis[index].classbis = "rotateCounterwise";
            }

        };

        vm.homeclass = 'subcategory-link-home';

        if ($state.current.name === 'home.summary') {
            vm.homeclass = 'subcategory-link-home-selected';

        } else {
            vm.homeclass = 'subcategory-link-home';
            for (var i = 0; i < vm.categorybis.length; i++) {
                var L = vm.categorybis[i].subcategoryname.length;
                if (L !== 0) {
                    for (var j = 0; j < L; j++) {
                        if ($state.current.name === vm.categorybis[i].subcategoryname[j].statename) {
                            vm.categorybis[i].subcategoryname[j].class = 'subcategory-link-hover';
                            vm.categorybis[i].subcategoryname[j].picto = vm.categorybis[i].subcategoryname[j].picto.slice(0, -8).concat('blue.svg');

                        }
                    }
                }
            }
        };

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                if (toState.name === 'home.summary') {
                    vm.homeclass = 'subcategory-link-home-selected';
                    for (var i = 0; i < vm.categorybis.length; i++) {
                        var L = vm.categorybis[i].subcategoryname.length;
                        if (L !== 0) {
                            for (var j = 0; j < L; j++) {
                                vm.categorybis[i].subcategoryname[j].class = 'subcategory-link';
                                vm.categorybis[i].subcategoryname[j].picto = vm.categorybis[i].subcategoryname[j].picto.slice(0, -8).concat('grey.svg');
                            }
                        }
                    }
                } else {
                    vm.homeclass = 'subcategory-link-home';
                    for (var i = 0; i < vm.categorybis.length; i++) {
                        var L = vm.categorybis[i].subcategoryname.length;
                        if (L !== 0) {
                            for (var j = 0; j < L; j++) {
                                if (toState.name === vm.categorybis[i].subcategoryname[j].statename) {
                                    vm.categorybis[i].subcategoryname[j].class = 'subcategory-link-hover';
                                    vm.categorybis[i].subcategoryname[j].picto = vm.categorybis[i].subcategoryname[j].picto.slice(0, -8).concat('blue.svg');

                                } else {
                                    vm.categorybis[i].subcategoryname[j].class = 'subcategory-link';
                                    vm.categorybis[i].subcategoryname[j].picto = vm.categorybis[i].subcategoryname[j].picto.slice(0, -8).concat('grey.svg');
                                }
                            }
                        }
                    }
                };

            });

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
