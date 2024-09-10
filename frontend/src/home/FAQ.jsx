import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndexLeft, setActiveIndexLeft] = useState(null);
    const [activeIndexRight, setActiveIndexRight] = useState(null);

    const toggleQuestionLeft = (index) => {
        setActiveIndexLeft(activeIndexLeft === index ? null : index);
        if (activeIndexRight !== null) {
            setActiveIndexRight(null);
        }
    };

    const toggleQuestionRight = (index) => {
        setActiveIndexRight(activeIndexRight === index ? null : index);
        if (activeIndexLeft !== null) {
            setActiveIndexLeft(null);
        }
    };

    const questionsLeft = [
        {
            id: 1,
            question: "What is the mode of the Hackathon?",
            answer: "VCET Hackathon’24 Code the cosmos will be held offline.",
        },
        {
            id: 2,
            question: "Who can participate?",
            answer:
                "Any UG student is welcome to participate in this event. While experienced coding and programming is a huge plus, teams will also need people with strong presentation skills and unique ideas.",
        },
        {
            id: 3,
            question: "Can a pass out student participate in the event?",
            answer:
                "No, every member of the team must be a current student of a university or a college. (Members from different colleges allowed).",
        },
        {
            id: 5,
            question: "How much is the entry fee and the last date for registration?",
            answer: "Entry fee is 500/- per head and the last date of registration is September 22, 2024."
        }
    ];

    const questionsRight = [
        {
            id: 7,
            question: "Will a dataset be provided?",
            answer: "No, the data has to be collected on your own."
        },
        {
            id: 9,
            question: "What is the selection criteria?",
            answer: "Innovation, Technology, Completion & Business Values are some of the criterias."
        },
        {
            id: 10,
            question: "When and where will the final results be announced?",
            answer: "Results will be announced at the end of the Final Pitching round."
        },
        {
            id: 11,
            question: "What is the cancellation policy like?",
            answer: "There is no cancellation policy and payment once done will not be refunded."
        }
    ];

    return (
        <div className='mb-10'>
            <div className='flex flex-col items-center gap-5 px-4 my-20'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Frequently Asked <span className='text-primary'>Questions</span>
                </h1>
                <p className='w-1/2 text-center text-lg opacity-90'>
                    Private online consultations with verified doctors in all specialties
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-y-8 md:gap-x-6 sectionMargin">
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsLeft.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg shadow-md"
                        >
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexLeft === index ? 'font-semibold' : 'font-medium'}`}
                                onClick={() => toggleQuestionLeft(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexLeft === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'}`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexLeft === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                style={{
                                    maxHeight: activeIndexLeft === index ? '200px' : '0',
                                    paddingTop: activeIndexLeft === index ? '1rem' : '0',
                                    paddingBottom: activeIndexLeft === index ? '1rem' : '0',
                                    opacity: activeIndexLeft === index ? '1' : '0',
                                }}
                            >
                                <div
                                    className="answer px-5 text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsRight.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg shadow-md"
                        >
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexRight === index ? 'font-semibold' : 'font-medium'}`}
                                onClick={() => toggleQuestionRight(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexRight === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'}`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexRight === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                style={{
                                    maxHeight: activeIndexRight === index ? '200px' : '0',
                                    paddingTop: activeIndexRight === index ? '1rem' : '0',
                                    paddingBottom: activeIndexRight === index ? '1rem' : '0',
                                    opacity: activeIndexRight === index ? '1' : '0',
                                }}
                            >
                                <div
                                    className="answer px-5 text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;