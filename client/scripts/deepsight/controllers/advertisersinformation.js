'use strict';
var controllername = 'advertisersinformation';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */
    var databroker = require('../../databroker')(app.name.split('.')[0]).name;

    var deps = ['$window', '$rootScope', '$timeout', '$state', '$scope', databroker + '.datasummary'];

    function controller($window, $rootScope, $timeout, $state, $scope, datasummary) {
        var vm = this;
        vm.controllername = fullname;
        vm.pageloadingboolean = true;

        vm.styledate = function(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hour = date.getHours();
            var minute = date.getMinutes();

            if (day < 10) {
                var datestring = '0'.concat(day.toString())
            } else {
                var datestring = day.toString();
            }
            if (month < 10) {
                var monthstring = '0'.concat(month.toString())
            } else {
                var monthstring = month.toString();
            }
            var yearstring = year.toString();
            if (hour < 10) {
                var hourstring = '0'.concat(hour.toString())
            } else {
                var hourstring = hour.toString();
            }
            if (minute < 10) {
                var minutestring = '0'.concat(minute.toString())
            } else {
                var minutestring = minute.toString();
            }

            var validdate = datestring.concat('/', monthstring, '/', yearstring, ' à ', hourstring, ':', minutestring)

            return validdate
        };

        datasummary.findAllData('advertiser').then(function(advertisers) {
            vm.publisherslist = [];
            for (var i = 0; i < advertisers.length; i++) {
                var date = new Date(advertisers[i].date);
                advertisers[i].date = vm.styledate(date);
                vm.publisherslist.push(advertisers[i])
            }
            console.log(advertisers);
            vm.pageloadingboolean = false;
        }).catch(function(error) {
            vm.pageloadingboolean = false;
            throw error
        })

    }
    controller.$inject = deps;
    app.controller(fullname, controller);
};
