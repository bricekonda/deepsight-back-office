'use strict';
var servicename = 'loaderanalytics1';

module.exports = function(app) {

    var dependencies = [];

    function service() {
        var add = function(a, b) {
            return a + b;
        };

        return {
            add: add
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};