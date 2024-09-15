import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { RiCalendarScheduleLine } from "react-icons/ri";

const UserAppoinments = () => {

    const [userAppoinments, setuserappoinments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserAppoinments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointment/getpatientappointment`, { headers });
            setuserappoinments(res.data.data.reverse())
            setLoading(false);
            document.title = `TECHCARE | YOUR APPOINMENTS`;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserAppoinments();
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

    const cancelAppoinment = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };

            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/appointment/cancelbypatient`,
                { appointmentId: id },
                { headers });

            setuserappoinments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment._id === id ? { ...appointment, status: 'cancelled' } : appointment
                )
            );
            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
        }
    };

    const handlePayment = async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/booking/checkout/${id}`, {}, { headers });
            window.location.href = response.data.session.url;
            console.log(response.data.id)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <p className='flex items-center gap-1 font-semibold text-lg'><RiCalendarScheduleLine size={25} /> Appointments Scheduled</p>
            {loading ? (
                Array.from({ length: 6 }).map((index) => (
                    <div key={index} className='my-3 grid grid-cols-1 sm:grid-cols-[auto_3fr_1fr] gap-4 py-4 border-2 px-4 rounded-lg shadow-sm' style={{ borderColor: `var(--borderColor)` }}>
                        <div className='flex justify-center'>
                            <Skeleton className='w-32 h-32 object-cover rounded-lg' />
                        </div>
                        <div className='flex-1 text-sm'>
                            <Skeleton className='h-6 w-40 mb-2' />
                            <div className='flex items-center gap-1 mb-2'>
                                <Skeleton className='h-4 w-32' />
                                <Skeleton className='h-4 w-24' />
                            </div>
                            <Skeleton className='h-4 w-56 mb-2' />
                            <Skeleton className='h-4 w-24 mb-2' />
                            <Skeleton className='h-4 w-64 mb-2' />
                        </div>
                        <div className="flex flex-col gap-2 items-end justify-center">
                            <Skeleton className="h-10 w-full py-2" />
                            <Skeleton className="h-10 w-full py-2" />
                        </div>
                    </div>

                ))
            ) : userAppoinments.length === 0 ? (
                <div className='text-center my-20 font-bold text-2xl'>
                    <h1><span className='text-primary text-3xl'>Currently,</span> there are no appointments scheduled</h1>
                </div>
            ) : (
                userAppoinments.map((item, index) => (
                    <div className='my-3 grid grid-cols-1 sm:grid-cols-[auto_3fr_1fr] gap-4 py-4 border-2  px-4 rounded-lg shadow-sm' style={{
                        borderColor: `var(--borderColor)`,
                    }}>
                        <div className='flex justify-center'>
                            <img className='w-32 h-32 object-cover rounded-lg' src={item.doctorPhoto} alt={item.doctorName} />
                        </div>

                        <div className='flex-1 text-sm'>
                            <p className='font-bold text-lg my-1'>{item.doctorName}</p>
                            <p className='mb-1 font-bold flex items-center gap-1'>
                                Approval Status:
                                <span className={`py-0.5 px-2 border-2 text-xs rounded-full ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </p>
                            <p className='text-sm font-medium mb-1 '>
                                Date & Time: {formatDate(item.date)} | {item.time}
                            </p>
                            <p className='text-sm font-bold mb-1 opacity-98'>
                                Payment: <span className={`text-xs border-2 rounded-full px-1.5 py-0.5 ${getPaymentColor(item.payment)}`}>
                                    {item.payment}
                                </span>
                            </p>
                            <p className='mb-1 opacity-95 font-medium'>
                                Description: {item.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 items-end justify-center">
                            {item.status === 'pending' ? (
                                <Button className="w-full py-2 bg-yellow-500 text-white hover:bg-yellow-600" disabled>
                                    Doctor Approval Pending
                                </Button>
                            ) : item.status === 'accepted' ? (
                                item.payment === 'unpaid' ? (
                                    <Button onClick={() => handlePayment(item._id)} className="w-full py-2">
                                        Pay Now
                                    </Button>
                                ) : (
                                    <Button className="w-full py-2 bg-green-500 text-white hover:bg-green-600" disabled>
                                        Payment Completed
                                    </Button>
                                )
                            ) : (
                                <Button className="w-full py-2 bg-red-500 text-white" disabled>
                                    Appointment Canceled
                                </Button>
                            )}

                            {item.status === 'cancelled' || item.payment === 'paid' ? (
                                <Button className="w-full py-2" variant="destructive" disabled>
                                    {item.payment === 'paid' ? 'Appointment Completed' : 'Appointment Canceled'}
                                </Button>
                            ) : (
                                <Button className="w-full py-2" variant="destructive" onClick={() => cancelAppoinment(item._id)}>
                                    Cancel Appointment
                                </Button>
                            )}
                        </div>

                    </div>
                )))}
        </div>
    )
}

export default UserAppoinments
