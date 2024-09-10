import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import doc1 from '../assets/Hero/doc1.png';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="overflow-hidden my-20">
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex my-5 gap-2 items-center border border-yellow-300 bg-yellow-50 rounded-lg px-3 py-1 w-fit shadow-md hover:shadow-lg hover:-translate-y-1 transition group">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600"></div>
                            <p className="font-medium text-sm text-yellow-600">God is good, God is Great</p>
                            <FaArrowRight color="#ca8a04" className="group-hover:translate-x-1 transition duration-300" />
                        </div>

                        <div className="hidden lg:flex gap-5 py-5">
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm ">
                                <FaArrowRight className="opacity-90 -mr-1" /> Verified Doctors
                            </div>
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm">
                                <FaArrowRight className="opacity-90 -mr-1" /> Digital Prescription
                            </div>
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm">
                                <FaArrowRight className="opacity-90 -mr-1" /> Video Call
                            </div>
                        </div>

                        <div className="py-5">
                            <h1 className="mb-2 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-snug leading-normal">
                                Instant appointment with doctors
                            </h1>
                            <p className="text-base sm:text-lg md:text-lg lg:text-xl mt-4 font-semibold opacity-95">
                                Consult top doctors online for any health concern
                                Private online consultations with verified doctors in all specialists
                            </p>
                        </div>

                        <div className="pt-10 flex flex-col gap-5 sm:flex-row">
                            <Link to="/doctors"><Button className="px-8 py-6 shadow-md">Book Now</Button></Link>
                            <Link to="/doctors">
                                <Button variant="ghost" className="px-8 py-6 border shadow-sm">
                                    View Doctors
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:block -ml-16 header-img-section">
                        <img src={doc1} alt="Document Preview" className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
