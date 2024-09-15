import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "./UserProfile"
import UserAppointments from './UserAppoinments'
import { useResetRecoilState } from 'recoil'
import { tokenState, userState } from '@/store/atoms/userauth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import healthTips from "./healthTips";
import ChooseModel from './ChooseModel'

const PatientTabs = () => {
    const resetToken = useResetRecoilState(tokenState);
    const resetUser = useResetRecoilState(userState);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        resetToken();
        resetUser();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div>
            <Tabs defaultValue="profile" className="overflow-hidden">
                <TabsList className="my-5 gap-2 py-2 flex justify-center flex-1 items-center " style={{
                    backgroundColor: `var(--background-color)`,
                }} >
                    <TabsTrigger className="py-2" value="profile">Profile</TabsTrigger>
                    <TabsTrigger className="py-2" value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger className="py-2" value="aimodel" >Explore AI</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="flex flex-col justify-center items-center">
                    <UserProfile />
                </TabsContent>
                <TabsContent value="appointments">
                    <UserAppointments />
                </TabsContent>
                <TabsContent value="aimodel">
                    <ChooseModel />
                </TabsContent>
            </Tabs>
            <div>
                <Slider {...settings} className="relative">
                    {healthTips.map((tips, index) => (
                        <div key={index} className="p-3">
                            <div className="shadow-md w-fit flex flex-col text-center items-center p-3 rounded-xl border-2 border-primary bg-primary/20 h-28 justify-center">
                                <p className='font-semibold'>{tips}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default PatientTabs
