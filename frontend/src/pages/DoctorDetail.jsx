import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdVerified } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { FaBookMedical } from "react-icons/fa6";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import RelatedDoctor from '@/snippets/RelatedDoctor';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInState, userState } from '@/store/atoms/userauth';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const DoctorDetail = () => {

    const { id } = useParams();
    const [doctorData, setDoctorData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [description, setdescription] = useState("")
    const user = useRecoilState(userState);

    const isLoggedIn = useRecoilValue(loggedInState);


    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctor/getdrbyid/${id}`);
                setDoctorData(response.data.doctor);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };

        if (id) {
            fetchDoctorData();
        }
    }, [id]);

    const handleSubmit = async () => {
        try {
            const appointmentData = {
                doctorId: id,
                patientId: user[0]._id,
                date: selectedDate,
                time: selectedTime,
                patientName: `${user[0].firstName} ${user[0].lastName}`,
                description: description,
                patientEmail: user[0].email,
                doctorEmail: doctorData.email,
                doctorName: `${doctorData.firstName} ${doctorData.lastName}`,
                doctorPhoto: doctorData.profilePhoto,
                patientPhoto: user[0].photo
            };

            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/appointment/bookappointment`, appointmentData, { headers });
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Error in booking appoinment");
        }
    }

    if (!doctorData) {
        return <div>Loading...</div>;
    }

    const timeSlots = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
    ];

    return (
        <div className='overflow-hidden'>
            <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
                <div className='items-center flex justify-center'>
                    <img src={doctorData.profilePhoto} className='w-full sm:max-w-80 rounded-lg border shadow-sm' style={{
                        borderColor: `var(--borderColor)`
                    }} />
                </div>
                <div className='flex-1 border rounded-lg p-8 py-7 mx-2 sm:mx-0 sm:mt-0 shadow-sm' style={{
                    borderColor: `var(--borderColor)`
                }}>
                    <p className='flex items-center gap-1.5 text-2xl font-bold'>{doctorData.firstName} {doctorData.lastName}<MdVerified size={23} /></p>
                    <div className='flex items-center gap-2 text-sm my-2 opacity-95 font-semibold'>
                        <p>{doctorData.specialization}</p>
                        <p className='py-0.5 px-2 border-2 text-xs rounded-full' style={{
                            borderColor: `var(--borderColor)`
                        }}>{doctorData.experience} Years</p>
                    </div>

                    <p className='text-[15px] font-medium my-1 mt-2'>Language Spoken</p>
                    <div className='flex items-center mt-2 gap-2'>
                        <p
                            className='py-0.5 px-2 border-2 text-xs w-fit rounded-full border-primary bg-primary/20'
                        >
                            {doctorData.languageSpoken[0]}
                        </p>
                    </div>

                    <p className='text-[15px] font-medium my-1 mt-2'>Medical Achievements</p>
                    <div className='flex md:flex-row mt-2 opacity-90 gap-2'>
                        <p
                            className='py-0.5 px-2 border-2 text-sm w-fit rounded-lg border-yellow-400 bg-yellow-400/20'
                        >
                            {doctorData.medicalAchievements[0]}
                        </p>
                    </div>

                    <p className='font-semibold text-lg mt-2 opacity-95'>
                        Appointment Fee: <span className='font-bold'>$ {doctorData.consultationFee}</span>
                    </p>
                </div>
            </div>

            <div className='flex justify-center my-10'>
                <Dialog>
                    <DialogTrigger asChild>
                        {isLoggedIn ?
                            <Button className="rounded-full py-6 px-12 text-lg font-semibold hover:-translate-y-1.5 transition duration-200">
                                Book Appointment
                            </Button>
                            :
                            <Button className="rounded-full py-6 px-12 text-lg font-semibold hover:-translate-y-1.5 transition duration-200" disabled>
                                Book Appoinment
                            </Button>
                        }
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl w-full mx-auto rounded-lg p-5 overflow-y-scroll max-h-[90vh]"
                        style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                        <DialogHeader>
                            <DialogTitle className="py-3 font-semibold flex gap-1.5">
                                <FaBookMedical size={20} />Book Appointment
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-6">
                            <div className='w-full lg:w-1/2 flex justify-center'>
                                <Calendar
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    mode="single"
                                    initialFocus
                                />
                            </div>

                            <div className='w-full lg:w-1/2'>
                                <p className='font-semibold mb-4'>Select a Time Slot</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {timeSlots.map((time, index) => (
                                        <Button
                                            key={index}
                                            variant={selectedTime === time ? "" : "secondary"}
                                            onClick={() => setSelectedTime(time)}
                                            className='py-2'
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Label>Description</Label>
                        <div className='w-full flex justify-center'>
                            <Textarea value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Write a description about booking this appointment..." required />
                        </div>

                        <div className='flex sm:flex-row flex-col justify-center items-center gap-2 gap-y-3'>
                            <Button onClick={handleSubmit} className="py-5 text-[16px] w-full" type="submit">
                                Confirm Appointment
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" className=" py-5 text-[16px] w-full">
                                    Close
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>


            <RelatedDoctor />
        </div>
    )
}

export default DoctorDetail;
