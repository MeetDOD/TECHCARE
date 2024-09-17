const express = require('express');
const router = express.Router();
const { authenticateToken, authenticatedoctor } = require('../Middlewares/auth.middleware');
const { bookappointment, getpatientappointment, getdoctorappointment, cancelbydoctor, cancelbypatient, completeappointment, acceptappointment } = require('../Controller/appointment.controller');

router.post("/bookappointment", authenticateToken, bookappointment);
router.get("/getpatientappointment", authenticateToken, getpatientappointment);
router.get("/getdoctorappointment", authenticatedoctor, getdoctorappointment);
router.put("/cancelbydoctor", authenticatedoctor, cancelbydoctor);
router.put("/cancelbypatient", authenticateToken, cancelbypatient);
router.put("/completeappointment", authenticatedoctor, completeappointment);
router.put("/acceptappointment", authenticatedoctor, acceptappointment);

module.exports = router;
