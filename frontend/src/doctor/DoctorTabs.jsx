import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import DoctorProfile from './DoctorProfile'
import DoctorAppoinments from './DoctorAppoinments'
import { useNavigate } from 'react-router-dom'
import { useResetRecoilState } from 'recoil'
import { doctorState, doctortokenState } from '@/store/atoms/userauth'
import { toast } from 'sonner'

const DoctorTabs = () => {
    const resetDoctorToken = useResetRecoilState(doctortokenState);
    const resetDoctor = useResetRecoilState(doctorState);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("doctortoken");
        localStorage.removeItem("doctor");
        resetDoctorToken();
        resetDoctor();
        toast.success("Logged out successfully");
        navigate("/login");
    };
    return (
        <div>
            <Tabs defaultValue="profile" className="overflow-hidden">
                <TabsList className="my-5 gap-2 py-2 flex justify-center flex-1 items-center " style={{
                    backgroundColor: `var(--background-color)`,
                }} >
                    <TabsTrigger className="py-2" value="profile">My Profile</TabsTrigger>
                    <TabsTrigger className="py-2" value="appointments">Appointments Books</TabsTrigger>
                    <Button variant="destructive" onClick={handleLogout} className="py-2 mx-2" >Logout</Button>
                </TabsList>

                <TabsContent value="profile" className="flex flex-col justify-center items-center">
                    <DoctorProfile />
                </TabsContent>
                <TabsContent value="appointments">
                    <DoctorAppoinments />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DoctorTabs
