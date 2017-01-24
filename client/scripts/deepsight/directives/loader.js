'use strict';
 /*eslint consistent-this:[2,  "loaderCtrl"] */
var directivename = 'loader';

module.exports = function(app) {

    // controller
    var controllerDeps = ['$rootScope','$scope'];
    var controller = function($rootScope,$scope) {
        var vm = this;
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
            template: require('./loader.html'),
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
