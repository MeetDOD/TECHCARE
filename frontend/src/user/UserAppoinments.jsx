import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { toast } from 'sonner';

const UserAppoinments = () => {

    const [userAppoinments, setuserappoinments] = useState([]);

    const fetchUserAppoinments = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            };
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointment/getpatientappointment`, { headers });
            setuserappoinments(res.data.data)
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

            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=''>
            <p className='font-semibold text-lg'>My Appoinments</p>
            {userAppoinments.map((item, index) => (
                <div className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{
                    borderColor: `var(--borderColor)`,
                }}>
                    <div>
                        <img className='w-32 rounded-lg' src={item.doctorPhoto} alt={item.doctorName} />
                    </div>
                    <div className='flex-1 text-sm'>
                        <p className='font-bold my-1'>{item.doctorName}</p>
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
                        {item.status === 'cancelled' ? (
                            <Button className="sm:min-w-48 py-2" disabled>
                                Not Paid
                            </Button>
                        ) : (
                            <Button className="sm:min-w-48 py-2">
                                Pay Now
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
            ))}
        </div>
    )
}

export default UserAppoinments
