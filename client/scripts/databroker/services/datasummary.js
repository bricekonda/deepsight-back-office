'use strict';
var servicename = 'datasummary';

module.exports = function(app) {

    var dependencies = ['$rootScope', '$q', '$state', '$timeout', '$http', 'DataSummary'];

    function service($rootScope, $q, $state, $timeout, $http, DataSummary) {

        var findAllData = function(type) {

            var data = DataSummary.find({
                "filter": {
                    where: {
                        type: type
                    },
                }
            }).$promise

            return data
        }

        return {
            findAllData: findAllData

        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
