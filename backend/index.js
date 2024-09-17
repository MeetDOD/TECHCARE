const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Config/db');
const cookieParser = require('cookie-parser');
const userRoute = require('./Routes/user.route');
const doctorRoute = require('./Routes/doctor.route');
const appointmentRoute = require('./Routes/appointment.route');
const bookingRoute = require('./Routes/booking.route');
const fileUpload = require('express-fileupload');
const googlemeetroute = require('./Routes/googlemeetauth.route');

const { cloudnairyconnect } = require("./Config/cloudinary");

const port = process.env.PORT || 4000;

const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_REDIRECT_URI = 'http://localhost:4000/api/zoom/callback';


app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
// app.use(fileUpload());
app.use(fileUpload({ useTempFiles: true }))


cloudnairyconnect();

app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/meet", googlemeetroute);










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);


