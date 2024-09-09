import React, { useEffect, useState } from 'react';
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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { doctorState } from '@/store/atoms/userauth';
import { IoIosAddCircleOutline } from "react-icons/io";
import { doctorupdateProfile } from '@/apis/doctorapi';
import { toast } from 'sonner';

const DoctorProfile = () => {

    const doctor = useRecoilValue(doctorState);
    const setDoctor = useSetRecoilState(doctorState);

    const [profilePhoto, setprofilePhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(doctor.photo || "");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [gender, setgender] = useState("");
    const [datOfBirth, setdateofbirth] = useState("");
    const [residentialAddress, setresidentialAddress] = useState("");
    const [hospitalAddress, sethospitalAddress] = useState("");
    const [specialization, setspecialization] = useState("");
    const [experience, setexperience] = useState("");
    const [hospital, sethospital] = useState("");
    const [availableDay, setavailableDay] = useState("");
    const [certificate, setcertificate] = useState("");
    const [languageSpoken, setlanguageSpoken] = useState("");
    const [consultationFee, setconsultationFee] = useState("");
    const [medicalAchievements, setmedicalAchievements] = useState("");

    useEffect(() => {
        if (doctor) {
            setfirstName(doctor.firstName);
            setlastName(doctor.lastName);
        }
    }, [doctor]);

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
        formData.append('contactNo', contactNo);
        formData.append('gender', gender);
        formData.append('datOfBirth', datOfBirth);
        formData.append('residentialAddress', residentialAddress);
        formData.append('hospitalAddress', hospitalAddress);
        formData.append('specialization', specialization);
        formData.append('experience', experience);
        formData.append('hospital', hospital);
        formData.append('availableDay', availableDay);
        formData.append('certificate', certificate);
        formData.append('languageSpoken', languageSpoken);
        formData.append('consultationFee', consultationFee);
        formData.append('medicalAchievements', medicalAchievements);

        try {
            const response = await doctorupdateProfile(formData);
            console.log(response);
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                const updatedDoctor = response.data.Doctor;
                localStorage.setItem('doctor', JSON.stringify(updatedDoctor));
                setDoctor(updatedDoctor);
            } else {
                toast.error("Error updating profile");
            }
        } catch (error) {
            toast.error("Please fill properly");
            console.log(error);
        }
    };

    return (
        <div>
            <form className='mb-5'>
                <div className='flex flex-col gap-3 m-auto items-start justify-center p-8 min-w-[340px] sm:min-w-96 rounded-xl shadow-md border' style={{
                    borderColor: `var(--borderColor)`,
                }}>
                    <div className="gap-4 mx-auto flex flex-col items-center">
                        <img
                            src={doctor.photo}
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
                                <div className="grid grid-cols-3 gap-4 px-4 mb-4">
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
                                        <Label htmlFor="contactNo" className="text-sm font-medium">
                                            Phone Number
                                        </Label>
                                        <Input
                                            type="number"
                                            id="contactNo"
                                            value={contactNo}
                                            onChange={(e) => setcontactNo(e.target.value)}
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
                                    <div>
                                        <Label htmlFor="datOfBirth" className="text-sm font-medium">
                                            Birth Date
                                        </Label>
                                        <Input
                                            type="date"
                                            id="datOfBirth"
                                            value={datOfBirth}
                                            onChange={(e) => setdateofbirth(e.target.value)}
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="residentialAddress" className="text-sm font-medium">
                                            Residential Address
                                        </Label>
                                        <Input
                                            type="text"
                                            id="residentialAddress"
                                            value={residentialAddress}
                                            onChange={(e) => setresidentialAddress(e.target.value)}
                                            placeholder="Enter your residential address"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="hospitalAddress" className="text-sm font-medium">
                                            Hospital Address
                                        </Label>
                                        <Input
                                            type="text"
                                            id="hospitalAddress"
                                            value={hospitalAddress}
                                            onChange={(e) => sethospitalAddress(e.target.value)}
                                            placeholder="Enter your hospital address"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="specialization" className="text-sm font-medium">
                                            Specialization
                                        </Label>
                                        <Input
                                            type="text"
                                            id="specialization"
                                            value={specialization}
                                            onChange={(e) => setspecialization(e.target.value)}
                                            placeholder="Enter your specialization"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="experience" className="text-sm font-medium">
                                            Experience
                                        </Label>
                                        <Input
                                            type="number"
                                            id="experience"
                                            value={experience}
                                            onChange={(e) => setexperience(e.target.value)}
                                            placeholder="Enter your experience"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="hospital" className="text-sm font-medium">
                                            Hospital
                                        </Label>
                                        <Input
                                            type="text"
                                            id="hospital"
                                            value={hospital}
                                            onChange={(e) => sethospital(e.target.value)}
                                            placeholder="Enter your hospital"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="availableDay" className="text-sm font-medium">
                                            Available Days
                                        </Label>
                                        <Input
                                            type="text"
                                            id="availableDay"
                                            value={availableDay}
                                            onChange={(e) => setavailableDay(e.target.value)}
                                            placeholder="Enter your available day"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="certificate" className="text-sm font-medium">
                                            Certificate
                                        </Label>
                                        <Input
                                            type="number"
                                            id="certificate"
                                            value={certificate}
                                            onChange={(e) => setcertificate(e.target.value)}
                                            placeholder="Enter your certificate"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="languageSpoken" className="text-sm font-medium">
                                            Language Spoken
                                        </Label>
                                        <Input
                                            type="text"
                                            id="languageSpoken"
                                            value={languageSpoken}
                                            onChange={(e) => setlanguageSpoken(e.target.value)}
                                            placeholder="Enter language spoken"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="consultationFee" className="text-sm font-medium">
                                            Consultation Fee
                                        </Label>
                                        <Input
                                            type="number"
                                            id="consultationFee"
                                            value={consultationFee}
                                            onChange={(e) => setconsultationFee(e.target.value)}
                                            placeholder="Enter your consultation fee"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="medicalAchievements" className="text-sm font-medium">
                                            Medical Achievements
                                        </Label>
                                        <Input
                                            type="text"
                                            id="medicalAchievements"
                                            value={medicalAchievements}
                                            onChange={(e) => setmedicalAchievements(e.target.value)}
                                            placeholder="Enter your medical achievements"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
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

export default DoctorProfile;
