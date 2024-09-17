import React from "react";
import { Link } from "react-router-dom";
import cat1 from "../assets/categories/cat1.png";
import cat2 from "../assets/categories/cat2.png";
import cat3 from "../assets/categories/cat3.png";
import cat4 from "../assets/categories/cat4.png";
import cat5 from "../assets/categories/cat5.png";
import cat6 from "../assets/categories/cat6.png";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
    background: "#f5f8fb",
    headerBgColor: "#356DE8",
    headerFontColor: "#fff",
    botBubbleColor: "#356DE8",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#356DE8",
};

const special = [
    {
        name: "Period doubts or Pregnancy",
        icon: cat1,
    },
    {
        name: "Acne, pimple or skin issues",
        icon: cat2,
    },
    {
        name: "Performance issues in bed",
        icon: cat3,
    },
    {
        name: "Cold, cough or fever",
        icon: cat4,
    },
    {
        name: "Child not feeling well",
        icon: cat5,
    },
    {
        name: "Depression or anxiety",
        icon: cat6,
    },
];

const Categories = () => {
    return (
        <div className="flex flex-col items-center gap-5 py-16 px-4">
            <ThemeProvider theme={theme}>
                <ChatBot
                    className="text-black bg-primary"
                    steps={[
                        {
                            id: "1",
                            message: "What is your name?",
                            trigger: "2",
                        },
                        {
                            id: "2",
                            user: true,
                            trigger: "3",
                        },
                        {
                            id: "3",
                            message: "Hi {previousValue}, nice to meet you!",
                            trigger: "4",
                        },
                        {
                            id: "4",
                            message: "How can we assist you today?",
                            trigger: "5",
                        },
                        {
                            id: "5",
                            options: [
                                {
                                    value: "online-consultation",
                                    label: "Online Consultation",
                                    trigger: "6",
                                },
                                {
                                    value: "update-info",
                                    label: "Update Personal Info",
                                    trigger: "7",
                                },
                                { value: "other", label: "Other Queries", trigger: "8" },
                            ],
                        },
                        {
                            id: "6",
                            message:
                                "Yes, we offer online video consultations with doctors. Would you like to book an appointment?",
                            end: true,
                        },
                        {
                            id: "7",
                            message:
                                'You can update your personal or medical information by visiting the "Profile" section.',
                            end: true,
                        },
                        {
                            id: "8",
                            message:
                                "Please specify your query, and we will assist you further.",
                            trigger: "9",
                        },
                        {
                            id: "9",
                            user: true,
                            trigger: "10",
                        },
                        {
                            id: "10",
                            message:
                                "Thank you for your query. Our support team will get back to you shortly.",
                            end: true,
                        },
                        // Additional questions
                        {
                            id: "11",
                            message: "Are you looking for specialist doctors?",
                            trigger: "12",
                        },
                        {
                            id: "12",
                            options: [
                                { value: "yes", label: "Yes", trigger: "13" },
                                { value: "no", label: "No", trigger: "14" },
                            ],
                        },
                        {
                            id: "13",
                            message: "Please select the specialty you need:",
                            trigger: "15",
                        },
                        {
                            id: "14",
                            message: "How else can we help you today?",
                            end: true,
                        },
                        {
                            id: "15",
                            options: [
                                { value: "dermatology", label: "Dermatology", trigger: "16" },
                                { value: "pediatrics", label: "Pediatrics", trigger: "16" },
                                { value: "gynecology", label: "Gynecology", trigger: "16" },
                            ],
                        },
                        {
                            id: "16",
                            message:
                                "Thank you. We will connect you with a specialist shortly.",
                            end: true,
                        },
                        {
                            id: "17",
                            message: "Would you like to know more about our privacy policy?",
                            trigger: "18",
                        },
                        {
                            id: "18",
                            options: [
                                { value: "yes", label: "Yes", trigger: "19" },
                                { value: "no", label: "No", end: true },
                            ],
                        },
                        {
                            id: "19",
                            message:
                                "Your privacy is our top priority. We ensure that all consultations and medical records are kept secure and confidential.",
                            end: true,
                        },
                        {
                            id: "20",
                            message: "Are there any questions about your appointment?",
                            trigger: "21",
                        },
                        {
                            id: "21",
                            options: [
                                {
                                    value: "reschedule",
                                    label: "Reschedule Appointment",
                                    trigger: "22",
                                },
                                { value: "cancel", label: "Cancel Appointment", trigger: "22" },
                            ],
                        },
                        {
                            id: "22",
                            message:
                                'You can manage your appointments by visiting the "Appointments" section.',
                            end: true,
                        },
                    ]}
                    floating={true}
                />
            </ThemeProvider>

            <h1 className="text-2xl md:text-3xl font-bold text-center">
                Find by <span className="text-primary">Doctors Speciality</span>
            </h1>
            <p className="w-1/2 text-center text-lg opacity-90">
                Private online consultations with verified doctors in all specialties
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-5 w-full">
                {special.map((item, index) => (
                    <Link
                        key={index}
                        className="flex flex-col items-center text-xs sm:text-sm cursor-pointer transition duration-300 hover:-translate-y-1"
                        to={`/doctors/${item.name}`}
                    >
                        <div className="flex flex-col items-center">
                            <img
                                src={item.icon}
                                alt={item.name}
                                className="w-20 sm:w-24 md:w-28 mb-2"
                            />
                            <p className="w-2/3 text-center font-semibold">{item.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;