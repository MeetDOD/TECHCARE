import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import doc1 from '../assets/Hero/doc1.png';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/components/ui/themeprovider';

const Hero = () => {

    const navigate = useNavigate();
    const { theme } = useTheme();

    function handleClick() {
        navigate("/doctors");
    }

    return (
        <div className="overflow-hidden my-20">
            {theme === 'dark' ? (
                <div className="absolute inset-0 -z-10 h-screen bg-[radial-gradient(#ffffff33_1px,#111827_1px)] bg-[size:20px_20px]"></div>
            ) : (
                <div className="absolute inset-5 -z-10 h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1.5px)] [background-size:16px_16px]"></div>
            )}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(37,99,235,0.25)_0,rgba(37,99,235,0)_50%,rgba(37,99,235,0)_100%)]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(37,99,235,0.5)] opacity-50 blur-[80px]"></div></div>

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
                            <Button onClick={handleClick} className="px-8 py-6 shadow-md">Book Now</Button>
                            <Button onClick={handleClick} variant="ghost" className="px-8 py-6 border shadow-sm">
                                View Doctors
                            </Button>
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
