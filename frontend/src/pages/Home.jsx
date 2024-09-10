import Hero from '../home/Hero';
import Categories from '../snippets/Categories';
import Doctors from '../snippets/Doctors';
import React from 'react';
import NewsAndFeeds from '@/home/NewsAndFeeds';
import FAQ from '@/home/FAQ';

const Home = () => {

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
