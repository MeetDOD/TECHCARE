import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm shadow-md border' style={{
                borderColor: `var(--borderColor)`,
            }}>
                <p className='text-2xl font-bold'>Create Account</p>
                <p className='text-lg leading-tight mb-1'>Create Account to book appointment</p>

                <Label htmlFor="name">Full Name</Label>
                <Input type="text" placeholder="Enter Your Full Name" />

                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="Enter Your Email" />

                <Label htmlFor="password">Create Password</Label>
                <div className="w-full relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Your Password"
                        className="w-full pr-10"
                    />
                    {showPassword ?
                        <FaEye onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                        :
                        <FaEyeSlash onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                    }
                </div>

                <Button className="w-full mt-4">Register</Button>
                <Button variant="ghost" className="border w-full" onClick={() => navigate("/login")}>Login</Button>
            </div>
        </form>
    )
}

export default Register;
