'use strict';

module.exports = function(app) {
    // inject:start
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
    require('./reports')(app);
    require('./resetpwd')(app);
    require('./resetpwdfinal')(app);
    require('./signin')(app);
    require('./signup')(app);
    require('./summary')(app);
    require('./tandcs')(app);
    // inject:end
};