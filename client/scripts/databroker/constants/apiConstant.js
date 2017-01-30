'use strict';
var constantname = 'apiConstant';

module.exports = function(app) {
    app.constant(app.name + '.' + constantname, {
    	 uri: 'http://0.0.0.0:3010/api'
    	// uri: 'https://deepsight-server.herokuapp.com/api'
    });
};