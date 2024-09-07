import React from 'react'
import doc from "../assets/demo/doc.png"
import { Button } from '@/components/ui/button'

const DoctorAppoinments = () => {
    return (
        <div>
            <p className='font-semibold text-lg'>My Appoinments</p>
            <div className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{
                borderColor: `var(--borderColor)`,
            }}>
                <div>
                    <img className='w-32 rounded-lg' src={doc} alt="Dr. Ramesh yadav" />
                </div>
                <div className='flex-1 text-sm'>
                    <p className='font-semibold my-1'>Dr. Ramesh Yadav</p>
                    <p className='font-medium mb-1'>8 Years</p>
                    <p className='mb-1'>Skin Care</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Date & Time:</span> 07-09-2024 | 9:00 AM</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Fees Paid:</span> $ 20</p>
                </div>
                <div className='flex flex-col gap-2 justify-end my-auto'>
                    <Button className="sm:min-w-48 py-2" >
                        Pay Now
                    </Button>
                    <Button className="sm:min-w-48 py-2" variant="destructive">
                        Cancel Appoinment
                    </Button>
                </div>
            </div>

            <div className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{
                borderColor: `var(--borderColor)`,
            }}>
                <div>
                    <img className='w-32 rounded-lg' src={doc} alt="Dr. Ramesh yadav" />
                </div>
                <div className='flex-1 text-sm'>
                    <p className='font-semibold my-1'>Dr. Ramesh Yadav</p>
                    <p className='font-medium mb-1'>8 Years</p>
                    <p className='mb-1'>Skin Care</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Date & Time:</span> 07-09-2024 | 9:00 AM</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Fees Paid:</span> $ 20</p>
                </div>
                <div className='flex flex-col gap-2 justify-end my-auto'>
                    <Button className="sm:min-w-48 py-2" >
                        Pay Now
                    </Button>
                    <Button className="sm:min-w-48 py-2" variant="destructive">
                        Cancel Appoinment
                    </Button>
                </div>
            </div>

            <div className='my-5 grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border px-2 rounded-lg' style={{
                borderColor: `var(--borderColor)`,
            }}>
                <div>
                    <img className='w-32 rounded-lg' src={doc} alt="Dr. Ramesh yadav" />
                </div>
                <div className='flex-1 text-sm'>
                    <p className='font-semibold my-1'>Dr. Ramesh Yadav</p>
                    <p className='font-medium mb-1'>8 Years</p>
                    <p className='mb-1'>Skin Care</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Date & Time:</span> 07-09-2024 | 9:00 AM</p>
                    <p className='text-xs mb-1'><span className='text-sm font-medium'>Fees Paid:</span> $ 20</p>
                </div>
                <div className='flex flex-col gap-2 justify-end my-auto'>
                    <Button className="sm:min-w-48 py-2" >
                        Pay Now
                    </Button>
                    <Button className="sm:min-w-48 py-2" variant="destructive">
                        Cancel Appoinment
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DoctorAppoinments
