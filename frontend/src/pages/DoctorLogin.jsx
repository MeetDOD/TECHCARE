import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { doctorlogin } from '@/apis/doctorapi';
import { doctorState, doctortokenState } from '@/store/atoms/userauth';
import { useSetRecoilState } from 'recoil';

const DoctorLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setDoctorToken = useSetRecoilState(doctortokenState);
    const setDoctor = useSetRecoilState(doctorState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            const res = await doctorlogin({ email, password });
            if (res.status === 200 && res.data.token) {
                toast.success('Login successful');
                localStorage.setItem('doctortoken', res.data.token);
                localStorage.setItem('doctor', JSON.stringify(res.data.Doctor));
                setDoctorToken(res.data.token);
                setDoctor(res.data.Doctor);
                navigate('/');
            } else if (res.data.message) {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error('Invalid email or password');
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={handleLogin}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm shadow-md border' style={{
                borderColor: `var(--borderColor)`,
            }} >
                <p className='text-2xl font-bold'>Welcome Doctor</p>
                <p className='text-sm leading-tight mb-1 opacity-95'>Not a doctor ? <Link to="/login"><span className='text-primary font-semibold'> Login Here</span></Link></p>

                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Label htmlFor="password">Password</Label>
                <div className="w-full relative">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pr-10"
                        required
                    />
                    {showPassword ? (
                        <FaEye onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                    ) : (
                        <FaEyeSlash onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                    )}
                </div>

                <Button className="w-full mt-4" type="submit">Login</Button>
                <Button variant="ghost" className="border w-full" onClick={() => navigate("/doctorregister")}>Register</Button>
            </div>
        </form>
    );
};

export default DoctorLogin;
