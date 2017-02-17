'use strict';
var servicename = 'campaign';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'MarketingCampaign',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, MarketingCampaign, user, apiConstant) {

        var createcampaign = function(userId, creator, name, audience, typecampaign, reachA, reachB, subject, date, format, urlfile, information, compensationmode, compensationprice, compensationvolume, compensationbudget, reach, utmsource, utmmedium, utmterm, utmcontent, utmcampaign, redirectionurl, trackingurl) {
            var newcampaign = MarketingCampaign.create({
                'userId': userId,
                'creator': creator,
                'name': name,
                'id_audience': audience,
                'reach': reach,
                'type_campaign': typecampaign,
                'reach_A': reachA,
                'reach_B': reachB,
                'subject': subject,
                'date': date,
                'format': format,
                'urlfile': urlfile,
                'information': information,
                'compensation_mode': compensationmode,
                'compensation_price': compensationprice,
                'compensation_volume': compensationvolume,
                'compensation_budget': compensationbudget,
                'utm_source': utmsource,
                'utm_medium': utmmedium,
                'utm_term': utmterm,
                'utm_content': utmcontent,
                'utm_campaign': utmcampaign,
                'url_tracking_raw': trackingurl,
                'url_campaign': redirectionurl,
                'available': false,
            }).$promise

            return newcampaign
        };

        var updatecampaign = function(id, name, typecampaign, reachA, reachB, subject, format, information, compensationmode, compensationprice, compensationvolume, compensationbudget, utmsource, utmmedium, utmterm, utmcontent, utmcampaign, redirectionurl, trackingurl) {
            console.log('hello')
            var campaign = MarketingCampaign.prototype$updateAttributes({
                id: id
            }, {
                'name': name,
                'type_campaign': typecampaign,
                'reach_A': reachA,
                'reach_B': reachB,
                'subject': subject,
                'format': format,
                'information': information,
                'compensation_mode': compensationmode,
                'compensation_price': compensationprice,
                'compensation_volume': compensationvolume,
                'compensation_budget': compensationbudget,
                'utm_source': utmsource,
                'utm_medium': utmmedium,
                'utm_term': utmterm,
                'utm_content': utmcontent,
                'utm_campaign': utmcampaign,
                'url_tracking_raw': trackingurl,
                'url_campaign': redirectionurl
            }).$promise;

            return campaign;

        };

        var loadcampaigns = function(userId) {
            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    limit: 30,
                    order: 'date DESC',
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntoload;
        };

        var loadmorecampaigns = function(skipnumber, userId) {
            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    skip: skipnumber,
                    order: 'date DESC',
                    limit: 30,
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntoload;
        };

        var loadallcampaignbycreatorid = function(userId) {

            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    order: 'date DESC',
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntoload;

        }

        var deletecampaignbyid = function(campaignid) {
            var campaigntodelete = MarketingCampaign.deleteById({
                "id": campaignid
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntodelete;

        };

        var findcampaignsbyDate = function(date) {
            var audiencelist = MarketingCampaign.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        date: {
                            gt: date
                        },
                    },
                }
            }).$promise

            return audiencelist;
        }

        return {
            createcampaign: createcampaign,
            updatecampaign: updatecampaign,
            loadcampaigns: loadcampaigns,
            loadmorecampaigns: loadmorecampaigns,
            loadallcampaignbycreatorid: loadallcampaignbycreatorid,
            deletecampaignbyid: deletecampaignbyid,
            findcampaignsbyDate:findcampaignsbyDate,

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
