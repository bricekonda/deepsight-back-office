'use strict';
var servicename = 'lookalikeaudience';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Lookalikeaudience'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Lookalikeaudience) {

        //Mes fonctions Loopback

        var addaudienceLoop = function(id, creator, name, customaudience, nb_publishers, size, date, publishers_list, waitboolean, readyboolean, makeadealboolean) {
            var newaudience = Lookalikeaudience.create({
                'id_creator': id,
                'creator': creator,
                'name': name,
                'id_customaudienceid': customaudience,
                'nb_publishers': nb_publishers,
                'size': size,
                'date': date,
                'publishers_list': publishers_list,
                'waitboolean': waitboolean,
                'readyboolean': readyboolean,
                'makeadealboolean': makeadealboolean,

            }).$promise

            return newaudience;
        };

        var loadallaudiencebycreatorid = function(creator) {

            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadaudienceLoop = function(creator) {

            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    limit: 5,
                    order: 'date DESC',
                    where: {
                        creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadmoreaudienceLoop = function(skipnumber, creator) {
            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    skip: skipnumber,
                    order: 'date DESC',
                    limit: 5,
                    where: {
                        creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var deleteaudienceLoop = function(audienceid) {

            var audiencetodelete = Lookalikeaudience.deleteById({
                "id": audienceid
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetodelete;
        };

        var findaudiencebyID = function(id) {
            var audiencetofind = Lookalikeaudience.findById({
                "id": id
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetofind;
        }

        //Fin de mes fonctions Loopback

        return {
            addaudienceLoop: addaudienceLoop,
            loadaudienceLoop: loadaudienceLoop,
            loadmoreaudienceLoop: loadmoreaudienceLoop,
            deleteaudienceLoop: deleteaudienceLoop,
            loadallaudiencebycreatorid: loadallaudiencebycreatorid,
            findaudiencebyID:findaudiencebyID,
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
