'use strict';
var servicename = 'tags';

module.exports = function(app) {

    var dependencies = ['$kinvey', '$rootScope', '$q', '$state', '$timeout', '$http', 'Tags', 'Customaudience',
        app.name + '.user',
        app.name + '.apiConstant'
    ];

    function service($kinvey, $rootScope, $q, $state, $timeout, $http, Tags, Customaudience, user, apiConstant) {

        var createtag = function() {
            var newtag = Tags.create({
                'title': 'bloblo',
                'description': 'blabla',
                'url': 'http//blabla',
                'variables': [{
                    'variable': 'id_client'
                }],
            }).$promise

            return newtag
        };

        var findtag = function() {
            var taglist = Tags.find().$promise

            return taglist
        };

        return {
            createtag: createtag,
            findtag: findtag
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
