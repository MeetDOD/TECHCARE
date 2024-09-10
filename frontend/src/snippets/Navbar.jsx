import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/themeprovider';
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import logo from "../assets/Hero/logo.png"
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { doctorState, doctortokenState, loggedInState, tokenState, userState } from "../store/atoms/userauth";
import { toast } from 'sonner';
import { IoIosCloseCircleOutline } from "react-icons/io";

const Navbar = () => {

    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const isLoggedIn = useRecoilValue(loggedInState);
    const user = useRecoilValue(userState);
    const doctor = useRecoilValue(doctorState);
    const resetToken = useResetRecoilState(tokenState);
    const resetUser = useResetRecoilState(userState);
    const resetDoctorToken = useResetRecoilState(doctortokenState);
    const resetDoctor = useResetRecoilState(doctorState);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("doctortoken");
        localStorage.removeItem("doctor");

        resetToken();
        resetUser();
        resetDoctorToken();
        resetDoctor();

        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img src={logo} className='w-28 cursor-pointer' alt='TECHCARE' onClick={() => navigate("/")} />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to="/">
                    <li className='py-1 hover:bg-primary  hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Home</li>
                </NavLink>
                <NavLink to="/doctors">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Doctors</li>
                </NavLink>
                <NavLink to="/about">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>About</li>
                </NavLink>
                <NavLink to="/contact">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Contact</li>
                </NavLink>
                {isLoggedIn && (

                    <NavLink to="/map">
                        <li className='py-1 hover:bg-primary  hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Map</li>
                    </NavLink>
                )}
            </ul>
            <div className='flex items-center gap-4'>
                <Button size="icon" variant="ghost" className="border" onClick={toggleTheme} style={{
                    borderColor: `var(--borderColor)`,
                }}>
                    {theme === "dark" ? <BsFillMoonStarsFill className="h-5 w-5" /> : <BsFillSunFill className="h-4 w-4" />}
                </Button>
                {isLoggedIn ?
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        {user ?
                            <img className='w-10 h-10 rounded-full border object-cover"' src={user.photo} alt={user.firstName} style={{
                                borderColor: `var(--borderColor)`,
                            }} />
                            :
                            <img className='w-10 h-10 rounded-full border object-cover"' src={doctor.photo} alt={doctor.firstName} style={{
                                borderColor: `var(--borderColor)`,
                            }} />
                        }
                        <MdOutlineArrowDropDown size={25} className='-ml-3' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded-md flex flex-col gap-4 p-4 border shadow-md'>
                                {user ?
                                    <p onClick={() => navigate("/patientprofile")} className='hover:text-gray-900 cursor-pointer hover:-translate-y-1 transition duration-200'>User Profile</p>
                                    :
                                    <p onClick={() => navigate("/doctorprofile")} className='hover:text-gray-900 cursor-pointer hover:-translate-y-1 transition duration-200'>Doctor Profile</p>
                                }
                                <p onClick={handleLogout} className='hover:text-gray-900 cursor-pointer hover:-translate-y-1 transition duration-200'>Logout</p>
                            </div>
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate("/login")} className='bg-primary hover:bg-primary/90 text-white px-6 rounded-md py-2 font-semibold hidden md:block'>
                        Login/Signup
                    </button>
                }
                <button onClick={() => setShowMenu(true)} className='w-6 md:hidden'><GiHamburgerMenu size={25} /></button>
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all`} style={{
                    backgroundColor: `var(--nav-scroll)`,
                }}
                >
                    <div className='flex items-center justify-between px-5 py-6'>
                        <Link to='/'>
                            <img src={logo} onClick={() => setShowMenu(false)} className='w-28 cursor-pointer' alt='TECHCARE' />
                        </Link>
                        <button className='w-7' onClick={() => setShowMenu(false)}><IoIosCloseCircleOutline size={25} /></button>
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink to="/" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded-md inline-block">Home</p></NavLink>
                        <NavLink to="/doctors" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded-md inline-block">Doctors</p></NavLink>
                        <NavLink to="/about" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded-md inline-block">About</p></NavLink>
                        <NavLink to="/contact" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded-md inline-block">Contact</p></NavLink>
                        {isLoggedIn &&
                            <NavLink to="/map" onClick={() => setShowMenu(false)}><p className="px-4 py-2 rounded-md inline-block">Map</p></NavLink>
                        }
                        {!isLoggedIn &&
                            <button onClick={() => { navigate("/login"), setShowMenu(false) }} className='bg-primary w-full hover:bg-primary/90 text-white px-6 rounded-md py-2 font-semibold '>
                                Login/Signup
                            </button>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
