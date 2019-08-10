const path = require('path');

module.exports = {
    port : 3030,
    controllers : {
        apiv1 : path.resolve('./modules/controllers/api/apiv1'),
    },
    models : path.resolve('./modules/models'),
}