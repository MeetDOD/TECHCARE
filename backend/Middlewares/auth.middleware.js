const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");
const { Doctor } = require("../Models/doctor.model");

exports.authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.authenticatedoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const doctor = await Doctor.findById(decoded._id);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        req.user = doctor;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

exports.isAdmin = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;

    if (user.role !== "Admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
};