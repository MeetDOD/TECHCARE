const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const { Doctor } = require('../Models/doctor.model');


dotenv.config();

const CLIENT_ID = process.env.MEET_CLIENT_ID;
const CLIENT_SECRET = process.env.MEET_CLIENT_SECRET;
const REDIRECT_URI = process.env.MEET_REDIRECT_URI  // Your redirect URL
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);



const authintialise = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const scopes = ['https://www.googleapis.com/auth/calendar.events'];

        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
            state: doctorId // Forces a new refresh token each time
        });

        res.redirect(authUrl);
    } catch (error) {

        console.error("Error in authintialise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const callback = async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log(tokens);

        // Assume doctor is logged in and their ID is available in the session
        const doctorId = state; // or req.user.id if using auth
        const doctor = await Doctor.findById(doctorId);

        // Save refresh token in the doctor's model
        doctor.refreshToken = tokens.refresh_token;
        await doctor.save();
        res.redirect(process.env.CLIENT_URL + '/doctorprofile');

        res.send('Authorization successful! You can now receive bookings.');
    } catch (error) {
        console.error('Error in OAuth2 callback:', error);
        res.status(500).send('Authentication failed');
    }
}

module.exports = { authintialise, callback };
