import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getalldoctors } from '@/apis/doctorapi';
import { Skeleton } from '@/components/ui/skeleton';

const Doctors = () => {
    const [doctorList, setDoctorList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            const res = await getalldoctors();
            if (res.status === 200) {
                setDoctorList(res.data.doctors);
            }
            setLoading(false);
        };
        fetchDoctors();
        document.title = "TECHCARE | ALL DOCTORS";
    }, []);

    return (
        <div>
            <div className='flex flex-col items-center gap-5 my-12 px-4'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Popular <span className='text-primary'>Doctors</span>
                </h1>
                <p className='text-center text-lg opacity-90'>
                    Private online consultations with verified doctors in all specialties
                </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
                {loading ? (
                    Array.from({ length: 8 }).map((index) => (
                        <div key={index} className='flex flex-col justify-between border-[1px] rounded-md p-3 shadow-lg' style={{ borderColor: `var(--borderColor)` }}>
                            <Skeleton className="h-[200px] w-full rounded-lg" />
                            <div className='mt-3 flex flex-col gap-1'>
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-10 w-full mt-2" />
                            </div>
                        </div>
                    ))
                ) : (
                    doctorList.map((item, index) => (
                        <Link
                            to={`/doctordetail/${item._id}`}
                            onClick={() => scrollTo(0, 0)}
                            key={index}
                            className='flex flex-col justify-between border-[1px] rounded-md p-3 shadow-lg transition duration-300 hover:-translate-y-2'
                            style={{ borderColor: `var(--borderColor)` }}
                        >
                            <img
                                className='h-[200px] w-full object-cover rounded-lg'
                                src={item.profilePhoto}
                                alt={item.firstName}
                                width={500}
                                height={200}
                            />
                            <div className='mt-3 items-baseline flex flex-col gap-1'>
                                <h2 className='text-xs mb-1 flex flex-row items-center gap-1 text-green-400'>
                                    <div className="w-2 h-2 bg-green-400 rounded-full border border-green-600"></div>
                                    Available
                                </h2>
                                <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary'>
                                    {item.specialization}
                                </h2>
                                <h2 className='font-bold'>{item.firstName} {item.lastName}</h2>
                                <h2 className='text-sm'>Experience of {item.experience} years</h2>
                                <Button className="w-full mt-2">Book Now</Button>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Doctors;
