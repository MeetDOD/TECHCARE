import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
import { userState } from '@/store/atoms/userauth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast } from 'sonner';
import { userupdateProfile } from '@/apis/userapi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const user = useRecoilValue(userState);
    const setUser = useSetRecoilState(userState);
    const userId = user._id;
    const [profilePhoto, setprofilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(user.photo || "");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [gender, setgender] = useState("");
    const [dateofbirth, setdateofbirth] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setfirstName(user.firstName);
            setlastName(user.lastName);
        }
        document.title = `TECHCARE | ${user.firstName.toUpperCase()}'s PROFILE`;
    }, [user]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setprofilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('phoneno', phoneno);
        formData.append('gender', gender);
        formData.append('dateofbirth', dateofbirth);

        try {
            const response = await userupdateProfile(formData);
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                const updatedUser = response.data.user;
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
            } else {
                toast.error("Error updating profile");
            }
        } catch (error) {
            toast.error("Please fill properly");
        }
    };




    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getuserbyid/${userId}`, { headers });
                const user = response.data.user;
                setprofilePhoto(user.photo || "");
                setfirstName(user.firstName || "");
                setlastName(user.lastName || "");
                setphoneno(user.phoneno || "");
                setgender(user.gender || "");
                const formattedDate = new Date(user.dateofbirth).toISOString().slice(0, 10);
                setdateofbirth(formattedDate);
            } catch (error) {
                toast.error("Error fetching user details");
            }
        };
        if (userId) {
            fetchDoctorData();
        }
    }, []);

    return (
        <div>
            <form className='mb-10'>
                <div className='flex flex-col gap-3 m-auto items-start justify-center p-8 min-w-[340px] sm:min-w-96 rounded-xl shadow-md border' style={{
                    borderColor: `var(--borderColor)`,
                }}>
                    <div className="gap-4 mx-auto flex flex-col items-center">
                        <img
                            src={user.photo}
                            alt={user.firstName}
                            className="w-24 h-24 rounded-full border-2 object-cover"
                        />
                        <h2 className="text-2xl font-semibold">{user.firstName}'s Profile</h2>
                    </div>
                    <div className="gap-1.5 mt-2">
                        <p className="font-medium">
                            First Name: <span className='opacity-90'>{user.firstName}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Last Name: <span className='opacity-90'>{user.lastName}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Email Id: <span className='opacity-90'>{user.email}</span>
                        </p>
                    </div>
                    <div className="gap-1.5">
                        <p className="font-medium">
                            Password: <span className='opacity-90'>*****</span>
                        </p>
                    </div>


                    <Drawer>
                        <DrawerTrigger className="mt-4 w-full text-white hover:opacity-90 bg-primary rounded-lg py-2">
                            Edit Profile
                        </DrawerTrigger>
                        <DrawerContent
                            style={{
                                backgroundColor: `var(--background-color)`,
                                color: `var(--text-color)`,
                                borderColor: `var(--borderColor)`,
                            }}
                        >
                            <div className="mx-auto w-full max-w-lg text-start">
                                <DrawerHeader>
                                    <DrawerTitle className="font-semibold mt-2 flex items-center gap-1.5">
                                        <FaUserEdit size={25} /> Edit your profile
                                    </DrawerTitle>
                                </DrawerHeader>
                                <div className="gap-4 mx-auto flex flex-row mb-3 items-center">
                                    <img
                                        src={photoPreview}
                                        alt="Profile Preview"
                                        className="w-24 h-24 rounded-full border-2 shadow-sm object-cover"
                                    />
                                    <div
                                        className="w-24 h-24 rounded-full border-2 shadow-sm border-dashed flex items-center justify-center"
                                        style={{
                                            borderColor: `var(--borderColor)`,
                                        }}
                                    >
                                        <input
                                            type="file"
                                            id="photo"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="absolute w-10 z-10 opacity-0"
                                        />
                                        <IoIosAddCircleOutline size={30} className="opacity-90 cursor-pointer" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 px-4 mb-4">
                                    <div>
                                        <Label htmlFor="firstname" className="text-sm font-medium">
                                            First Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="firstname"
                                            value={firstName}
                                            onChange={(e) => setfirstName(e.target.value)}
                                            placeholder="Enter your first name"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastname" className="text-sm font-medium">
                                            Last Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="lastname"
                                            value={lastName}
                                            onChange={(e) => setlastName(e.target.value)}
                                            placeholder="Enter your last name"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneno" className="text-sm font-medium">
                                            Phone Number
                                        </Label>
                                        <Input
                                            type="number"
                                            id="phoneno"
                                            value={phoneno}
                                            onChange={(e) => setphoneno(e.target.value)}
                                            placeholder="Enter your phone number"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gender" className="text-sm font-medium">
                                            Gender
                                        </Label>
                                        <Input
                                            type="text"
                                            id="gender"
                                            value={gender}
                                            onChange={(e) => setgender(e.target.value)}
                                            placeholder="Enter your gender"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 px-4">
                                    <Label htmlFor="dateofbirth" className="block text-sm font-medium">
                                        Birth Date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="dateofbirth"
                                        value={dateofbirth}
                                        onChange={(e) => setdateofbirth(e.target.value)}
                                        className="mt-1 rounded-md"
                                        required
                                    />
                                </div>
                                <DrawerFooter>
                                    <Button onClick={handleSubmit}>Save</Button>
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

export default UserProfile;