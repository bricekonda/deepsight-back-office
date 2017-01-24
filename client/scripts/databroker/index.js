'use strict';
var angular = require('angular');

var modulename = 'databroker';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, []);
    // inject:folders start
    require('./constants')(app);
require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    return app;
};