'use strict';
var servicename = 'customaudience';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', '$http', 'Customaudience',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, $http, Customaudience, user, apiConstant) {

        //Mes fonctions Loopback

        var addaudienceLoop = function(userId, name, nb_publishers, size, format, date, publishers_list) {

            var newaudience = Customaudience.create({
                'userId': userId,
                'name': name,
                'nb_publishers': nb_publishers,
                'size': size,
                'format': format,
                'date': date,
                'publishers_list': publishers_list,
            }).$promise
            return newaudience;

            // var newaudience = Customaudience.create({
            //     'creator': creator,
            //     'name': name,
            //     'nb_publishers': nb_publishers,
            //     'size': size,
            //     'format': format,
            //     'date': date,
            //     'publishers_list': publishers_list,
            // }).$promise
            // return newaudience;
        };

        var loadaudienceLoop = function(userId) {

            var audiencetoload = Customaudience.find({
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
            var audiencetoload = Customaudience.find({
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

        var loadallaudienceLoop = function(userId) {

            var audiencetoload = Customaudience.find({
                "filter": {
                    order: 'date DESC',
                    // where: {
                    //     userId: userId
                    // },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var loadallaudienceLoopById = function(userId) {

            var audiencetoload = Customaudience.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        userId: userId
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetoload;
        };

        var deleteaudienceLoop = function(audienceid) {

            var audiencetodelete = Customaudience.deleteById({
                "id": audienceid
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise;

            return audiencetodelete;
        };

        var deleteCustomId = function(audienceid) {
            var deferred = $q.defer();
            var data = {
                audienceid: audienceid
            };
            $http({
                params: data,
                method: 'GET',
                url: apiConstant.uri + '/delete'
            }).then(function() {
                deferred.resolve(200);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        var createAudience = function(userId, username, name) {
            var audience = Customaudience.create({
                'userId': userId,
                'creator': username,
                'name': name,
                'date': new Date()
            }).$promise;
            return audience;
        };

        var updateAudience = function(id, sizeAudience, arrayPublishers) {
            // var publishers_list = [];
            // var total = 0;
            // for (var i = 0; i < resultArray.length; i++) {
            //     var data = {};
            //     data.publisher_name = resultArray[i]._id;
            //     data.size = resultArray[i].count;
            //     data.pertotal = parseInt((resultArray[i].count / sizeAudience) * 100);
            //     publishers_list.push(data);
            //     total = total + data.size;
            // }
            var audience = Customaudience.prototype$updateAttributes({
                id: id
            }, {
                nb_publishers: arrayPublishers.length,
                publishers_list: arrayPublishers,
                size: sizeAudience
            }).$promise;
            return audience;
        };

        var updateallparametersAudience = function(id, name, size, nb_publishers, creator) {
            var audience = Customaudience.prototype$updateAttributes({
                id: id
            }, {
                name: name,
                size: size,
                nb_publishers: nb_publishers,
                creator: creator,
            }).$promise;
            return audience;
        }

        var match = function(username, filename, id) {
            var deferred = $q.defer();
            var data = {
                username: username,
                fileName: filename,
                idCustom: id
            };
            $http({
                params: data,
                method: 'GET',
                url: apiConstant.uri + '/matching'
            }).then(function(result) {
                if (result.data) {
                    deferred.resolve(result.data);
                } else {
                    deferred.reject(result);
                }
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        var findaudiencebyID = function(id) {
            var audiencetofind = Customaudience.findById({
                "id": id
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            return audiencetofind;
        }

        var findaudiencesbyDate = function(date) {
            var audiencelist = Customaudience.find({
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
            addaudienceLoop: addaudienceLoop,
            loadaudienceLoop: loadaudienceLoop,
            loadmoreaudienceLoop: loadmoreaudienceLoop,
            loadallaudienceLoopById: loadallaudienceLoopById,
            loadallaudienceLoop: loadallaudienceLoop,
            deleteaudienceLoop: deleteaudienceLoop,
            createAudience: createAudience,
            updateAudience: updateAudience,
            updateallparametersAudience: updateallparametersAudience,
            match: match,
            findaudiencebyID: findaudiencebyID,
            findaudiencesbyDate: findaudiencesbyDate,
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
