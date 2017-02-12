'use strict';
var controllername = 'usermanagement';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var databroker = require('../../databroker')(app.name.split('.')[0]).name;
    var authentication = require('../../authentication')(app.name.split('.')[0]).name;

    var deps = ['$window', '$rootScope', '$timeout', '$state', '$scope', databroker + '.customaudience', databroker + '.user', authentication + '.authentication'];

    function controller($window, $rootScope, $timeout, $state, $scope, customaudience, user, authentication) {
        var vm = this;
        vm.controllername = fullname;

        //userquery

        vm.userquery = '';

        vm.pageloadingboolean = true;

        //popup cancel
        vm.closeopenbool = false;

        vm.closepopup = function() {
            if (vm.closeopenbool === false) {
                vm.closeopenbool = true;
            } else if (vm.closeopenbool === true) {
                vm.closeopenbool = false;
            }
        };

        vm.testtest = function() {
            console.log("pas disabled")
        }

        vm.check = function(value) {
            if (value) {
                vm.loaderon = true;

                $timeout(function() {
                    vm.loaderon = false;
                    vm.nextstepfunction();
                }, 700);
            }

        };

        vm.usercreationboolean = false;

        vm.createauseroc = function() {
            if (vm.usercreationboolean === false) {
                vm.usercreationboolean = true
                vm.setpassword();
            } else if (vm.usercreationboolean = true) {
                vm.usercreationboolean = false
            }
        }

        //End of popup cancel

        //Test Loopback

        vm.brice = function() {
            Publisheruser.create({
                'md5': 'FE24GEZT2'
            }).$promise.then(function(response) {});
        };

        //End of test Loopback

        vm.gotocreatelookalike = function(index) {
            $state.go('home.lookalikeaudience.createlookalikeaudience').then(function() {
                $rootScope.$broadcast('loadcustomaudiencetoextend', vm.audiencetodetail);
            });
        }

        // filter

        //Load audience

        vm.noaudiencebool = false;
        vm.audienceshown = 0;

        var quantityofaudiencestoloadfirst = 5;
        var firsttoskipnumber = 0;

        //Load more audience

        vm.counterload = 0;
        vm.loadmorebool = true;

        //Charger les audiences et loadmore

        var date = new Date();

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

        vm.loadroleById = function(id) {
            user.getRole(id).then(function(role) {
                // if(role[0].roleId === undefined){}
                user.getRoletype(role[0].roleId).then(function(roletype) {
                    // console.log(roletype);
                    vm.roletoload = roletype[0].name
                    console.log(vm.roletoload);
                    // console.log(vm.usertomodifytype);
                }).catch(function(error) {
                    throw error
                })
            }).catch(function(error) {
                throw error
            })

        }

        user.loadallusers().then(function(allusers) {
            // console.log(allusers);
            vm.allusers = [];
            // vm.userid = [];

            // for (var k = 0; k < allusers.length; k++) {
            //     vm.userid.push(allusers[k].id)
            // }

            // vm.rolelist = [];
            // for (var z = 0; z < allusers.length; z++) {
            //     user.getRole(vm.userid[z]).then(function(role) {
            //         if (role[0] === undefined) {
            //             vm.rolelist.push('None');
            //         } else {
            //             user.getRoletype(role[0].roleId).then(function(roletype) {
            //                 console.log(roletype[0].name);
            //                 vm.rolelist.push(roletype[0].name);
            //             }).then(function(){
            //             }).catch(function(error) {
            //                 throw error
            //             })
            //         }
            //     }).catch(function(error) {
            //         throw error
            //     })
            // }

            for (var i = 0; i < allusers.length; i++) {
                var date = new Date(allusers[i].date);
                allusers[i].date = vm.styledate(date);
            }
            vm.allusers = allusers;
            vm.pageloadingboolean = false;
            console.log(allusers);
        }).then(function() {

        }).catch(function(error) {
            vm.pageloadingboolean = false;
            console.log(error);
            throw error;
        })

        $rootScope.$on('reloadusermanagement', function(event, data) {
            console.log('on reaload les users')
            user.loadallusers().then(function(allusers) {
                vm.allusers = [];
                for (var i = 0; i < allusers.length; i++) {
                    var date = new Date(allusers[i].date);
                    allusers[i].date = vm.styledate(date);
                    vm.allusers.push(allusers[i])
                }
                vm.allusers = allusers;
                vm.pageloadingboolean = false;
                console.log(allusers);
            }).catch(function(error) {
                vm.pageloadingboolean = false;
                console.log(error);
                throw error;
            })
        });

        vm.loadindextodelete = function($index) {
            vm.indextodelete = $index;
            console.log(vm.indextodelete)
        }

        vm.deleteuserById = function() {
            console.log('on clique');
            if (vm.deleteconfirmation === 'SUPPRIMER') {
                console.log('on va supprimer, beware');
                user.deleteuserById(vm.allusers[vm.indextodelete]).then(function(user) {
                    console.log(user)
                    vm.closepopup();
                    $rootScope.$broadcast('reloadusermanagement', null);
                    vm.deleteconfirmation = "";
                }).catch(function(error) {
                    throw error;
                })
            }
        }

        vm.updateuser = function() {

        }

        vm.generalinformationboolean = false;

        vm.modifyinformationf = function() {
            if (vm.generalinformationboolean === false) {
                vm.generalinformationboolean = true;
            } else if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }
        }

        vm.loadusertomodify = function(index) {
            vm.pageloadingboolean = true;
            user.loaduserByID(vm.allusers[index].id).then(function(user) {
                console.log(user);
                vm.user = user[0];
            }).catch(function(error) {
                console.log(error);
                vm.pageloadingboolean = false;
                throw error
            })
        }

        vm.loadroleByIndex = function(index) {
            user.getRole(vm.allusers[index].id).then(function(role) {
                console.log(role)
                if (role[0] === undefined) {
                    vm.usertomodifytype = 'None';
                } else {
                    user.getRoletype(role[0].roleId).then(function(roletype) {
                        console.log(roletype);
                        vm.usertomodifytype = roletype[0].name;
                        console.log(vm.usertomodifytype);
                        return roletype[0].name
                    }).catch(function(error) {
                        throw error
                    })
                }

                vm.pageloadingboolean = false;
            }).catch(function(error) {
                throw error
            })
        }

        // $scope.$watch(function() {
        //     console.log(vm.usertomodifytype);
        // })

        // user.getRole('589da27c7e0e4c04004a84e0').then(function(role) {
        //     console.log(role)
        //     user.getRoletype(role[0].roleId).then(function(roletype) {
        //         console.log(roletype);
        //         vm.usertomodifytype = roletype[0].name
        //         console.log(vm.usertomodifytype);
        //         vm.pageloadingboolean = false;
        //     }).catch(function(error) {
        //         throw error
        //     })
        // }).catch(function(error) {
        //     throw error
        // })

        vm.emailboolean = true;
        vm.emailbooleancreation = true;

        vm.emailtest = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailboolean = regEmail.test(vm.user.email);
        }

        vm.emailtestcreation = function() {
            var regEmail = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            vm.emailbooleancreation = regEmail.test(vm.newuser.email);
        }

        vm.cancel = function() {
            if (vm.generalinformationboolean === true) {
                vm.generalinformationboolean = false;
            }
        }

        //password generator

        vm.setpassword = function() {
            var symbols = ['a', 'z', 'e', 'r', 't', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'W', 'X', 'C', 'V', 'B', 'N', ',', ';', ':', '%', '$', '*', '€', '=', ':', '?', '=', '/', '&', 'é', ')', '(', '§', 'è', '!', 'ç', 'à', '-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
            var L = symbols.length;
            vm.password = "";
            for (var i = 0; i < 20; i++) {
                var x = Math.round(Math.random() * L);
                vm.password = vm.password.concat(symbols[x]);
            }
            return vm.password
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
                vm.pageloadingboolean = true;
                console.log("kikoo")
                var firstname = vm.user.firstname;
                var lastname = vm.user.lastname;
                var organization = vm.user.organization;
                var username = vm.user.email;
                var id = vm.user.id;
                console.log(id);

                user.updateuserattributes(id, firstname, lastname, organization, username).then(function(user) {
                    authentication.updateuserwithroles(id,vm.usertomodifytype).then(function(res) {
                        console.log(res)
                        $rootScope.$broadcast('userupdatesuccess', null);
                        $rootScope.$broadcast('reloadusermanagement', null);
                        vm.modifyinformationf();
                        vm.pageloadingboolean = false;
                        vm.user.firstname = '';
                        vm.user.lastname = '';
                        vm.user.organization = '';
                        vm.user.email = '';
                        vm.user.id = '';
                        var container = document.getElementById('usermanagementblock');
                        // var scrollTo = document.getElementById('top');
                        container.scrollTop = scrollTo.offsetTop;
                        console.log(user)
                    }).catch(function(error) {
                        vm.pageloadingboolean = false;
                    });

                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                });
            };
        };

        vm.usertype = 'client';

        vm.submitusercreationForm = function(isValid) {
            if (isValid) {
                vm.pageloadingboolean = true;
                console.log("kikoo")
                var firstname = vm.newuser.firstname;
                var lastname = vm.newuser.lastname;
                var organization = vm.newuser.organization;
                var username = vm.newuser.email;
                var password = vm.password;
                var usertype = vm.usertype;

                authentication.signUpwithroles(username, password, firstname, lastname, organization, username, usertype).then(function(user) {
                    $rootScope.$broadcast('userupdatesuccess', null);
                    $rootScope.$broadcast('reloadusermanagement', null);
                    vm.createauseroc();
                    vm.pageloadingboolean = false;
                    vm.newuser.firstname = '';
                    vm.newuser.lastname = '';
                    vm.newuser.organization = '';
                    vm.newuser.email = '';
                    vm.password = '';
                    var container = document.getElementById('usermanagementblock');
                    container.scrollTop = scrollTo.offsetTop;
                    console.log(user)
                }).catch(function(error) {
                    vm.pageloadingboolean = false;
                });
            };
        };

        //User update confirmation

        vm.showmessage = 'information-block-success-campaign-up';

        $rootScope.$on('userupdatesuccess', function(event, data) {
            vm.showmessage = 'information-block-success-campaign-down';
            $timeout(function() {
                vm.showmessage = 'information-block-success-campaign-up';
            }, 6000);
        });

        //More info

        vm.moreinfoboolean = false;

        vm.closemoreinfo = function() {
            if (vm.moreinfoboolean === false) {
                vm.moreinfoboolean = true;
            } else if (vm.moreinfoboolean === true) {
                vm.moreinfoboolean = false;
            }
        }

        //Load more info about a Custom audience

        vm.audiencetodetail = {};
        vm.loadmoreinfo = function(index) {
            vm.audiencetodetail = vm.audiencesloaded[index];

        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
