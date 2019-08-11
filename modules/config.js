const path = require('path');

module.exports = {
    port : 3030,
    secret : '23239ufud8u4nlndfn^&^@$Bkjjnn@*$Ybreklma#$khe7673hnj^#',
    controllers : {
        apiv1 : path.resolve('./modules/controllers/api/apiv1'),
    },
    models : path.resolve('./modules/models'),
}