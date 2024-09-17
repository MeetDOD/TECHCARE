const express = require('express');
const router = express.Router();
const { authenticatedoctor } = require('../Middlewares/auth.middleware');
const { authintialise, callback } = require('../Controller/googlemeet.controller');


router.get('/authintialise/:doctorId', authintialise);

router.get('/callback', callback);


module.exports = router;