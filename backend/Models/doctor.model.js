const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    datOfBirth: {
        type: Date,
    },
    gender: {
        type: String,

    },
    residentialAddress: {
        type: String,
    },
    hospitalAddress: {
        type: String,
    },
    otp: {
        type: Number
    },
    specialization: {
        type: String,

    },
    experience: {
        type: Number,

    },
    hospital: {
        type: String,
    },
    availableDay: {
        type: [String],

    },
    certificate: {
        type: String,
    },

    languageSpoken: {
        type: [String],
    },
    consultationFee: {
        type: Number,
        min: 0,
    },
    medicalAchievements: {
        type: [String], // Array of medical achievement certificates
    },
    profilePhoto: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    refreshToken: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        default: "doctor"
    },
    contactNo: {
        type: Number,
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Doctor };
