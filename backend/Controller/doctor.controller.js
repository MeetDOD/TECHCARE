const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { Doctor } = require("../Models/doctor.model");
const { OTP } = require("../Models/otp.model"); // Import the OTP model
const router = express.Router();
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;


dotenv.config();


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

const sendOTP = async (email, generatedOTP) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "OTP for Verification",
            text: `Here is Your OTP for Verifying your Email: ${generatedOTP}`,
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const register = async (req, res) => {
    try {
        const { password, email, firstName, lastName } = req.body;

        if (!password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existinguser = await Doctor.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const otp = generateOTP();
        const otpSent = await sendOTP(email, otp);

        if (!otpSent) {
            return res.status(500).json({ message: "Failed to send OTP Try again" });
        }

        // Store the OTP in the OTP collection
        await OTP.findOneAndUpdate(
            { email },
            { otp, otpExpires: Date.now() + 300000 }, // 5 minutes expiration
            { upsert: true, new: true }
        );
        res.status(200).json({ message: "OTP sent for email verification" });

    } catch (error) {
        console.error("Error registering Doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { email, enteredOTP, password, firstName, lastName } = req.body;


        const otpRecord = await OTP.findOne({ email });


        if (!otpRecord) {
            return res.status(400).json({ message: "session expired try gaian" });
        }
        if (otpRecord.otp != enteredOTP) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (otpRecord.otpExpires < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const initials = email.charAt(0).toUpperCase()
        const photo = `https://ui-avatars.com/api/?name=${initials}&background=random&size=128`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Doctor({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            profilePhoto: photo,
        });

        await newUser.save();

        // Delete OTP record after successful verification
        await OTP.deleteOne({ email });

        res.status(200).json({ message: "Doctor verified and registered successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: doctor._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, Doctor: { _id: doctor._id, email: doctor.email, firstName: doctor.firstName, lastName: doctor.lastName, photo: doctor.profilePhoto } });

    } catch (error) {
        console.error("Error logging in Doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { Id } = req.body;
        const allowedUpdates = [
            'userName', 'firstName', 'lastName', 'datOfBirth', 'gender',
            'residentialAddress', 'hospitalAddress', 'specialization',
            'experience', 'hospital', 'availableDay', 'certificate',
            'languageSpoken', 'consultationFee', 'medicalAchievements', 'contactNo'
        ]; // Allowed fields for update

        const updates = {};

        // Only keep the fields that are allowed
        allowedUpdates.forEach((key) => {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        });

        const photo = req.files?.profilePhoto;

        const doctor = await Doctor.findByIdAndUpdate(
            req.user._id,
            { $set: updates },  // Apply only allowed updates
            { new: true }  // Return the updated document
        );

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Update the profile photo if provided
        if (photo) {
            if (doctor.profilePhoto) {
                // Delete the existing photo from cloudinary
                const deleete = await cloudinary.uploader.destroy(doctor.profilePhoto);
            }
            const photoUploadResult = await cloudinary.uploader.upload(photo.tempFilePath);
            doctor.profilePhoto = photoUploadResult.secure_url;
        }

        const doctordata = {
            _id: doctor._id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
            photo: doctor.profilePhoto,
            email: doctor.email,
            specialization: doctor.specialization,
            experience: doctor.experience,
            qualification: doctor.qualification,

        }
        await doctor.save(); // Save the changes
        res.status(200).json({ message: "Profile updated successfully", Doctor: doctordata });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getalldoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getdrbyspecilization = async (req, res) => {
    try {
        const { specialization } = req.body;
        const doctors = await Doctor.find({ specialization });
        res.status(200).json({ doctors });
    } catch (error) {
        console.error("Error fetching doctors by specialization:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getdrbyid = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ doctor });
    } catch (error) {
        console.error("Error fetching doctor by id:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const createdoctors = async (req, res) => {
    try {
        const { email, password, firstName, lastName, specialization, experience, qualification, residentialAddress } = req.body;
        const photo = req.files?.profilePhoto;
        console.log(req.files)
        console.log(req.body)



        if (!email || !password || !firstName || !lastName || !specialization || !experience || !qualification) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingdoctor = await Doctor.findOne({ email })
        if (existingdoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const newdoctor = new Doctor({
            email,
            password,
            firstName,
            lastName,
            specialization,
            experience,
            qualification,
            residentialAddress,
        });

        if (photo) {
            const photoUploadResult = await cloudinary.uploader.upload(photo.tempFilePath);
            newdoctor.profilePhoto = photoUploadResult.secure_url;
        }


        await newdoctor.save();
        res.status(200).json({ message: "Doctor created successfully" });
    } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { register, verifyOTP, login, updateProfile, getalldoctors, getdrbyspecilization, getdrbyid, createdoctors };
