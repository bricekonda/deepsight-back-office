'use strict';

module.exports = function(app) {
    // inject:start
    require('./loader')(app);
    require('./loaderper')(app);
    require('./popupconfirmation')(app);
    // inject:end
};