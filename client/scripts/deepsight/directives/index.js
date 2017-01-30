'use strict';

module.exports = function(app) {
    // inject:start
    require('./loader')(app);
    require('./loaderanalytics')(app);
    require('./loaderanalyticssmall')(app);
    require('./loaderper')(app);
    require('./popupconfirmation')(app);
    // inject:end
};