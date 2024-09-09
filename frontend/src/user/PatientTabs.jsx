import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "./UserProfile"
import UserAppointments from './UserAppoinments'
import { Button } from '@/components/ui/button'
import { useResetRecoilState } from 'recoil'
import { tokenState, userState } from '@/store/atoms/userauth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

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

    return (
        <div>
            <Tabs defaultValue="profile" className="overflow-hidden">
                <TabsList className="my-5 gap-2 py-2 flex justify-center flex-1 items-center " style={{
                    backgroundColor: `var(--background-color)`,
                }} >
                    <TabsTrigger className="py-2" value="profile">My Profile</TabsTrigger>
                    <TabsTrigger className="py-2" value="appointments">My Appointments</TabsTrigger>
                    <Button variant="destructive" onClick={handleLogout} className="py-2 mx-2" >Logout</Button>
                </TabsList>

                <TabsContent value="profile" className="flex flex-col justify-center items-center">
                    <UserProfile />
                </TabsContent>
                <TabsContent value="appointments">
                    <UserAppointments />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default PatientTabs
