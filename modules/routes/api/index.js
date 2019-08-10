const express = require('express');
const router = express.Router();

const ap1V1 = require('./apiv1');

router.use('/v1',ap1V1);



module.exports = router;