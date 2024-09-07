import React from 'react'
import doc from "../assets/demo/doc.png";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const doctorList = [
    {
        name: "Dr. Ramesh yadav",
        photo: doc,
        category: "Skin Care",
        experience: "2 Years"
    },
    {
        name: "Dr. Ramesh yadav",
        photo: doc,
        category: "Skin Care",
        experience: "2 Years"
    },
    {
        name: "Dr. Ramesh yadav",
        photo: doc,
        category: "Skin Care",
        experience: "2 Years"
    },
    {
        name: "Dr. Ramesh yadav",
        photo: doc,
        category: "Skin Care",
        experience: "2 Years"
    }
];

const RelatedDoctor = () => {
    return (
        <div className='mb-10'>
            <div className='flex flex-col items-center gap-5 px-4 mb-10'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Related <span className='text-primary'>Specialties</span>
                </h1>
                <p className='w-1/2 text-center text-lg opacity-90'>
                    Explore other doctors with the same specialization
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
                {doctorList.map((item, index) => (
                    <Link to="/doctordetail" key={index} className='border-[1px] rounded-md p-3 shadow-lg transition duration-300 hover:-translate-y-2' style={{
                        borderColor: `var(--borderColor)`,
                    }}>
                        <img className='h-[200px] w-full object-cover rounded-lg' src={item.photo} alt={item.name} width={500} height={200} />
                        <div className='mt-3 items-baseline flex flex-col gap-1'>
                            <h2 className='text-xs mb-1 flex flex-row items-center gap-1 text-green-400'>
                                <div className="w-2 h-2 bg-green-400 rounded-full border border-green-600"></div>
                                Available
                            </h2>
                            <h2 className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary'>{item.category}</h2>
                            <h2 className='font-bold'>{item.name}</h2>
                            <h2 className='text-sm'>Experience of {item.experience}</h2>
                            <Button className="w-full mt-2">
                                Book Now
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default RelatedDoctor
