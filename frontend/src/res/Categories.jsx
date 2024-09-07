import React from 'react'
import { Link } from 'react-router-dom'
import cat1 from "../assets/categories/cat1.png"
import cat2 from "../assets/categories/cat2.png"
import cat3 from "../assets/categories/cat3.png"
import cat4 from "../assets/categories/cat4.png"
import cat5 from "../assets/categories/cat5.png"
import cat6 from "../assets/categories/cat6.png"

const special = [
    {
        name: "Period doubts or Pregnancy",
        icon: cat1
    },
    {
        name: "Acne, pimple or skin issues",
        icon: cat2
    },
    {
        name: "Performance issues in bed",
        icon: cat3
    },
    {
        name: "Cold, cough or fever",
        icon: cat4
    },
    {
        name: "Child not feeling well",
        icon: cat5
    },
    {
        name: "Depression or anxiety",
        icon: cat6
    }
]

const Categories = () => {
    return (
        <div className='flex flex-col items-center gap-5 py-16 px-4'>
            <h1 className='text-2xl md:text-3xl font-bold text-center'>
                Find by <span className='text-primary'>Doctors Speciality</span>
            </h1>
            <p className='w-1/2 text-center text-lg opacity-90'>
                Private online consultations with verified doctors in all specialties
            </p>
            <div className='flex flex-wrap justify-center gap-6 pt-5 w-full'>
                {special.map((item, index) => (
                    <Link
                        key={index}
                        className='flex flex-col items-center text-xs sm:text-sm cursor-pointer transition duration-300 hover:-translate-y-1'
                        to={`/doctors/${item.name}`}
                    >
                        <div className='flex flex-col items-center'>
                            <img
                                src={item.icon}
                                alt={item.name}
                                className='w-20 sm:w-24 md:w-28 mb-2'
                            />
                            <p className='w-2/3 text-center font-semibold'>{item.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
