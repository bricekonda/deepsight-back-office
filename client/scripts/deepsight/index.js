'use strict';
var angular = require('angular');
require('angular-ui-router');

var modulename = 'deepsight';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var app = angular.module(fullname, ['ui.router', ]);
    // inject:folders start
    require('./controllers')(app);
require('./directives')(app);
require('./services')(app);
    // inject:folders end
    app.namespace = app.namespace || {};

    var configRoutesDeps = ['$stateProvider', '$urlRouterProvider'];
    var configRoutes = function($stateProvider, $urlRouterProvider) {
        // $urlRouterProvider.otherwise('').when('', '/home/createaudience');
        $urlRouterProvider.otherwise('/audience/summary');
        $stateProvider.state('home', {
            url: '',
            template: require('./views/home.html'),
            controller: fullname + '.mainView',
            controllerAs: 'vm',
            authenticate: true,
        }).state('signin', {
            url: '/signin',
            template: require('./views/signin.html'),
            controller: fullname + '.signin',
            controllerAs: 'vm',
            authenticate: false,
        }).state('signup', {
            url: '/signup',
            template: require('./views/signup.html'),
            controller: fullname + '.signup',
            controllerAs: 'vm',
            authenticate: false,
        }).state('resetpwdreq', {
            url: '/resetpasswordrequest',
            template: require('./views/resetpwd.html'),
            controller: fullname + '.resetpwd',
            controllerAs: 'vm',
            authenticate: false,
        }).state('resetpwd', {
            url: '/resetpassword?access_token=&id=',
            template: require('./views/resetpwdfinal.html'),
            controller: fullname + '.resetpwdfinal',
            controllerAs: 'vm',
            authenticate: false,
        }).state('home.summary', {
            url: '/audience/summary',
            template: require('./views/summary.html'),
            controller: fullname + '.summary',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.customaudience', {
            url: '/audience/customaudience',
            template: require('./views/customaudience.html'),
            controller: fullname + '.customaudience',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.mytags', {
            url: '/tagging/mytags',
            template: require('./views/mytags.html'),
            controller: fullname + '.mytags',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.lookalikeaudience', {
            url: '/audience/lookalikeaudience',
            template: require('./views/lookalikeaudience.html'),
            controller: fullname + '.lookalikeaudience',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.createcampaign', {
            url: '/campaign/createcampaign',
            template: require('./views/createcampaign.html'),
            controller: fullname + '.createcampaign',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.mycampaigns', {
            url: '/campaign/mycampaigns',
            template: require('./views/mycampaigns.html'),
            controller: fullname + '.mycampaigns',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.reports', {
            url: '/campaign/reports',
            template: require('./views/reports.html'),
            controller: fullname + '.reports',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.billing', {
            url: '/campaign/billing',
            template: require('./views/billing.html'),
            controller: fullname + '.billing',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.payment', {
            url: '/campaign/payment',
            template: require('./views/payment.html'),
            controller: fullname + '.payment',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.generalinformation', {
            url: '/settings/generalinformation',
            template: require('./views/generalinformation.html'),
            controller: fullname + '.generalinformation',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.tandcs', {
            url: '/settings/tandcs',
            template: require('./views/tandcs.html'),
            controller: fullname + '.tandcs',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.usermanagement', {
            url: '/gestion/usermanagement',
            template: require('./views/usermanagement.html'),
            controller: fullname + '.usermanagement',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.customaudience.createcustomaudience', {
            url: '/creation/createcustomaudience',
            template: require('./views/createcustomaudience.html'),
            controller: fullname + '.createcustomaudience',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.lookalikeaudience.createlookalikeaudience', {
            url: '/creation/createlookalikeaudience',
            template: require('./views/createlookalikeaudience.html'),
            controller: fullname + '.createlookalikeaudience',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.publishersinformation', {
            url: '/gestion/publishersinformation',
            template: require('./views/publishersinformation.html'),
            controller: fullname + '.publishersinformation',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.advertisersinformation', {
            url: '/gestion/advertisersinformation',
            template: require('./views/advertisersinformation.html'),
            controller: fullname + '.advertisersinformation',
            controllerAs: 'vm',
            authenticate: true
        }).state('home.tagcreation', {
            url: '/tagging/creation',
            template: require('./views/creationtag.html'),
            controller: fullname + '.tagcreation',
            controllerAs: 'vm',
            authenticate: true
        });
    };
    configRoutes.$inject = configRoutesDeps;
    app.config(configRoutes);

    return app;
};