import { atom } from "recoil";
import { selector } from "recoil";

export const tokenState = atom({
    key: "tokenState",
    default: localStorage.getItem("token"),
});

export const userState = atom({
    key: "userState",
    default: JSON.parse(localStorage.getItem("user")) || null,
});

export const doctortokenState = atom({
    key: "doctortokenState",
    default: localStorage.getItem("doctortoken"),
});

export const doctorState = atom({
    key: "doctorState",
    default: JSON.parse(localStorage.getItem("doctor")) || null,
});

export const loggedInState = selector({
    key: "loggedInState",
    get: ({ get }) => {

        const patientToken = get(tokenState);
        const patientUser = get(userState);

        const doctorToken = get(doctortokenState);
        const doctorUser = get(doctorState);

        return (patientToken !== null && patientUser !== null) || (doctorToken !== null && doctorUser !== null);
    },
});