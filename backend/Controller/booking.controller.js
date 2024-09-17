const { Doctor } = require("../Models/doctor.model");
const { Appointmentreq } = require('../Models/oppointment.model');
const { User } = require('../Models/user.model');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const SENDMEETLINKtopatient = async (email, meetlink) => {
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
            subject: "GOOGLE MEET LINK",
            text: `HERE IS YOUR MEET LINK: ${meetlink}`,
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const sendmeetinktodoctor = async (email, meetlink) => {
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
            subject: "GOOGLE MEET LINK",
            text: `HERE IS YOUR MEET LINK: ${meetlink}`,
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

async function createGoogleMeetEvent(doctorId, patientEmail, startTime, endTime) {
    // Fetch doctor and their refresh token
    const doctor = await Doctor.findById(doctorId);
    if (!doctor.refreshToken) {
        throw new Error('Doctor has not authorized Google Calendar access.');
    }

    // Set up OAuth2 client with the refresh token
    const oauth2Client = new google.auth.OAuth2(
        process.env.MEET_CLIENT_ID,
        process.env.MEET_CLIENT_SECRET,
        process.env.MEET_REDIRECT_URI
    );
    oauth2Client.setCredentials({ refresh_token: doctor.refreshToken });

    // Create the event with Google Calendar API
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary: 'Appointment with Doctor',
        description: 'Consultation',
        start: { dateTime: startTime, timeZone: 'Asia/Kolkata' },
        end: { dateTime: endTime, timeZone: 'Asia/Kolkata' },
        attendees: [{ email: doctor.email }, { email: patientEmail }],
        conferenceData: {
            createRequest: { requestId: 'unique-request-id', conferenceSolutionKey: { type: 'hangoutsMeet' } },
        },
    };

    try {
        const eventResult = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
        });

        const meetLink = eventResult.data.hangoutLink;
        console.log('Google Meet link:', meetLink);

        // Send the Google Meet link to the patient and doctor
        const sentToPatient = await SENDMEETLINKtopatient(patientEmail, meetLink);
        const sentToDoctor = await sendmeetinktodoctor(doctor.email, meetLink);

        if (!sentToPatient || !sentToDoctor) {
            throw new Error('Could not send Google Meet link.');
        }

        // Return or send the Google Meet link to both the doctor and patient
        return meetLink;
    } catch (error) {
        console.error('Error creating Google Meet link:', error);
        throw new Error('Could not create Google Meet link');
    }
}

const checkout = async (req, res) => {
    try {
        const appointmentid = req.params.id;
        const appointment = await Appointmentreq.findById(appointmentid);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const { patientId, doctorId, date, time } = appointment;
        const userdata = await User.findById(patientId);
        const doctor = await Doctor.findById(doctorId);
        const amount = doctor.consultationFee;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userdata.email,
            client_reference_id: appointmentid,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: doctor.firstName,
                            images: [doctor.profilePhoto],
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.STRIPE_CALLBACK_URL}/api/booking/success?appointment_id=${appointmentid}`,
            cancel_url: `${process.env.CLIENT_URL}/failure`,
        });
        console.log(session);



        if (session) {
            appointment.paymentSessionId = session.id;
            await appointment.save();
        }




        // Create Google Meet event and get the meet link


        res.status(200).json({ message: "Successfully paid. Here is your meet link", session });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const paymentSuccess = async (req, res) => {
    const appointment_id = req.query.appointment_id;

    try {

        const appointment = await Appointmentreq.findById(appointment_id);
        const { doctorId, patientId, date, time } = appointment;
        const userdata = await User.findById(patientId);

        const session_id = appointment.paymentSessionId;
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status === 'paid') {
            // Find the appointment by the Stripe session's metadata or other info
            if (appointment) {
                appointment.payment = "paid";
                await appointment.save();

                const appointmentDate = new Date(date); // This will give you a UTC date
                const timeMatch = time.match(/(\d+):(\d+) (AM|PM)/);

                if (!timeMatch) {
                    throw new Error("Invalid time format");
                }

                const [hours, minutes, period] = timeMatch.slice(1);

                let adjustedHours = parseInt(hours, 10);
                if (period === "PM" && adjustedHours < 12) {
                    adjustedHours += 12;
                } else if (period === "AM" && adjustedHours === 12) {
                    adjustedHours = 0;
                }

                // Set the appointment date to the correct hour and minute
                appointmentDate.setUTCHours(adjustedHours, minutes);

                // Create a new date for the startTime in IST
                const startTime = new Date(appointmentDate);

                // Add 1 hour to the startTime for the endTime
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

                // Convert both times to IST (Indian Standard Time, which is UTC+5:30)
                const startTimeIST = new Date(startTime.getTime() + 5.5 * 60 * 60 * 1000);
                const endTimeIST = new Date(endTime.getTime() + 5.5 * 60 * 60 * 1000);

                // Send confirmation emails to the doctor and patient
                const meetLink = await createGoogleMeetEvent(doctorId, userdata.email, startTimeIST.toISOString(), endTimeIST.toISOString());

                if (meetLink) {
                    appointment.meetLink = meetLink;
                    await appointment.save();
                }

                res.redirect(`${process.env.CLIENT_URL}/success`);
            }
        } else {
            res.redirect(`${process.env.CLIENT_URL}/failure`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

module.exports = { checkout, paymentSuccess };
