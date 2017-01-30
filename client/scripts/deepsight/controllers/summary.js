'use strict';
var controllername = 'summary';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;

    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
