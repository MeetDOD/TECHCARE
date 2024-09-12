import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import { Skeleton } from "@/components/ui/skeleton";

const NewsAndFeeds = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const lastFetch = localStorage.getItem('lastFetch');
            const newsData = localStorage.getItem('newsData');
            const now = new Date().getTime();

            if (newsData && lastFetch && now - lastFetch < 24 * 60 * 60 * 1000) {
                setNews(JSON.parse(newsData));
                setLoading(false);
            } else {
                const options = {
                    method: 'POST',
                    url: 'https://newsnow.p.rapidapi.com/newsv2_top_news_cat',
                    headers: {
                        'x-rapidapi-key': `${import.meta.env.VITE_RAPID_API_KEY}`,
                        'x-rapidapi-host': 'newsnow.p.rapidapi.com',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        category: 'HEALTH',
                        location: '',
                        language: 'en',
                        page: 1
                    }
                };

                try {
                    const response = await axios.request(options);
                    const newsResponse = response.data.news;
                    setNews(newsResponse);
                    localStorage.setItem('newsData', JSON.stringify(newsResponse));
                    localStorage.setItem('lastFetch', now);
                    setLoading(false);
                } catch (error) {
                    setLoading(true);
                }
            }
        };

        fetchNews();
    }, []);

    return (
        <div>
            <div className='flex flex-col items-center gap-5 px-4 my-20'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Latest Health <span className='text-primary'>News</span>
                </h1>
                <p className='w-1/2 text-center text-lg opacity-90'>
                    Private online consultations with verified doctors in all specialties
                </p>
            </div>
            <section>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-10">
                    <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                        {loading ? (
                            Array.from({ length: 3 }).map((index) => (
                                <div key={index} className="w-full max-lg:max-w-xl lg:w-1/3 border shadow-lg rounded-2xl" style={{ borderColor: `var(--borderColor)` }}>
                                    <Skeleton className="w-full h-48 rounded-t-2xl" />
                                    <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl">
                                        <Skeleton className="h-6 w-32 mb-3" />
                                        <Skeleton className="h-16 w-full mb-5" />
                                        <Skeleton className="h-16 w-full mb-5" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            news.slice(0, 3).map((item, index) => (
                                <div key={index} className="w-full max-lg:max-w-xl lg:w-1/3 border shadow-lg rounded-2xl" style={{
                                    borderColor: `var(--borderColor)`,
                                }}>
                                    <div className="flex items-center">
                                        <img src={item.top_image} alt={item.title} className="rounded-t-2xl w-full h-48 object-cover" />
                                    </div>
                                    <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl">
                                        <span className="font-medium mb-3 block">{item.date.split(' ').slice(0, 4).join(' ')}</span>
                                        <h4 className="text-xl font-medium leading-8 mb-5">{item.title.slice(0, 50)}...</h4>
                                        <p className="mb-10">{item.text.slice(0, 200)}...</p>
                                        <a target='_blank' href={item.url} className="flex gap-2 items-center hover:-translate-y-1 transition group">
                                            <p className="cursor-pointer text-lg text-primary font-semibold">Read More</p>
                                            <FaArrowRight size={20} className="text-primary group-hover:translate-x-1 transition duration-300" />
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsAndFeeds;
