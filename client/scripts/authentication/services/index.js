'use strict';

module.exports = function(app) {
    // inject:start
    require('./authentication')(app);
    // inject:end
};