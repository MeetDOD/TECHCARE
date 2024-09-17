const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
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
    otp: {
        type: Number
    },
    dateofbirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    // role: {
    //     type: String,
    //     enum: ["user", "admin", "doctor"],
    //     default: "user",
    //     required: true
    // },
    // specialization: {
    //     type: String,
    //     // required: function() {
    //     //     return this.role === 'doctor';
    //     // }
    // },
    // experience: {
    //     type: Number,
    //     // required: function() {
    //     //     return this.role === 'doctor';
    //     // }
    // },
    // hospital: {
    //     type: String,
    //     // required: function() {
    //     //     return this.role === 'doctor';
    //     // }
    // },
    // availableDay: {
    //     type: [String],
    //     // required: function() {
    //     //     return this.role === 'doctor';
    //     // }
    // },
    // certificate: {
    //     type: String,
    //     // required: function() {
    //     //     return this.role === 'doctor';
    //     // }
    // },
    photo: {
        type: String
    },
    phoneno: {
        type: Number

    },
    userType: {
        type: String,
        default: "patient"
    },

},
    { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = { User };
