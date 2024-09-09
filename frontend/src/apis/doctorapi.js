import axios from "axios";

export const doctorverifyOTP = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/doctor/verify-otp`, data);
        return res;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return error.response;
    }
}

export const doctorlogin = async (email, password) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/doctor/login`, email, password);
        return res;
    } catch (error) {
        console.error("Error logging in doctor:", error);
        return error.response;
    }
}

export const doctorupdateProfile = async (data) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("doctortoken")}`,
        };

        const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/doctor/update-profile`, data, { headers });
        return res;
    } catch (error) {
        console.error("Error updating doctor profile:", error);
        return error.response;
    }
}

export const getalldoctors = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctor/getalldr`);
        return res;
    } catch (error) {
        console.error("Error getting all doctors:", error);
        return error.response;
    }
}
