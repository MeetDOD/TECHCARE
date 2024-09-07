import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import doc from "../assets/demo/doc.png"
import { MdVerified, MdBadge } from "react-icons/md";
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { FaBookMedical } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import RelatedDoctor from '@/res/RelatedDoctor';

const DoctorDetail = () => {

    const { docId } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);

    const timeSlots = [
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
        "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
    ];

    return (
        <div className='overflow-hidden'>
            <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4'>
                <div className='items-center flex justify-center'>
                    <img src={doc} className='w-full sm:max-w-72 rounded-lg border shadow-sm' style={{
                        borderColor: `var(--borderColor)`
                    }} />
                </div>
                <div className='flex-1 border rounded-lg p-8 py-7 mx-2 sm:mx-0 sm:mt-0 shadow-sm' style={{
                    borderColor: `var(--borderColor)`
                }}>
                    <p className='flex items-center gap-1.5 text-2xl font-bold'>Dr. Ramesh Yadav<MdVerified size={23} /></p>
                    <div className='flex items-center gap-2 text-sm mt-1 opacity-95 font-semibold'>
                        <p>MBBS - Skin Specialist</p>
                        <p className='py-0.5 px-2 border-2 text-xs rounded-full' style={{
                            borderColor: `var(--borderColor)`
                        }}>5 Years</p>
                    </div>

                    <div>
                        <p className='flex items-center gap-1.5 text-lg font-medium mt-3'><MdBadge size={23} />About</p>
                        <p className='text-sm max-w-[700px] mt-1 opacity-90'>Lorem ipsum, dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                    </div>
                    <p className='font-medium mt-4 opacity-95'>
                        Appointment Fee: <span className=''>$ 50</span>
                    </p>
                </div>
            </div>

            <div className='flex justify-center my-10'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="rounded-full py-6 px-12 text-lg font-semibold hover:-translate-y-1.5 transition duration-200">
                            Book Appointment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl w-full mx-auto rounded-lg p-5 " style={{
                        backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)`
                    }}>
                        <DialogHeader>
                            <DialogTitle className="py-3 font-semibold flex gap-1.5">
                                <FaBookMedical size={20} />Book Appointment
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-6">
                            <div className='w-full lg:w-1/2 flex justify-center'>
                                <Calendar value={selectedDate} onChange={setSelectedDate} />
                            </div>

                            <div className='w-full lg:w-1/2'>
                                <p className='font-semibold mb-4'>Select a Time Slot</p>
                                <div className="grid grid-cols-3 gap-3">
                                    {timeSlots.map((time, index) => (
                                        <Button key={index} variant="secondary" className='py-2'>
                                            {time}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Button className="my-4 py-5 text-[16px] w-fit hover:-translate-y-1.5 transition duration-200" type="submit">
                                Confirm Appointment
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <RelatedDoctor />
        </div>
    )
}

export default DoctorDetail;
