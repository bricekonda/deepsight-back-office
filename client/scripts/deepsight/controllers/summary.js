'use strict';
var controllername = 'summary';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$location', '$window', '$anchorScroll', '$timeout', '$rootScope', '$scope', '$state', databroker + '.lookalikeaudience', databroker + '.customaudience', databroker + '.user', databroker + '.files', databroker + '.campaign', databroker + '.analytics'];

    function controller($location, $window, $anchorScroll, $timeout, $rootScope, $scope, $state, lookalikeaudience, customaudience, user, files, campaign, analytics) {
        var vm = this;
        vm.controllername = fullname;

        vm.pageloadingboolean = true;

        vm.todaydate = new Date();

        vm.period = 28 * 24 * 60 * 60 * 1000;

        vm.week = 7 * 24 * 60 * 60 * 1000;

        vm.limitdate = new Date(vm.todaydate.getTime() - vm.period)

        // console.log(vm.limitdate);

        vm.getWeekNumber = function(d) {
            // Copy date so don't modify original
            d = new Date(+d);
            d.setHours(0, 0, 0, 0);
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            // Get first day of year
            var yearStart = new Date(d.getFullYear(), 0, 1);
            // Calculate full weeks to nearest Thursday
            var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            // Return array of year and week number
            return [d.getFullYear(), weekNo];
        }

        vm.currentYS = vm.getWeekNumber(vm.todaydate);
        vm.currentweek = vm.currentYS[1];
        console.log(vm.currentYS);

        vm.labels = [];

        for (var k = 0; k < 4; k++) {
            var S = 'S';
            var W = vm.currentYS[1] - (3 - k);
            vm.labels.push(S.concat(W.toString()));

        }

        console.log(vm.labels);

        vm.dataset1 = [0, 0, 0, 0];
        vm.dataset2 = [0, 0, 0, 0];
        vm.dataset3 = [0, 0, 0, 0];

        customaudience.findaudiencesbyDate(vm.limitdate).then(function(customaudiencelist) {
            vm.customaudience = customaudiencelist.length;

            for (var i = 0; i < customaudiencelist.length; i++) {
                var weekdiff = 3 - (vm.currentweek - vm.getWeekNumber(new Date(customaudiencelist[i].date))[1]);
                if (weekdiff === 3) {
                    vm.dataset1[3] = vm.dataset1[3] + 1
                } else if (weekdiff === 2) {
                    vm.dataset1[2] = vm.dataset1[2] + 1
                } else if (weekdiff === 1) {
                    vm.dataset1[1] = vm.dataset1[1] + 1
                } else if (weekdiff === 0) {
                    vm.dataset1[0] = vm.dataset1[0] + 1
                }
            }
            console.log(vm.dataset1)

            lookalikeaudience.findaudiencesbyDate(vm.limitdate).then(function(lookalikeaudiencelist) {
                vm.lookalikeaudience = lookalikeaudiencelist.length;

                for (var i = 0; i < lookalikeaudiencelist.length; i++) {
                    var weekdiff = 3 - (vm.currentweek - vm.getWeekNumber(new Date(lookalikeaudiencelist[i].date))[1]);
                    if (weekdiff === 3) {
                        vm.dataset2[3] = vm.dataset2[3] + 1
                    } else if (weekdiff === 2) {
                        vm.dataset2[2] = vm.dataset2[2] + 1
                    } else if (weekdiff === 1) {
                        vm.dataset2[1] = vm.dataset2[1] + 1
                    } else if (weekdiff === 0) {
                        vm.dataset2[0] = vm.dataset2[0] + 1
                    }
                }
                console.log(vm.dataset2)

                campaign.findcampaignsbyDate(vm.limitdate).then(function(campaignlist) {
                    vm.marketingcampaigns = campaignlist.length;

                    for (var i = 0; i < campaignlist.length; i++) {
                        var weekdiff = 3 - (vm.currentweek - vm.getWeekNumber(new Date(campaignlist[i].date))[1]);
                        if (weekdiff === 3) {
                            vm.dataset3[3] = vm.dataset3[3] + 1
                        } else if (weekdiff === 2) {
                            vm.dataset3[2] = vm.dataset3[2] + 1
                        } else if (weekdiff === 1) {
                            vm.dataset3[1] = vm.dataset3[1] + 1
                        } else if (weekdiff === 0) {
                            vm.dataset3[0] = vm.dataset3[0] + 1
                        }
                    }
                    console.log(vm.dataset3)

                    vm.pageloadingboolean = false;
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                    throw error
                })
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                throw error
            })
        }).catch(function(error) {
            vm.pageloadingboolean = false;
            throw error
        })

        //Chart Audiences communes crées

        vm.label1 = vm.labels;

        vm.data1 = [
            vm.dataset1
        ];

        vm.series1 = ['Audiences communes crées'];

        vm.onClick1 = function(points, evt) {}

        vm.datasetOverride1 = [{
            yAxisID: 'y-axis-1'
        }];

        vm.options1 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };

        vm.chartcolor1 = ['#EB4A4C']

        //Chart Audiences similaires crées

        vm.label2 = vm.labels;

        vm.data2 = [
            vm.dataset2
        ];

        vm.series2 = ['Audiences similaires crées'];

        vm.onClick2 = function(points, evt) {}

        vm.datasetOverride2 = [{
            yAxisID: 'y-axis-1'
        }];

        vm.options2 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };

        vm.chartcolor2 = ['#F5A623']

        //Chart campagnes crées

        vm.label3 = vm.labels;

        vm.data3 = [
            vm.dataset3
        ];

        vm.series3 = ['Campagnes crées'];

        vm.onClick3 = function(points, evt) {}

        vm.datasetOverride3 = [{
            yAxisID: 'y-axis-1'
        }];

        vm.options3 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };

        vm.chartcolor3 = ['#50E3C2']

        //Financials

        vm.label4 = ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8'];

        vm.data4 = [
            [1000, 2440, 3000, 2800, 5600, 4100, 2000, 7000]
        ];

        vm.series4 = ["Chiffre d'Affaires"];

        vm.onClick4 = function(points, evt) {}

        vm.datasetOverride4 = [{
            yAxisID: 'y-axis-1'
        }];

        vm.options4 = {
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
            }
        };

        vm.chartcolor4 = ['#1580EF']

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
