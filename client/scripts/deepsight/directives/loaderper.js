'use strict';
/*eslint consistent-this:[2,  "loaderperCtrl"] */
var directivename = 'loaderper';

module.exports = function(app) {

    // controller
    var controllerDeps = ['$rootScope', '$scope'];
    var controller = function($rootScope, $scope) {
        var vm = this;

        vm.percentage = 0;

        vm.element = document.getElementById("loader-variable-width");
        vm.element.style.width = '0%';

        $rootScope.$on('progressPercentage', function(event, data) {
            $scope.$apply(function() {
                // vm.element = document.getElementById("loader-variable-width");
                // console.log(vm.element);
                vm.percentage = data.value;
                vm.perstring = vm.percentage.toString()
                vm.element.style.width = vm.perstring.concat("%");

            });
        });

    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            controller: controller,
            controllerAs: 'vm',
            bindToController: true,
            template: require('./loaderper.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
