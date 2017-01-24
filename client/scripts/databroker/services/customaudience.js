'use strict';
var servicename = 'customaudience';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', '$http', 'Customaudience',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, $http, Customaudience, user, apiConstant) {

        //Mes fonctions Loopback

        var addaudienceLoop = function(creator, name, nb_publishers, size, format, date, publishers_list) {
            var newaudience = Customaudience.create({
                'creator': creator,
                'name': name,
                'nb_publishers': nb_publishers,
                'size': size,
                'format': format,
                'date': date,
                'publishers_list': publishers_list,
            }).$promise
            return newaudience;
        };

        var loadaudienceLoop = function(creator) {
            console.log(creator);

            var audiencetoload = Customaudience.find({
                "filter": {
                    limit: 5,
                    order: 'date DESC',
                    where: {
                        creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            console.log("ça passe")

            return audiencetoload;
        };

        var loadmoreaudienceLoop = function(skipnumber, creator) {
            var audiencetoload = Customaudience.find({
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

        var loadallaudienceLoop = function(creator) {
            console.log(creator);

            var audiencetoload = Customaudience.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        creator: creator
                    },
                }
            }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise

            console.log("ça passe")

            return audiencetoload;
        };

        var deleteaudienceLoop = function(audienceid) {
            // var deferred = $q.defer();
            // deleteCustomId(audienceid).then(function() {
            //     console.log('dans le then');
            //     var audiencetodelete = Customaudience.deleteById({
            //         "id": audienceid
            //     }, function(value, responseHeaders) {}, function(httpResponse) {}).$promise;
            //     deferred.resolve(audiencetodelete);
            // }, function(err) {
            //     console.log(err);
            //     deferred.reject('error');
            // });
            // return deferred.promise;

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
            console.log('entree custom');
            $http({
                params: data,
                method: 'GET',
                url: apiConstant.uri + '/delete'
            }).then(function() {
                deferred.resolve(200);
            }, function(error) {
                console.log('erreur pour delete la custom');
                deferred.reject(error);
            });
            return deferred.promise;
        };

        var createAudience = function(username, name) {
            console.log('createaudience');
            var audience = Customaudience.create({
                'creator': username,
                'name': name,
                'date': new Date()
            }).$promise;
            return audience;
        };

        var updateAudience = function(id, sizeAudience, resultArray) {
            console.log('WESH');
            var publishers_list = [];
            var total = 0;
            for (var i = 0; i < resultArray.length; i++) {
                var data = {};
                data.publisher_name = resultArray[i]._id;
                data.size = resultArray[i].count;
                data.pertotal = parseInt((resultArray[i].count / sizeAudience) * 100);
                publishers_list.push(data);
                total = total + data.size;
            }
            Customaudience.prototype$updateAttributes({
                id: id
            }, {
                nb_publishers: resultArray.length,
                publishers_list: publishers_list,
                size: total
            });
        };

        var match = function(username, filename, id) {
            console.log('MATCH');
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
                console.log('resultat matching');
                deferred.resolve(result);
            }, function(error) {
                console.log('erreur matching');
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

        //Fin de mes fonctions Loopback

        // var addaudience = function(name, nbpublisher, size, publisher1, publisher2, publisher3) {
        //     var activeUser = $kinvey.User.getActiveUser();
        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');
        //     var audience = dataStore.save({
        //         client_name: activeUser.data.username,
        //         client_id: activeUser.data._id,
        //         name: name,
        //         nbpublisher: nbpublisher,
        //         size: size,
        //         publisher1: publisher1,
        //         publisher2: publisher2,
        //         publisher3: publisher3,
        //     })

        //     return audience;

        // };

        // var loadaudience = function(quantityofaudiencestoloadfirst, firsttoskipnumber) {

        //     var activeuserid = $kinvey.User.getActiveUser();

        //     var query = new $kinvey.Query();

        //     query.limit = quantityofaudiencestoloadfirst;
        //     query.skip = firsttoskipnumber;
        //     query.equalTo('_acl', activeuserid.data._acl);

        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        //     return dataStore.find(query);

        // };

        // var loadallaudience = function() {

        //     var activeuserid = $kinvey.User.getActiveUser();

        //     var query = new $kinvey.Query();

        //     query.equalTo('_acl', activeuserid.data._acl);

        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        //     return dataStore.find(query);
        // };

        // var loadpublisher = function(audienceid) {

        //     var query = new $kinvey.Query();
        //     query.equalTo('audienceid', audienceid);

        //     var dataStore = $kinvey.DataStore.collection('PublishersCustomAudience');

        //     return dataStore.find(query);
        // }

        // var addpublisheraudience = function(id, name, publisherid, size, overlapper, totalper) {
        //     var dataStore = $kinvey.DataStore.collection('PublishersCustomAudience');

        //     var audience = dataStore.save({
        //         _id: 'testid',
        //         name: name,
        //         publisherid: publisherid,
        //         size: size,
        //         overlapper: overlapper,
        //         totalper: totalper,
        //     });

        //     return audience;
        // };

        // // var addpublisheraudience = function(id, publisher) {
        // //     var dataStore = $kinvey.DataStore.collection('PublishersCustomAudience');

        // //     for (var i = 0; i < publisher.length; i++) {
        // //         var audience = dataStore.save({
        // //             audienceid: id,
        // //             name: publisher[i].name,
        // //             publisherid: publisher[i].publisherid,
        // //             size: publisher[i].size,
        // //             overlapper: publisher[i].overlapper,
        // //             totalper: publisher[i].totalper,

        // //         }).then(function onSuccess(entity) {
        // //             console.log(entity._id);
        // //         }).catch(function onError(error) {
        // //             console.log('ok');
        // //         });
        // //     }

        // //     return true;
        // // };

        // var addaudiencetest = function(name, nbpublisher, size, publisher1, publisher2, publisher3, publisher4) {
        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        //     var audience = dataStore.save({
        //         name: name,
        //         nbpublisher: nbpublisher,
        //         size: size,
        //         publisher1: publisher1,
        //         publisher2: publisher2,
        //         publisher3: publisher3,
        //         publisher4: publisher4,
        //     });

        //     return audience;

        // };

        // var updateaudience = function(id, name, nbpublisher, size, publisher1, publisher2, publisher3, publisher4) {
        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        //     var audience = dataStore.save({
        //         _id: id,
        //         name: name,
        //         nbpublisher: nbpublisher,
        //         size: size,
        //         publisher1: publisher1,
        //         publisher2: publisher2,
        //         publisher3: publisher3,
        //         publisher4: publisher4,
        //     });

        //     return audience;

        // };
        // // var addaudiencetestwid = function(id, name, nbpublisher, size, publisher1, publisher2, publisher3, publisher4) {
        // //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        // //     var audience = dataStore.save({
        // //         _id: id,
        // //         publisher: publisher4,
        // //     });

        // //     console.log('tape 1')

        // //     return audience;

        // // };

        // var deleteaudience = function(id) {
        //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        //     console.log("ceci est l'id au début du service")
        //     console.log(id);

        //     // var query = new $kinvey.Query();
        //     // query.equalTo('_id', id);

        //     // var promise = dataStore.remove(query);

        //     var promise = dataStore.removeById(id);

        //     // console.log(id);

        //     console.log("Ceci est l'id à la fin du service")
        //     console.log(id);

        //     return promise;
        // };

        // // var deleteaudiencebyID = function(id) {
        // //     var query = new $kinvey.Query();
        // //     query.equalTo('_id', id);

        // //     var dataStore = $kinvey.DataStore.collection('CustomAudience');

        // //     return dataStore.remove(query);

        // // };

        return {
            // addaudiencetestwid: addaudiencetestwid,
            addaudienceLoop: addaudienceLoop,
            loadaudienceLoop: loadaudienceLoop,
            loadmoreaudienceLoop: loadmoreaudienceLoop,
            loadallaudienceLoop: loadallaudienceLoop,
            deleteaudienceLoop: deleteaudienceLoop,
            createAudience: createAudience,
            updateAudience: updateAudience,
            match: match,
            findaudiencebyID:findaudiencebyID
                // addpublisheraudience: addpublisheraudience,
                // loadpublisher: loadpublisher,
                // addaudiencetest: addaudiencetest,
                // updateaudience: updateaudience,
                // addaudience: addaudience,
                // loadaudience: loadaudience,
                // deleteaudience: deleteaudience,
                // loadallaudience: loadallaudience,
                // deleteaudiencebyID: deleteaudiencebyID

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
