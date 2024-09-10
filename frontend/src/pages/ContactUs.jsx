import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import logo from '../assets/Hero/logo.png';
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <section class="py-24">
            <div class="mx-auto max-w-7xl">
                <div class="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
                    <div class="flex items-center lg:mb-0 mb-10">
                        <div class="w-full">
                            <h4 class="text-primary text-base font-medium leading-6 mb-2 lg:text-left text-center">Contact Us</h4>
                            <h2 class="text-3xl font-semibold  mb-7 lg:text-left text-center">Let us know and we’ll get back to you</h2>
                            <form>
                                <Label>Name</Label>
                                <Input type="text" className="my-2 mb-4" placeholder="Enter your name" />

                                <Label>Email</Label>
                                <Input type="email" className="my-2 mb-4" placeholder="Enter your email" />

                                <Label>Description</Label>
                                <Textarea placeholder="Type your message here..." className="my-2 mb-4" />

                                <Button className="w-full my-2">Submit</Button>
                            </form>
                        </div>
                    </div>
                    <div class="lg:max-w-xl w-full h-[500px] flex items-center justify-center  bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')] ">
                        <div>
                            <div class="lg:w-96 w-auto h-auto bg-white rounded-md shadow-xl lg:p-6 p-4">
                                <div className='flex flex-col justify-center items-center '>
                                    <img src={logo} alt="Logo" className="w-40 mb-7 mt-3" />
                                </div>
                                <div class="flex items-center mb-6">
                                    <MdOutlineEmail className='text-gray-800' size={30} />
                                    <h5 class="text-gray-800 text-base font-semibold ml-5">techcare@gmail.com</h5>
                                </div>
                                <a href="javascript:;" class="flex items-center mb-6">
                                    <FaGithub className='text-gray-800' size={30} />
                                    <h5 class="text-gray-800 text-base font-semibold ml-5">@MeetDOD @RAM909 @kashish567</h5>
                                </a>
                                <div class="flex items-center justify-center border-t border-gray-100 pt-6 gap-7">
                                    <a href="https://github.com/MeetDOD" target="_blank">
                                        <FaGithub className='text-gray-800 hover:-translate-y-1 transition-transform duration-300 hover:text-primary' size={30} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/meetdodiya" target="_blank">
                                        <FaLinkedin className='text-gray-800 hover:-translate-y-1 transition-transform duration-300 hover:text-primary' size={30} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactUs
