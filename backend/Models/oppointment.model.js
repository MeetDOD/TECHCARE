const mongoose = require("mongoose");

const appointmentreqSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    patientName: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "completed", "cancelled"],
        default: "pending"
    },
    paymentSessionId: {
        type: String
    },
    payment: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid"
    },
    amount: {
        type: Number
    },
    cancelReason: {
        type: String
    },
    cancelledBy: {
        type: String,
        enum: ["doctor", "patient"]
    },
    description: {
        type: String
    },
    phoneno: {
        type: Number
    },
    doctorName: {
        type: String
    },
    patientEmail: {
        type: String
    },
    doctorEmail: {
        type: String
    },
    prescription: {
        type: String
    },
    doctorPhoto: {
        type: String
    },
    patientPhoto: {
        type: String
    },
    meetLink: {
        type: String
    },

},
    { timstamp: true });

const Appointmentreq = mongoose.model("appointmentreq", appointmentreqSchema);
module.exports = { Appointmentreq };