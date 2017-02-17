'use strict';

module.exports = function(app) {
    // inject:start
    require('./advertisersinformation')(app);
    require('./billing')(app);
    require('./createcampaign')(app);
    require('./createcustomaudience')(app);
    require('./createlookalikeaudience')(app);
    require('./customaudience')(app);
    require('./generalinformation')(app);
    require('./lookalikeaudience')(app);
    require('./mainView')(app);
    require('./makeadeal')(app);
    require('./mycampaigns')(app);
    require('./mytags')(app);
    require('./payment')(app);
    require('./publishersinformation')(app);
    require('./reports')(app);
    require('./resetpwd')(app);
    require('./resetpwdfinal')(app);
    require('./signin')(app);
    require('./signup')(app);
    require('./summary')(app);
    require('./tagcreation')(app);
    require('./tandcs')(app);
    require('./usermanagement')(app);
    // inject:end
};