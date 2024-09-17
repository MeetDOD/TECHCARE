const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middlewares/auth.middleware');
const { Appointmentreq } = require('../Models/oppointment.model');
const { User } = require('../Models/user.model');
const { Doctor } = require('../Models/doctor.model');


const bookappointment = async (req, res) => {
    try {
        const { doctorId, patientId, date, time, patientName, description, phoneNo, patientEmail, doctorEmail, doctorName, doctorPhoto, patientPhoto } = req.body;

        const newreq = new Appointmentreq({
            doctorId: doctorId,
            patientId: patientId,
            date: date,
            time: time,
            patientName: patientName,
            description: description,
            phoneNo: phoneNo,
            patienEmail: patientEmail,
            doctorEmail: doctorEmail,
            doctorName: doctorName,
            doctorPhoto: doctorPhoto,
            patientPhoto: patientPhoto
        });

        await newreq.save();

        res.status(201).json({ message: "Appointment request successfully send" });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

const getpatientappointment = async (req, res) => {
    try {
        const id = req.user._id;
        const appoint = await Appointmentreq.find({ patientId: id });
        res.status(200).json({ message: "Appointment request successfully fetched", data: appoint });

    } catch (error) {
        console.error("Error fetching appointment requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getdoctorappointment = async (req, res) => {
    try {
        const id = req.user._id;
        const appoint = await Appointmentreq.find({ doctorId: id });
        res.status(200).json({ message: "Appointment request successfully fetched", data: appoint });

    } catch (error) {
        console.error("Error fetching appointment requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const cancelbypatient = async (req, res) => {
    try {
        const id = req.user._id;
        console.log(id);

        const { reason, appointmentId } = req.body;
        console.log(appointmentId);
        const appoint = await Appointmentreq.findById(appointmentId);
        console.log(appoint);

        // Use the equals() method to compare ObjectIds
        if (!appoint.patientId.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to cancel this appointment" });
        }

        appoint.status = "cancelled";
        appoint.reason = reason;
        appoint.cancelledBy = "patient";
        await appoint.save();
        res.status(200).json({ message: "Appointment request successfully cancelled" });
    } catch (error) {
        console.error("Error cancelling appointment request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const cancelbydoctor = async (req, res) => {
    try {
        const { reason, appointmentId } = req.body;
        const appoint = await Appointmentreq.findById(appointmentId);
        if (!appoint.doctorId.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to cancel this appointment" });
        }
        appoint.status = "cancelled";
        appoint.reason = reason;
        appoint.cancelledBy = "doctor";
        await appoint.save();
        res.status(200).json({ message: "Appointment request successfully cancelled" });
    } catch (error) {
        console.error("Error cancelling appointment request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const acceptappointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appoint = await Appointmentreq.findById(appointmentId);
        if (!appoint.doctorId.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to accept this appointment" });
        }
        appoint.status = "accepted";
        await appoint.save();
        res.status(200).json({ message: "Appointment request successfully accepted" });
    }
    catch (error) {
        console.error("Error accepting appointment request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const completeappointment = async (req, res) => {
    try {
        const { appointmentId, prescription } = req.body;
        const appoint = await Appointmentreq.findById(appointmentId);
        if (appoint.doctorId.equals(req.user._id)) {
            return res.status(403).json({ message: "You are not authorized to complete this appointment" });
        }
        appoint.status = "completed";
        appoint.prescription = prescription;
        await appoint.save();
        res.status(200).json({ message: "Appointment request successfully completed" });
    }
    catch (error) {
        console.error("Error completing appointment request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { bookappointment, getpatientappointment, getdoctorappointment, cancelbypatient, cancelbydoctor, acceptappointment, completeappointment };




