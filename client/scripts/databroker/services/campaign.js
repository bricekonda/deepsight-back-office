'use strict';
var servicename = 'campaign';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'MarketingCampaign',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, MarketingCampaign, user, apiConstant) {

        var createcampaign = function(idcreator, name, audience, typecampaign, reachA, reachB, subject, date, format, urlfile, information, compensationmode, compensationprice, compensationvolume, compensationbudget, reach, utmsource, utmmedium, utmterm, utmcontent, utmcampaign, redirectionurl, trackingurl) {
            console.log('kikoo')
            var newcampaign = MarketingCampaign.create({
                'id_creator': idcreator,
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

        var updateutmcampaign = function(id) {
            console.log("hello");
            // var campaigntoupdate = MarketingCampaign.prototype$updateAttributes({
            //     'utm_campaign': id,
            // }).$promise;

            // return campaigntoupdate

        };

        var updatecampaign = function() {

        };

        var loadcampaigns = function(creator) {
            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    limit: 5,
                    order: 'date DESC',
                    where: {
                        id_creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntoload;
        };

        var loadmorecampaigns = function(skipnumber, creator) {
            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    skip: skipnumber,
                    order: 'date DESC',
                    limit: 5,
                    where: {
                        id_creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntoload;
        };

        var loadallcampaignbycreatorid = function(creator) {

            var campaigntoload = MarketingCampaign.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        id_creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            console.log("ça passe")

            return campaigntoload;

        }

        var deletecampaignbyid = function(campaignid) {
            var campaigntodelete = MarketingCampaign.deleteById({
                "id": campaignid
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return campaigntodelete;

        };

        return {
            // createtest:createtest,
            createcampaign: createcampaign,
            updateutmcampaign: updateutmcampaign,
            updatecampaign: updatecampaign,
            loadcampaigns: loadcampaigns,
            loadmorecampaigns: loadmorecampaigns,
            loadallcampaignbycreatorid: loadallcampaignbycreatorid,
            deletecampaignbyid: deletecampaignbyid,

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
