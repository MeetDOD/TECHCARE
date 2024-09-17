const express = require('express');
const router = express.Router();
const { checkout, paymentSuccess } = require("../Controller/booking.controller");
const { authenticateToken, authenticatedoctor } = require("../Middlewares/auth.middleware")

router.post("/checkout/:id", authenticateToken, checkout);
router.get("/success", paymentSuccess)


module.exports = router;
