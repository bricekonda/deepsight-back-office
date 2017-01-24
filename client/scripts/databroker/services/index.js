'use strict';

module.exports = function(app) {
    // inject:start
    require('./analytics')(app);
    require('./campaign')(app);
    require('./customaudience')(app);
    require('./files')(app);
    require('./lookalikeaudience')(app);
    require('./user')(app);
    // inject:end
};