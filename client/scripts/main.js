'use strict';

var namespace = 'main';
// fix protractor issue
// if (window.location.toString().indexOf('localhost:5555') > 0) {
//     window.name = 'NG_DEFER_BOOTSTRAP!NG_ENABLE_DEBUG_INFO!';
// }
require('angular');
require('kinvey-angular-sdk');
require('lbServices');
require('angular-chart.js');
require('chart.js');
// require('chartjs-color');
// require('chartjs-color-string');

var app = angular.module(namespace, [
    'kinvey',
    // inject:modules start
    require('./authentication')(namespace).name,
    require('./databroker')(namespace).name,
    require('./deepsight')(namespace).name,
    'lbServices',
    // 'angular-chart.js',
    'chart.js',
    // 'chartjs-color',
    // 'chartjs-color-string'
    // inject:modules end
]);



app.config(['LoopBackResourceProvider', namespace + '.databroker.apiConstant',
    function(LoopBackResourceProvider, apiConstant) {
        // Change the URL where to access the LoopBack REST API server
        LoopBackResourceProvider.setUrlBase(apiConstant.uri);
    }
]);



// if (process.env.SENTRY_MODE === 'prod') {
//     var configCompileDeps = ['$compileProvider'];
//     var configCompile = function($compileProvider) {
//         $compileProvider.debugInfoEnabled(false);
//     };
//     configCompile.$inject = configCompileDeps;
//     app.config(configCompile);
// }

var databroker = require('./databroker')(namespace).name;

var runDeps = ['$window', '$timeout', '$kinvey', '$state', '$rootScope', 'Deepsightuser', databroker + '.user'];
var run = function($window, $timeout, $kinvey, $state, $rootScope, Deepsightuser, user) {

    $kinvey.init({
        appKey: 'kid_ryd60SVs',
        appSecret: 'c90ebac8ae10433f935a6ebda5508073'
    });

    // var activeUser = $kinvey.User.getActiveUser();
    var activeUser = Deepsightuser.isAuthenticated();

    // $timeout(function() {
    //     if (activeUser === null) {
    //         if ($state.current.name === 'signin') {
    //             $state.go('signin');
    //         } else if ($state.current.name === 'signup') {
    //             $state.go('signup');
    //         } else if ($state.current.name === 'resetpwd') {
    //             $state.go('resetpwd');
    //         } else {
    //             $state.go('signin');
    //         }
    //     } else if (activeUser !== null) {
    //         if ($state.current.name === 'home.summary') {
    //             $state.go('home.summary');
    //         } else if ($state.current.name === 'home') {
    //             $state.go('home.summary');
    //         } else if ($state.current.name === 'home.customaudience') {
    //             $state.go('home.customaudience');
    //         } else if ($state.current.name === 'home.lookalikeaudience') {
    //             $state.go('home.lookalikeaudience');
    //         } else if ($state.current.name === 'home.makeadeal') {
    //             $state.go('home.makeadeal');
    //         } else if ($state.current.name === 'home.generalinformation') {
    //             $state.go('home.generalinformation');
    //         } else if ($state.current.name === 'home.tandcs') {
    //             $state.go('home.tandcs');
    //         } else if ($state.current.name === 'home.customaudience.createcustomaudience') {
    //             $state.go('home.customaudience.createcustomaudience');
    //         } else if ($state.current.name === 'home.lookalikeaudience.createlookalikeaudience') {
    //             $state.go('home.lookalikeaudience.createlookalikeaudience');
    //         } else {
    //             $state.go('home');
    //         }
    //     }
    // }, 0);

    // $rootScope.$on('$stateChangeStart', function(e, next) {
    //     activeUser = $kinvey.User.getActiveUser();
    //    
    //     if ($state.current.name === "home.lookalikeaudience.createlookalikeaudience" && next.name === "home.lookalikeaudience") {
    //         $window.location.reload();
    //     }
    //     if ($state.current.name === "home.customaudience.createcustomaudience" && next.name === "home.customaudience") {
    //         $window.location.reload();
    //     }
    //     if (next.authenticate && activeUser === null) {
    //         e.preventDefault();
    //     } else if (!next.authenticate && activeUser !== null) {
    //         e.preventDefault();
    //         $state.go('home.summary')
    //     } else if (next.name === 'home' && activeUser !== null) {
    //         e.preventDefault();
    //         $state.go('home.summary')
    //     }

    // });

    $timeout(function() {
        if (activeUser === false) {
            if ($state.current.name === 'signin') {
                $state.go('signin');
            } else if ($state.current.name === 'signup') {
                $state.go('signup');
            } else if ($state.current.name === 'resetpwd') {
                $state.go('resetpwd');
            } else if ($state.current.name === 'resetpwdreq') {
                $state.go('resetpwdreq');
            } else {
                $state.go('signin');
            }
        } else if (activeUser !== false) {
            if ($state.current.name === 'home.summary') {
                $state.go('home.summary');
            } else if ($state.current.name === 'home') {
                $state.go('home.summary');
            } else if ($state.current.name === 'home.mytags') {
                $state.go('home.mytags');
            } else if ($state.current.name === 'home.customaudience') {
                $state.go('home.customaudience');
            } else if ($state.current.name === 'home.lookalikeaudience') {
                $state.go('home.lookalikeaudience');
            } else if ($state.current.name === 'home.createcampaign') {
                $state.go('home.createcampaign');
            } else if ($state.current.name === 'home.mycampaigns') {
                $state.go('home.mycampaigns');
            } else if ($state.current.name === 'home.reports') {
                $state.go('home.reports');
            } else if ($state.current.name === 'home.billing') {
                $state.go('home.billing');
            } else if ($state.current.name === 'home.payment') {
                $state.go('home.payment');
            } else if ($state.current.name === 'home.generalinformation') {
                $state.go('home.generalinformation');
            } else if ($state.current.name === 'home.tandcs') {
                $state.go('home.tandcs');
            } else if ($state.current.name === 'home.customaudience.createcustomaudience') {
                $state.go('home.customaudience.createcustomaudience');
            } else if ($state.current.name === 'home.lookalikeaudience.createlookalikeaudience') {
                $state.go('home.lookalikeaudience.createlookalikeaudience');
            } else {
                $state.go('home');
            }
        }
    }, 0);

    $rootScope.$on('$stateChangeStart', function(e, next) {
        // activeUser = $kinvey.User.getActiveUser();
        activeUser = Deepsightuser.isAuthenticated();
        if ($state.current.name === "home.lookalikeaudience.createlookalikeaudience" && next.name === "home.lookalikeaudience") {
            $rootScope.$broadcast('reloadlookalikeaudience', null);
        }
        if ($state.current.name === "home.customaudience.createcustomaudience" && next.name === "home.customaudience") {
            $rootScope.$broadcast('reloadcustomaudience', null);
        }
        if (next.authenticate && activeUser === false) {
            e.preventDefault();
        } else if (!next.authenticate && activeUser !== false) {
            e.preventDefault();
            $state.go('home.summary')
        } else if (next.name === 'home' && activeUser !== false) {
            e.preventDefault();
            $state.go('home.summary')
        }

    });

    $rootScope.$on('logoutSuccess', function() {
        $state.go('signin');
    });

    $rootScope.$on('signinSuccess', function() {
        $state.go('home.customaudience');
    });

    $rootScope.$on('signupSuccess', function() {
        $state.go('home.customaudience');
    });

    $rootScope.$on('resetpwdSuccess', function() {
        $state.go('signin').then(function(){
            $rootScope.$broadcast('resetpwdrequestsuccessconfirmation', null);
        });
    });

    $rootScope.$on('resetpwdfinalSuccess', function() {
        $state.go('signin').then(function(){
            $rootScope.$broadcast('resetpwdsuccessconfirmation', null);
        });;
    });

    // $rootScope.$on('$stateChangeStart', function(e, next) {
    //     var currentuser = '';

    //     user.getcurrentUser().then(function(user) {
    //         console.log('hello');
    //         console.log(user.email);
    //         (function() {
    //             var w = window;
    //             var ic = w.Intercom;
    //             var intercomSettings = '';
    //             if (typeof ic === "function") {
    //                 ic('reattach_activator');
    //                 ic('update', intercomSettings);
    //             } else {
    //                 var d = document;
    //                 var i = function() {
    //                     i.c(arguments)
    //                 };
    //                 i.q = [];
    //                 i.c = function(args) {
    //                     i.q.push(args)
    //                 };
    //                 w.Intercom = i;

    //                 function l() {
    //                     var s = d.createElement('script');
    //                     s.type = 'text/javascript';
    //                     s.async = true;
    //                     s.src = 'https://widget.intercom.io/widget/{o9qfxlxq}';
    //                     var x = d.getElementsByTagName('script')[0];
    //                     x.parentNode.insertBefore(s, x);
    //                 }
    //                 if (w.attachEvent) {
    //                     w.attachEvent('onload', l);
    //                 } else {
    //                     w.addEventListener('load', l, false);
    //                 }
    //             }
    //         })()

    //         Intercom("boot", {
    //             app_id: "o9qfxlxq",
    //             email: user.email,
    //             created_at: '',
    //             name: user.name,
    //             user_id: user.id,
    //             widget: {
    //                 activator: "#IntercomDefaultWidget"
    //             }
    //         });
    //     });
    // })

    // window.intercomSettings = {
    //     app_id: "o9qfxlxq",
    //     name: currentuser.firstname, // Full name
    //     email: currentuser.email, // Email address
    //     // created_at: 1312182000 // Signup date as a Unix timestamp
    // };

};

run.$inject = runDeps;
app.run(run);

module.exports = app;
