// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {
  'use strict';

  var urlBase = "/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "User",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Users/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Users/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#create
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createMany
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#upsert
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Users",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#exists
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Users/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Users/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#find
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Users",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findOne
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Users/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#updateAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Users/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#deleteById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Users/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#count
             * @methodOf lbServices.User
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Users/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$updateAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Users/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createChangeStream
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Users/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#login
             * @methodOf lbServices.User
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Users/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#logout
             * @methodOf lbServices.User
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Users/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#confirm
             * @methodOf lbServices.User
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Users/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#resetPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Users/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#getCurrent
             * @methodOf lbServices.User
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Users" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.User#updateOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.User#update
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.User#destroyById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#removeById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.User#modelName
        * @propertyOf lbServices.User
        * @description
        * The name of the model represented by this $resource,
        * i.e. `User`.
        */
        R.modelName = "User";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Customaudience
 * @header lbServices.Customaudience
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Customaudience` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Customaudience",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Customaudiences/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Customaudience.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/Customaudiences/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#create
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Customaudiences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#createMany
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Customaudiences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#upsert
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Customaudiences",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#exists
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Customaudiences/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#findById
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Customaudiences/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#find
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Customaudiences",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#findOne
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Customaudiences/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#updateAll
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Customaudiences/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#deleteById
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Customaudiences/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#count
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Customaudiences/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#prototype$updateAttributes
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Customaudiences/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#createChangeStream
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Customaudiences/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.findById() instead.
            "::findById::Deepsightuser::customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.destroyById() instead.
            "::destroyById::Deepsightuser::customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.updateById() instead.
            "::updateById::Deepsightuser::customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.customaudiences() instead.
            "::get::Deepsightuser::customaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.create() instead.
            "::create::Deepsightuser::customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.createMany() instead.
            "::createMany::Deepsightuser::customaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.destroyAll() instead.
            "::delete::Deepsightuser::customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.count() instead.
            "::count::Deepsightuser::customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Customaudience#updateOrCreate
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#update
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#destroyById
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Customaudience#removeById
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Customaudience#modelName
        * @propertyOf lbServices.Customaudience
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Customaudience`.
        */
        R.modelName = "Customaudience";


            /**
             * @ngdoc method
             * @name lbServices.Customaudience#user
             * @methodOf lbServices.Customaudience
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("Deepsightuser");
          var action = TargetResource["::get::Customaudience::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Lookalikeaudience
 * @header lbServices.Lookalikeaudience
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Lookalikeaudience` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Lookalikeaudience",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Lookalikeaudiences/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Lookalikeaudience.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/Lookalikeaudiences/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#create
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Lookalikeaudiences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#createMany
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Lookalikeaudiences",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#upsert
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Lookalikeaudiences",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#exists
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Lookalikeaudiences/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#findById
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Lookalikeaudiences/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#find
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Lookalikeaudiences",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#findOne
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Lookalikeaudiences/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#updateAll
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Lookalikeaudiences/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#deleteById
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Lookalikeaudiences/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#count
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Lookalikeaudiences/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#prototype$updateAttributes
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Lookalikeaudiences/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#createChangeStream
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Lookalikeaudiences/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.findById() instead.
            "::findById::Deepsightuser::lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.destroyById() instead.
            "::destroyById::Deepsightuser::lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.updateById() instead.
            "::updateById::Deepsightuser::lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences() instead.
            "::get::Deepsightuser::lookalikeaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.create() instead.
            "::create::Deepsightuser::lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.createMany() instead.
            "::createMany::Deepsightuser::lookalikeaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.destroyAll() instead.
            "::delete::Deepsightuser::lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.count() instead.
            "::count::Deepsightuser::lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#updateOrCreate
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#update
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#destroyById
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#removeById
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Lookalikeaudience#modelName
        * @propertyOf lbServices.Lookalikeaudience
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Lookalikeaudience`.
        */
        R.modelName = "Lookalikeaudience";


            /**
             * @ngdoc method
             * @name lbServices.Lookalikeaudience#user
             * @methodOf lbServices.Lookalikeaudience
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("Deepsightuser");
          var action = TargetResource["::get::Lookalikeaudience::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Publisheruser
 * @header lbServices.Publisheruser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Publisheruser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Publisheruser",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Publisherusers/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#create
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Publisherusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#createMany
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Publisherusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#upsert
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Publisherusers",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#exists
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Publisherusers/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#findById
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Publisherusers/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#find
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Publisherusers",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#findOne
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Publisherusers/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#updateAll
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Publisherusers/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#deleteById
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Publisherusers/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#count
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Publisherusers/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#prototype$updateAttributes
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Publisherusers/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#createChangeStream
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Publisherusers/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#updateOrCreate
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#update
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#destroyById
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Publisheruser#removeById
             * @methodOf lbServices.Publisheruser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Publisheruser` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Publisheruser#modelName
        * @propertyOf lbServices.Publisheruser
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Publisheruser`.
        */
        R.modelName = "Publisheruser";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Deepsightuser
 * @header lbServices.Deepsightuser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Deepsightuser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Deepsightuser",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Deepsightusers/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__findById__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__destroyById__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__updateById__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/accessTokens/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.findById() instead.
            "prototype$__findById__customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.destroyById() instead.
            "prototype$__destroyById__customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.updateById() instead.
            "prototype$__updateById__customaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/customaudiences/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.findById() instead.
            "prototype$__findById__lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.destroyById() instead.
            "prototype$__destroyById__lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.updateById() instead.
            "prototype$__updateById__lookalikeaudiences": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.tags.findById() instead.
            "prototype$__findById__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.tags.destroyById() instead.
            "prototype$__destroyById__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.tags.updateById() instead.
            "prototype$__updateById__tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__get__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Queries accessTokens of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__create__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/Deepsightusers/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__delete__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/Deepsightusers/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$__count__accessTokens
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Counts accessTokens of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Deepsightusers/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.customaudiences() instead.
            "prototype$__get__customaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.create() instead.
            "prototype$__create__customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.destroyAll() instead.
            "prototype$__delete__customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.customaudiences.count() instead.
            "prototype$__count__customaudiences": {
              url: urlBase + "/Deepsightusers/:id/customaudiences/count",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences() instead.
            "prototype$__get__lookalikeaudiences": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.create() instead.
            "prototype$__create__lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.destroyAll() instead.
            "prototype$__delete__lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.lookalikeaudiences.count() instead.
            "prototype$__count__lookalikeaudiences": {
              url: urlBase + "/Deepsightusers/:id/lookalikeaudiences/count",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.tags() instead.
            "prototype$__get__tags": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.tags.create() instead.
            "prototype$__create__tags": {
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.tags.destroyAll() instead.
            "prototype$__delete__tags": {
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.tags.count() instead.
            "prototype$__count__tags": {
              url: urlBase + "/Deepsightusers/:id/tags/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#create
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Deepsightusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#createMany
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Deepsightusers",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#upsert
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Deepsightusers",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#exists
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Deepsightusers/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#findById
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Deepsightusers/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#find
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Deepsightusers",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#findOne
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Deepsightusers/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#updateAll
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Deepsightusers/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#deleteById
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Deepsightusers/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#count
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Deepsightusers/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#prototype$updateAttributes
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Deepsightusers/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#createChangeStream
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Deepsightusers/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#login
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Deepsightusers/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#logout
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Deepsightusers/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#confirm
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Deepsightusers/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#resetPassword
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Deepsightusers/reset",
              method: "POST",
            },

            // INTERNAL. Use Customaudience.user() instead.
            "::get::Customaudience::user": {
              url: urlBase + "/Customaudiences/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Lookalikeaudience.user() instead.
            "::get::Lookalikeaudience::user": {
              url: urlBase + "/Lookalikeaudiences/:id/user",
              method: "GET",
            },

            // INTERNAL. Use MarketingCampaign.user() instead.
            "::get::MarketingCampaign::user": {
              url: urlBase + "/MarketingCampaigns/:id/user",
              method: "GET",
            },

            // INTERNAL. Use Tags.user() instead.
            "::get::Tags::user": {
              url: urlBase + "/tags/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#getCurrent
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Deepsightusers" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#updateOrCreate
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#update
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#destroyById
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#removeById
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Deepsightuser#getCachedCurrent
         * @methodOf lbServices.Deepsightuser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Deepsightuser#login} or
         * {@link lbServices.Deepsightuser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Deepsightuser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Deepsightuser#isAuthenticated
         * @methodOf lbServices.Deepsightuser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Deepsightuser#getCurrentId
         * @methodOf lbServices.Deepsightuser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.Deepsightuser#modelName
        * @propertyOf lbServices.Deepsightuser
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Deepsightuser`.
        */
        R.modelName = "Deepsightuser";

    /**
     * @ngdoc object
     * @name lbServices.Deepsightuser.customaudiences
     * @header lbServices.Deepsightuser.customaudiences
     * @object
     * @description
     *
     * The object `Deepsightuser.customaudiences` groups methods
     * manipulating `Customaudience` instances related to `Deepsightuser`.
     *
     * Call {@link lbServices.Deepsightuser#customaudiences Deepsightuser.customaudiences()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#customaudiences
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Queries customaudiences of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R.customaudiences = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::get::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#count
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Counts customaudiences of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.customaudiences.count = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::count::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#create
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Creates a new instance in customaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R.customaudiences.create = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::create::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#createMany
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Creates a new instance in customaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R.customaudiences.createMany = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::createMany::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#destroyAll
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Deletes all customaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.customaudiences.destroyAll = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::delete::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#destroyById
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Delete a related item by id for customaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for customaudiences
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.customaudiences.destroyById = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::destroyById::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#findById
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Find a related item by id for customaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for customaudiences
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R.customaudiences.findById = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::findById::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.customaudiences#updateById
             * @methodOf lbServices.Deepsightuser.customaudiences
             *
             * @description
             *
             * Update a related item by id for customaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for customaudiences
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Customaudience` object.)
             * </em>
             */
        R.customaudiences.updateById = function() {
          var TargetResource = $injector.get("Customaudience");
          var action = TargetResource["::updateById::Deepsightuser::customaudiences"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Deepsightuser.lookalikeaudiences
     * @header lbServices.Deepsightuser.lookalikeaudiences
     * @object
     * @description
     *
     * The object `Deepsightuser.lookalikeaudiences` groups methods
     * manipulating `Lookalikeaudience` instances related to `Deepsightuser`.
     *
     * Call {@link lbServices.Deepsightuser#lookalikeaudiences Deepsightuser.lookalikeaudiences()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#lookalikeaudiences
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Queries lookalikeaudiences of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R.lookalikeaudiences = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::get::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#count
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Counts lookalikeaudiences of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.lookalikeaudiences.count = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::count::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#create
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Creates a new instance in lookalikeaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R.lookalikeaudiences.create = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::create::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#createMany
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Creates a new instance in lookalikeaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R.lookalikeaudiences.createMany = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::createMany::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#destroyAll
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Deletes all lookalikeaudiences of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.lookalikeaudiences.destroyAll = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::delete::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#destroyById
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Delete a related item by id for lookalikeaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for lookalikeaudiences
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.lookalikeaudiences.destroyById = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::destroyById::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#findById
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Find a related item by id for lookalikeaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for lookalikeaudiences
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R.lookalikeaudiences.findById = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::findById::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.lookalikeaudiences#updateById
             * @methodOf lbServices.Deepsightuser.lookalikeaudiences
             *
             * @description
             *
             * Update a related item by id for lookalikeaudiences.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for lookalikeaudiences
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Lookalikeaudience` object.)
             * </em>
             */
        R.lookalikeaudiences.updateById = function() {
          var TargetResource = $injector.get("Lookalikeaudience");
          var action = TargetResource["::updateById::Deepsightuser::lookalikeaudiences"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Deepsightuser.tags
     * @header lbServices.Deepsightuser.tags
     * @object
     * @description
     *
     * The object `Deepsightuser.tags` groups methods
     * manipulating `Tags` instances related to `Deepsightuser`.
     *
     * Call {@link lbServices.Deepsightuser#tags Deepsightuser.tags()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser#tags
             * @methodOf lbServices.Deepsightuser
             *
             * @description
             *
             * Queries tags of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R.tags = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::get::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#count
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Counts tags of Deepsightuser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.tags.count = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::count::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#create
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Creates a new instance in tags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R.tags.create = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::create::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#createMany
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Creates a new instance in tags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R.tags.createMany = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::createMany::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#destroyAll
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Deletes all tags of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.tags.destroyAll = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::delete::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#destroyById
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Delete a related item by id for tags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.tags.destroyById = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::destroyById::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#findById
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Find a related item by id for tags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R.tags.findById = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::findById::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightuser.tags#updateById
             * @methodOf lbServices.Deepsightuser.tags
             *
             * @description
             *
             * Update a related item by id for tags.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for tags
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R.tags.updateById = function() {
          var TargetResource = $injector.get("Tags");
          var action = TargetResource["::updateById::Deepsightuser::tags"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Email
 * @header lbServices.Email
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Email` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Email",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Emails/:id",
          { 'id': '@id' },
          {
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Email#modelName
        * @propertyOf lbServices.Email
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Email`.
        */
        R.modelName = "Email";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Emailoop
 * @header lbServices.Emailoop
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Emailoop` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Emailoop",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/emailoops/:id",
          { 'id': '@id' },
          {
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Emailoop#modelName
        * @propertyOf lbServices.Emailoop
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Emailoop`.
        */
        R.modelName = "Emailoop";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.MarketingCampaign
 * @header lbServices.MarketingCampaign
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `MarketingCampaign` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "MarketingCampaign",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/MarketingCampaigns/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use MarketingCampaign.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/MarketingCampaigns/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#create
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/MarketingCampaigns",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#createMany
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/MarketingCampaigns",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#upsert
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/MarketingCampaigns",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#exists
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/MarketingCampaigns/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#findById
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/MarketingCampaigns/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#find
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/MarketingCampaigns",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#findOne
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/MarketingCampaigns/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#updateAll
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/MarketingCampaigns/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#deleteById
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/MarketingCampaigns/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#count
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/MarketingCampaigns/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#prototype$updateAttributes
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/MarketingCampaigns/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#createChangeStream
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/MarketingCampaigns/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#updateOrCreate
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#update
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#destroyById
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#removeById
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `MarketingCampaign` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.MarketingCampaign#modelName
        * @propertyOf lbServices.MarketingCampaign
        * @description
        * The name of the model represented by this $resource,
        * i.e. `MarketingCampaign`.
        */
        R.modelName = "MarketingCampaign";


            /**
             * @ngdoc method
             * @name lbServices.MarketingCampaign#user
             * @methodOf lbServices.MarketingCampaign
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("Deepsightuser");
          var action = TargetResource["::get::MarketingCampaign::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Testmodel
 * @header lbServices.Testmodel
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Testmodel` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Testmodel",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Testmodels/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#create
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Testmodels",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#createMany
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Testmodels",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#upsert
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Testmodels",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#exists
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Testmodels/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#findById
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Testmodels/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#find
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Testmodels",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#findOne
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Testmodels/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#updateAll
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Testmodels/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#deleteById
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Testmodels/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#count
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Testmodels/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#prototype$updateAttributes
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Testmodels/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#createChangeStream
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Testmodels/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Testmodel#updateOrCreate
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#update
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#destroyById
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Testmodel#removeById
             * @methodOf lbServices.Testmodel
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Testmodel` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Testmodel#modelName
        * @propertyOf lbServices.Testmodel
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Testmodel`.
        */
        R.modelName = "Testmodel";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.LogCampaign
 * @header lbServices.LogCampaign
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `LogCampaign` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "LogCampaign",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/LogCampaigns/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#create
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/LogCampaigns",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#createMany
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/LogCampaigns",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#upsert
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/LogCampaigns",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#exists
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/LogCampaigns/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#findById
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/LogCampaigns/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#find
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/LogCampaigns",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#findOne
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/LogCampaigns/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#updateAll
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/LogCampaigns/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#deleteById
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/LogCampaigns/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#count
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/LogCampaigns/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#prototype$updateAttributes
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/LogCampaigns/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#createChangeStream
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/LogCampaigns/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#updateOrCreate
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#update
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#destroyById
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.LogCampaign#removeById
             * @methodOf lbServices.LogCampaign
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `LogCampaign` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.LogCampaign#modelName
        * @propertyOf lbServices.LogCampaign
        * @description
        * The name of the model represented by this $resource,
        * i.e. `LogCampaign`.
        */
        R.modelName = "LogCampaign";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Tags
 * @header lbServices.Tags
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Tags` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Tags",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/tags/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Tags.user() instead.
            "prototype$__get__user": {
              url: urlBase + "/tags/:id/user",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#create
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/tags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#createMany
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/tags",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#upsert
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/tags",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#exists
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/tags/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#findById
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/tags/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#find
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/tags",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#findOne
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/tags/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#updateAll
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/tags/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#deleteById
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/tags/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#count
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/tags/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#prototype$updateAttributes
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/tags/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Tags#createChangeStream
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/tags/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.tags.findById() instead.
            "::findById::Deepsightuser::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.tags.destroyById() instead.
            "::destroyById::Deepsightuser::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.tags.updateById() instead.
            "::updateById::Deepsightuser::tags": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightusers/:id/tags/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightuser.tags() instead.
            "::get::Deepsightuser::tags": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "GET",
            },

            // INTERNAL. Use Deepsightuser.tags.create() instead.
            "::create::Deepsightuser::tags": {
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.tags.createMany() instead.
            "::createMany::Deepsightuser::tags": {
              isArray: true,
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "POST",
            },

            // INTERNAL. Use Deepsightuser.tags.destroyAll() instead.
            "::delete::Deepsightuser::tags": {
              url: urlBase + "/Deepsightusers/:id/tags",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightuser.tags.count() instead.
            "::count::Deepsightuser::tags": {
              url: urlBase + "/Deepsightusers/:id/tags/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Tags#updateOrCreate
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Tags#update
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Tags#destroyById
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Tags#removeById
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Tags` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Tags#modelName
        * @propertyOf lbServices.Tags
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Tags`.
        */
        R.modelName = "Tags";


            /**
             * @ngdoc method
             * @name lbServices.Tags#user
             * @methodOf lbServices.Tags
             *
             * @description
             *
             * Fetches belongsTo relation user.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - PersistedModel id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightuser` object.)
             * </em>
             */
        R.user = function() {
          var TargetResource = $injector.get("Deepsightuser");
          var action = TargetResource["::get::Tags::user"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Deepsightrole
 * @header lbServices.Deepsightrole
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Deepsightrole` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Deepsightrole",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Deepsightroles/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Deepsightrole.principals.findById() instead.
            "prototype$__findById__principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightrole.principals.destroyById() instead.
            "prototype$__destroyById__principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightrole.principals.updateById() instead.
            "prototype$__updateById__principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightrole.principals() instead.
            "prototype$__get__principals": {
              isArray: true,
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "GET",
            },

            // INTERNAL. Use Deepsightrole.principals.create() instead.
            "prototype$__create__principals": {
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "POST",
            },

            // INTERNAL. Use Deepsightrole.principals.destroyAll() instead.
            "prototype$__delete__principals": {
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightrole.principals.count() instead.
            "prototype$__count__principals": {
              url: urlBase + "/Deepsightroles/:id/principals/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#create
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Deepsightroles",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#createMany
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Deepsightroles",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#upsert
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Deepsightroles",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#exists
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Deepsightroles/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#findById
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Deepsightroles/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#find
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Deepsightroles",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#findOne
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Deepsightroles/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#updateAll
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Deepsightroles/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#deleteById
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Deepsightroles/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#count
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Deepsightroles/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#prototype$updateAttributes
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Deepsightroles/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#createChangeStream
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Deepsightroles/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Deepsightrolemapping.role() instead.
            "::get::Deepsightrolemapping::role": {
              url: urlBase + "/Deepsightrolemappings/:id/role",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#updateOrCreate
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#update
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#destroyById
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#removeById
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Deepsightrole#modelName
        * @propertyOf lbServices.Deepsightrole
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Deepsightrole`.
        */
        R.modelName = "Deepsightrole";

    /**
     * @ngdoc object
     * @name lbServices.Deepsightrole.principals
     * @header lbServices.Deepsightrole.principals
     * @object
     * @description
     *
     * The object `Deepsightrole.principals` groups methods
     * manipulating `Deepsightrolemapping` instances related to `Deepsightrole`.
     *
     * Call {@link lbServices.Deepsightrole#principals Deepsightrole.principals()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole#principals
             * @methodOf lbServices.Deepsightrole
             *
             * @description
             *
             * Queries principals of Deepsightrole.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R.principals = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::get::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#count
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Counts principals of Deepsightrole.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.principals.count = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::count::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#create
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Creates a new instance in principals of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R.principals.create = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::create::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#createMany
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Creates a new instance in principals of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R.principals.createMany = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::createMany::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#destroyAll
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Deletes all principals of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.principals.destroyAll = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::delete::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#destroyById
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Delete a related item by id for principals.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             *  - `fk` – `{*}` - Foreign key for principals
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.principals.destroyById = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::destroyById::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#findById
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Find a related item by id for principals.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             *  - `fk` – `{*}` - Foreign key for principals
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R.principals.findById = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::findById::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrole.principals#updateById
             * @methodOf lbServices.Deepsightrole.principals
             *
             * @description
             *
             * Update a related item by id for principals.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Role id
             *
             *  - `fk` – `{*}` - Foreign key for principals
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R.principals.updateById = function() {
          var TargetResource = $injector.get("Deepsightrolemapping");
          var action = TargetResource["::updateById::Deepsightrole::principals"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Deepsightrolemapping
 * @header lbServices.Deepsightrolemapping
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Deepsightrolemapping` model.
 *
 * **Details**
 *
 * Map principals to roles
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Deepsightrolemapping",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Deepsightrolemappings/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Deepsightrolemapping.role() instead.
            "prototype$__get__role": {
              url: urlBase + "/Deepsightrolemappings/:id/role",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#create
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Deepsightrolemappings",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#createMany
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Deepsightrolemappings",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#upsert
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/Deepsightrolemappings",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#exists
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Deepsightrolemappings/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#findById
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Find a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Deepsightrolemappings/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#find
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Deepsightrolemappings",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#findOne
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Deepsightrolemappings/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#updateAll
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
            "updateAll": {
              url: urlBase + "/Deepsightrolemappings/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#deleteById
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Deepsightrolemappings/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#count
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Deepsightrolemappings/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#prototype$updateAttributes
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Update attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - RoleMapping id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/Deepsightrolemappings/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#createChangeStream
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Deepsightrolemappings/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Deepsightrole.principals.findById() instead.
            "::findById::Deepsightrole::principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "GET",
            },

            // INTERNAL. Use Deepsightrole.principals.destroyById() instead.
            "::destroyById::Deepsightrole::principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightrole.principals.updateById() instead.
            "::updateById::Deepsightrole::principals": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Deepsightroles/:id/principals/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Deepsightrole.principals() instead.
            "::get::Deepsightrole::principals": {
              isArray: true,
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "GET",
            },

            // INTERNAL. Use Deepsightrole.principals.create() instead.
            "::create::Deepsightrole::principals": {
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "POST",
            },

            // INTERNAL. Use Deepsightrole.principals.createMany() instead.
            "::createMany::Deepsightrole::principals": {
              isArray: true,
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "POST",
            },

            // INTERNAL. Use Deepsightrole.principals.destroyAll() instead.
            "::delete::Deepsightrole::principals": {
              url: urlBase + "/Deepsightroles/:id/principals",
              method: "DELETE",
            },

            // INTERNAL. Use Deepsightrole.principals.count() instead.
            "::count::Deepsightrole::principals": {
              url: urlBase + "/Deepsightroles/:id/principals/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#updateOrCreate
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#update
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Update instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The number of instances updated
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#destroyById
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#removeById
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Delete a model instance by id from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrolemapping` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];


        /**
        * @ngdoc property
        * @name lbServices.Deepsightrolemapping#modelName
        * @propertyOf lbServices.Deepsightrolemapping
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Deepsightrolemapping`.
        */
        R.modelName = "Deepsightrolemapping";


            /**
             * @ngdoc method
             * @name lbServices.Deepsightrolemapping#role
             * @methodOf lbServices.Deepsightrolemapping
             *
             * @description
             *
             * Fetches belongsTo relation role.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - RoleMapping id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Deepsightrole` object.)
             * </em>
             */
        R.role = function() {
          var TargetResource = $injector.get("Deepsightrole");
          var action = TargetResource["::get::Deepsightrolemapping::role"];
          return action.apply(R, arguments);
        };


        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
