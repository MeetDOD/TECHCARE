import React from 'react';

const PaymentFailure = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6 md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-red-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M11.001 10h2v5h-2zm0-4h2v2h-2zm11 2c0-5.523-4.477-10-10-10S2 2.477 2 8a9.996 9.996 0 0 0 7.001 9.8L12 24l2.999-6.2A9.996 9.996 0 0 0 22 8zm-10 8c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Failed!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Unfortunately, there was an issue with your payment.
                    </p>
                    <p>Please try again later.</p>
                    <div className="py-10 text-center">
                        <a
                            href="/patientprofile"
                            className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3"
                        >
                            TRY AGAIN
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;
