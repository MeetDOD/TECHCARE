import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

const ResponsiveNavbar = ({ open }) => {
    return (
        <AnimatePresence mode='wait' >
            {
                open && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                        className='absolute left-0 w-full h-screen z-50' style={{
                            backgroundColor: `var(--nav-scroll)`,
                        }}
                    >
                        <div className='text-lg font-semibold py-10 m-6 rounded-3xl '>
                            <ul className='flex flex-col justify-center items-center gap-10'>
                                <li className='transition-transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>Home</li>
                                <li className='transition-transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>About</li>
                                <li className='transition-transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>Service</li>
                                <li className='transition-transform ease-in-out delay-150 hover:-translate-y-1 hover:scale-110'>Plans</li>
                            </ul>
                            <Link to="/register">
                                <Button className="w-full my-5 py-6 text-lg">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="w-full py-6 border text-lg" variant="ghost">Register</Button>
                            </Link>
                        </div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default ResponsiveNavbar
