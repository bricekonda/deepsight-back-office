'use strict';
var servicename = 'files';
var Papa = require('papaparse');

module.exports = function(app) {

    var dependencies = [
        '$http',
        '$q',
        '$rootScope',
        app.name + '.apiConstant',
        app.name + '.user'
    ];

    function service($http, $q, $rootScope, apiConstant, user) {

        var handleCSVFile = function(file) {
            //Check csv file header
            var deferred = $q.defer();
            Papa.parse(file, {
                complete: function(results) {
                    //is an array of array
                    var header = results.data[0][0];
                    if (header.toUpperCase() === 'MD5') {
                        var result = {};
                        result.file = file;
                        result.size = results.data.length - 2;//Because 1 of header and 1 for blank at the end of file
                        deferred.resolve(result);
                    } else {
                        deferred.reject('le fichier doit contenir lentete MD5');
                    }
                }
            });
            return deferred.promise;
        };


        var _getSignedUrl = function(file, filename) {
            var deferred = $q.defer();
            user.getcurrentUser().then(function(model) {
                var data = {
                    'file-name': filename,
                    'file-type': file.type,
                    'username': model.username
                };
                $http({
                    params: data,
                    method: 'GET',
                    url: apiConstant.uri + '/sign-s3'
                }).then(function(status) {
                    var signedUrl = status.data.signedRequest;
                    deferred.resolve(signedUrl);
                }, function(err) {
                    deferred.reject(err);
                });
            }, function() {
                deferred.reject('error when getting user');
            });
            return deferred.promise;
        };

        var uploadFile = function(file, filename) {
            var deferred = $q.defer();
            _getSignedUrl(file, filename).then(function(signedUrl) {
                var xhr = new XMLHttpRequest();
                xhr.upload.onprogress = function(e) {
                    var pc = parseInt((e.loaded / e.total * 100));
                    $rootScope.$broadcast('progressPercentage', {
                        value: pc
                    });
                };
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            deferred.resolve(200);
                        } else {
                            deferred.reject('erreur upload 1');
                        }
                    }
                };
                xhr.open('PUT', signedUrl);
                xhr.send(file);
            }, function() {
                deferred.reject('erreur upload 2');
            });
            return deferred.promise;
        };

        return {
            handleCSVFile: handleCSVFile,
            uploadFile: uploadFile
        };

    }
    service.$inject = dependencies;
    app.factory(app.name + '.' + servicename, service);
};
