import React from 'react';
import { Button } from '@/components/ui/button';
import doc from "../assets/demo/doc.png";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUserEdit } from "react-icons/fa";
import { useRecoilValue } from 'recoil';
import { doctorState } from '@/store/atoms/userauth';

const DoctorProfile = () => {

    const doctor = useRecoilValue(doctorState);

    return (
        <div>
            <form className='mb-5'>
                <div className='flex flex-col gap-3 m-auto items-start justify-center p-8 min-w-[340px] sm:min-w-96 rounded-xl shadow-md border' style={{
                    borderColor: `var(--borderColor)`,
                }}>
                    <div className="gap-4 mx-auto flex flex-col items-center">
                        <img
                            src={doctor.profilePhoto}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-2 shadow-sm object-cover"
                        />
                        <h2 className="text-2xl font-semibold">{doctor.firstName}'s Profile</h2>
                    </div>
                    <div className="gap-1.5 mt-2">
                        <p className="font-medium">
                            First Name: <span className='opacity-90'>{doctor.firstName}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Last Name: <span className='opacity-90'>{doctor.lastName}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Email Id: <span className='opacity-90'>{doctor.email}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Password: <span className='opacity-90'> ******</span>
                        </p>
                    </div>
                    <Drawer >
                        <DrawerTrigger className="mt-4 w-full text-white hover:opacity-90 bg-primary rounded-lg py-2" >Edit Profile</DrawerTrigger>
                        <DrawerContent style={{
                            backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)`
                        }}>
                            <div className="mx-auto w-full max-w-sm text-start">
                                <DrawerHeader >
                                    <DrawerTitle className="font-semibold mt-2 flex items-center gap-1.5" ><FaUserEdit size={25} />Edit your profile</DrawerTitle>
                                </DrawerHeader>
                                <div className="mb-4 px-4 ">
                                    <Label htmlFor="firstname" className="text-sm font-medium ">
                                        First Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="firstname"
                                        placeholder="Enter your first name"
                                        className="mt-1  rounded-md"
                                    />
                                </div>

                                <div className="mb-4 px-4">
                                    <Label htmlFor="lastname" className="text-sm font-medium ">
                                        Last Name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="lastname"
                                        placeholder="Enter your last name"
                                        className="mt-1 rounded-md"
                                    />
                                </div>

                                <div className="mb-4 px-4">
                                    <Label htmlFor="email" className="text-sm font-medium ">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        className="mt-1 rounded-md"
                                    />
                                </div>

                                <div className="mb-4 px-4 ">
                                    <Label htmlFor="password" className="block text-sm font-medium ">
                                        Password
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        className="mt-1 rounded-md"
                                    />
                                </div>
                                <DrawerFooter>
                                    <Button>Save</Button>
                                    <DrawerClose asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </form>

        </div>
    );
};

export default DoctorProfile;
