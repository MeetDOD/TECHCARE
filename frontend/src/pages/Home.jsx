import { useTheme } from '@/components/ui/themeprovider';
import Hero from '../home/Hero';
import Categories from '../snippets/Categories';
import Doctors from '../snippets/Doctors';
import React from 'react';
import NewsAndFeeds from '@/home/NewsAndFeeds';

const Home = () => {
    const { theme } = useTheme();

    return (
        <div>
            {theme === 'dark' ? (
                <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ffffff33_1px,#111827_1px)] bg-[size:20px_20px]"></div>
            ) : (
                <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1.5px)] [background-size:16px_16px]"></div>
            )}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(37,99,235,0.25)_0,rgba(37,99,235,0)_50%,rgba(37,99,235,0)_100%)]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(37,99,235,0.5)] opacity-50 blur-[80px]"></div></div>
            <Hero />
            <Categories />
            <Doctors />
            <NewsAndFeeds />
        </div>
    );
};

export default Home;
