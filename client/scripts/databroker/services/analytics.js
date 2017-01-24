'use strict';
var servicename = 'analytics';

module.exports = function(app) {

    var dependencies = ['$http', '$kinvey', '$rootScope', '$q', '$state', '$timeout', 'LogCampaign',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($http, $kinvey, $rootScope, $q, $state, $timeout, LogCampaign, user, apiConstant) {

        var getOpens = function(id_campaign) {
            console.log(id_campaign)
            var opens = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    open: 1,
                }
            }).$promise

            return opens
        };

        var getOpensAB = function(id_campaign, AB) {
            console.log(id_campaign)
            var opens = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    open: 1,
                    ABtest_segment: AB,
                }
            }).$promise

            return opens
        };

        var getClicks = function(id_campaign) {
            console.log(id_campaign)
            var clicks = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    click: 1,
                },
            }).$promise

            return clicks
        };

        var getClicksAB = function(id_campaign, AB) {
            console.log(id_campaign)
            var clicks = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    click: 1,
                    ABtest_segment: AB,
                },
            }).$promise

            return clicks
        };

        var getSales = function(id_campaign) {
            var sales = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    sale: 1,
                }
            }).$promise

            return sales
        };

        var getSalesAB = function(id_campaign, AB) {
            var sales = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    sale: 1,
                    ABtest_segment: AB,
                }
            }).$promise

            return sales
        };

        var getTotalsales = function(id_campaign) {

            var urltotalsales = apiConstant.uri.concat('/analytics/totalsales').concat('?', 'id_campaign', '=', id_campaign);
            console.log("ok, on va tenter d'avoir total sales");

            var totalsales = $http.get(urltotalsales);

            return totalsales

        };

        var getTotalsalesAB = function(id_campaign, AB) {

            var urltotalsales = apiConstant.uri.concat('/analytics/totalsales').concat('?', 'id_campaign', '=', id_campaign).concat('&', 'AB_segment', '=', AB);
            console.log("ok, on va tenter d'avoir total sales");

            var totalsales = $http.get(urltotalsales);

            return totalsales

        };

        var getRegistrationsAB = function(id_campaign, AB) {

            var registrations = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    registration: 1,
                    ABtest_segment: AB,
                }
            }).$promise

            return registrations
        }

        var getRegistrations = function(id_campaign) {

            var registrations = LogCampaign.count({
                where: {
                    id_campaign: id_campaign,
                    registration: 1,
                }
            }).$promise

            return registrations
        }

        var getopensclicksData = function(id_campaign) {
            var urlopensclicks = apiConstant.uri.concat('/analytics/opensclicksdata').concat('?', 'id_campaign', '=', id_campaign);
            console.log("ok, on va tenter d'avoir les data pour opens et clicks");

            var opensclicks = $http.get(urlopensclicks);

            return opensclicks
        }

        var getopensclicksDataAB = function(id_campaign, AB) {
            var urlopensclicks = 'http://0.0.0.0:3010/analytics/opensclicksdata'.concat('?', 'id_campaign', '=', id_campaign).concat('&', 'AB_segment', '=', AB);
            console.log("ok, on va tenter d'avoir les data pour opens et clicks");

            var opensclicks = $http.get(urlopensclicks);

            return opensclicks
        }

        var getregistrationssalesData = function(id_campaign) {
            var urlregistrationssales = apiConstant.uri.concat('/analytics/registrationssalesdata').concat('?', 'id_campaign', '=', id_campaign);
            console.log("ok, on va tenter d'avoir les data pour registrations et sales");

            var registrationssales = $http.get(urlregistrationssales);

            return registrationssales
        }

        var getregistrationssalesDataAB = function(id_campaign, AB) {
            var urlregistrationssales = 'http://0.0.0.0:3010/analytics/registrationssalesdata'.concat('?', 'id_campaign', '=', id_campaign).concat('&', 'AB_segment', '=', AB);
            console.log("ok, on va tenter d'avoir les data pour registrations et sales");

            var registrationssales = $http.get(urlregistrationssales);

            return registrationssales
        }

        return {
            getOpens: getOpens,
            getOpensAB: getOpensAB,
            getClicks: getClicks,
            getClicksAB: getClicksAB,
            getSales: getSales,
            getSalesAB: getSalesAB,
            getTotalsales: getTotalsales,
            getTotalsalesAB: getTotalsalesAB,
            getRegistrations: getRegistrations,
            getRegistrationsAB: getRegistrationsAB,
            getopensclicksData: getopensclicksData,
            getopensclicksDataAB: getopensclicksDataAB,
            getregistrationssalesData: getregistrationssalesData,
            getregistrationssalesDataAB: getregistrationssalesDataAB

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
