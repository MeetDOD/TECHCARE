import axios from "axios";

export const userverifyOTP = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verify-otp`, data);
        return res;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return error.response;
    }
}

export const userlogin = async (email, password) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, email, password);
        return res;
    } catch (error) {
        console.error("Error logging in user:", error);
        return error.response;
    }
}

export const userupdateProfile = async (data) => {
    try {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/user/update-profile`, data, { headers });
        return res;
    } catch (error) {
        console.error("Error updating user profile:", error);
        return error.response;
    }
}