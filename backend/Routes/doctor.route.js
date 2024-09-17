const express = require('express');
const router = express.Router();
const { register, login, updateProfile, verifyOTP, getalldoctors, getdrbyspecilization, getdrbyid, createdoctors } = require("../Controller/doctor.controller");
const { authenticateToken, authenticatedoctor } = require("../Middlewares/auth.middleware")

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", authenticatedoctor, updateProfile);
router.post("/verify-otp", verifyOTP);
router.post("/createdoctor", createdoctors)
router.get("/getalldr", getalldoctors)
router.get("/getdrbyid/:id", getdrbyid)
router.get("/getdrbyspec", getdrbyspecilization)

module.exports = router;
