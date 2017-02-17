'use strict';
var servicename = 'tags';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', '$http', 'Tags', 'Customaudience',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, $http, Tags, Customaudience, user, apiConstant) {

        var createtag = function(userId, creator, date, variables, description, urlpage, title) {
            var newtag = Tags.create({
                'userId': userId,
                'creator': creator,
                'date': date,
                'variables': variables,
                'description': description,
                'url': urlpage,
                'title': title

            }).$promise

            return newtag
        };

        var findtag = function() {
            var taglist = Tags.find().$promise

            return taglist
        };

        var loadAdlltagsByUserId = function(userId) {

            var tags = Tags.find({
                "filter": {
                    order: 'date DESC',
                    where: {
                        userId: userId
                    },
                }
            }).$promise

            return tags;
        }

        var deletetagById = function() {

        }

        var updatetagByID = function() {

        }

        return {
            createtag: createtag,
            findtag: findtag,
            loadAdlltagsByUserId: loadAdlltagsByUserId,
            deletetagById: deletetagById,
            updatetagByID: updatetagByID
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
