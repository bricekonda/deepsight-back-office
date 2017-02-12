'use strict';
var servicename = 'lookalikeaudience';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', 'Lookalikeaudience'];

    function service($kinvey, $rootScope, $q, $state, $timeout, Lookalikeaudience) {

        //Mes fonctions Loopback

        var addaudienceLoop = function(userId, creator, name, id_customaudience, nb_publishers, size, date, waitboolean, makeadealboolean, publishers_list) {
            var newaudience = Lookalikeaudience.create({
                'userId': userId,
                'creator': creator,
                'name': name,
                'id_customaudience': id_customaudience,
                'nb_publishers': nb_publishers,
                'size': size,
                'date': date,
                'waitboolean': waitboolean,
                'makeadealboolean': makeadealboolean,
                'publishers_list': publishers_list,

            }).$promise

            return newaudience;
        };

        var loadallaudiencebycreatorid = function(userId) {

            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    order: 'date DESC',
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadallaudienceById = function(userId) {

            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        userId: userId
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadaudienceLoop = function(userId) {

            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    limit: 30,
                    order: 'date DESC',
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadmoreaudienceLoop = function(skipnumber, userId) {
            var audiencetoload = Lookalikeaudience.find({
                "filter": {
                    skip: skipnumber,
                    order: 'date DESC',
                    limit: 30,
                    // where: {
                    //     userId: userId
                    // },
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

        var updateallparametersAudience = function(id, name, size, nb_publishers, creator, makeadealboolean, waitboolean) {
            var audience = Lookalikeaudience.prototype$updateAttributes({
                id: id
            }, {
                name: name,
                size: size,
                nb_publishers: nb_publishers,
                creator: creator,
                makeadealboolean: makeadealboolean,
                waitboolean: waitboolean,
            }).$promise;
            return audience;
        }

        //Fin de mes fonctions Loopback

        return {
            addaudienceLoop: addaudienceLoop,
            loadaudienceLoop: loadaudienceLoop,
            loadallaudienceById:loadallaudienceById,
            loadmoreaudienceLoop: loadmoreaudienceLoop,
            deleteaudienceLoop: deleteaudienceLoop,
            loadallaudiencebycreatorid: loadallaudiencebycreatorid,
            findaudiencebyID: findaudiencebyID,
            updateallparametersAudience: updateallparametersAudience,
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
