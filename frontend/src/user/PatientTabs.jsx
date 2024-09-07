import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserProfile from "./UserProfile"
import UserAppointments from './UserAppoinments'
import { Button } from '@/components/ui/button'

const PatientTabs = () => {
    return (
        <div>
            <Tabs defaultValue="profile" className="overflow-hidden">
                <TabsList className="my-5 gap-2 py-2 flex justify-center flex-1 items-center " style={{
                    backgroundColor: `var(--background-color)`,
                }} >
                    <TabsTrigger className="py-2" value="profile">My Profile</TabsTrigger>
                    <TabsTrigger className="py-2" value="appointments">My Appointments</TabsTrigger>
                    <TabsTrigger className="py-2" value="logout"><Button variant="destructive">Logout</Button></TabsTrigger>
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
