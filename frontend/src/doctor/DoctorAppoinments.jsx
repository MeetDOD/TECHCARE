import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const DoctorAppoinments = () => {

    const [doctorAppoinments, setdoctorAppoinments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchdoctorAppoinments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("doctortoken")}`,
            };
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointment/getdoctorappointment`, { headers });
            setdoctorAppoinments(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchdoctorAppoinments();
    }, [])

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true
        }).format(date);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-400';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-400';
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-400';
        }
    };

    const getPaymentColor = (payment) => {
        switch (payment) {
            case 'paid':
                return 'bg-green-100 text-green-800 border-green-400';
            case 'unpaid':
                return 'bg-red-100 text-red-800 border-red-400';
        }
    };

    const approveAppoinment = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("doctortoken")}`,
            };

            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/appointment/acceptappointment`,
                { appointmentId: id },
                { headers });

            setdoctorAppoinments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === id ? { ...appointment, status: 'accepted' } : appointment
                )
            );
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelAppoinment = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("doctortoken")}`,
            };

            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/appointment/cancelbydoctor`,
                { appointmentId: id },
                { headers });

            setdoctorAppoinments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === id ? { ...appointment, status: 'cancelled' } : appointment
                )
            );
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className=''>
            <p className='font-semibold text-lg'>Patient Appoinments </p>
            {loading ?
                (
                    Array.from({ length: 6 }).map((index) => (
                        <div key={index} className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{ borderColor: `var(--borderColor)` }}>
                            <Skeleton className='w-32 h-32 rounded-lg' />
                            <div className='flex-1 text-sm'>
                                <Skeleton className='h-4 w-40' />
                                <Skeleton className='h-4 w-28 my-2' />
                                <Skeleton className='h-4 w-56 my-2' />
                                <Skeleton className='h-4 w-24 my-2' />
                                <Skeleton className='h-4 w-32 my-2' />
                            </div>
                            <div className='flex flex-col gap-2 justify-end my-auto'>
                                <Skeleton className='h-10 sm:min-w-48 py-2' />
                                <Skeleton className='h-10 sm:min-w-48 py-2' />
                            </div>
                        </div>
                    ))
                )
                :
                (
                    doctorAppoinments.map((item, index) => (
                        <div className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{
                            borderColor: `var(--borderColor)`,
                        }}>
                            <div>
                                <img className='w-32 rounded-lg' src={item.patientPhoto} alt={item.patientName} />
                            </div>
                            <div className='flex-1 text-sm'>
                                <p className='font-bold my-1'>{item.patientName}</p>
                                <p className='mb-1 opacity-95 font-semibold flex items-center gap-1'>Doctor approval:
                                    <span className={`py-0.5 px-2 border-2 text-xs w-fit rounded-full ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                </p>
                                <p className='text-sm font-semibold mb-1'>Date & Time: {formatDate(item.date)} | {item.time}</p>
                                <p className='text-sm mb-1'>Payment: <span className={`text-xs border-2 rounded-full w-fit px-1 ${getPaymentColor(item.payment)}`}>{item.payment}</span></p>
                                <p className='mb-1 opacity-90'>Description: {item.description}</p>
                            </div>
                            <div className='flex flex-col gap-2 justify-end my-auto'>
                                {item.status === 'accepted' ? (
                                    <Button className="sm:min-w-48 py-2" disabled>
                                        Approved
                                    </Button>
                                ) : (
                                    <Button className="sm:min-w-48 py-2" onClick={() => approveAppoinment(item._id)} >
                                        Approve Appointment
                                    </Button>
                                )}

                                {item.status === 'cancelled' ? (
                                    <Button className="sm:min-w-48 py-2" variant="destructive" disabled>
                                        Canceled
                                    </Button>
                                ) : (
                                    <Button className="sm:min-w-48 py-2" variant="destructive" onClick={() => cancelAppoinment(item._id)}>
                                        Cancel Appointment
                                    </Button>
                                )}
                            </div>

                        </div>
                    ))
                )
            }
        </div>
    )
}

export default DoctorAppoinments
