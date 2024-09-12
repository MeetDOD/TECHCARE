import Hero from '../home/Hero';
import Categories from '../snippets/Categories';
import Doctors from '../snippets/Doctors';
import React, { useEffect } from 'react';
import NewsAndFeeds from '@/home/NewsAndFeeds';
import FAQ from '@/home/FAQ';

const Home = () => {
    useEffect(() => {
        document.title = "TECHCARE";
    }, []);
    return (
        <div>
            <Hero />
            <Categories />
            <Doctors />
            <NewsAndFeeds />
            <FAQ />
        </div>
    );
};

export default Home;
