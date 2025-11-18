import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Component/Sheard/Header';
import Footer from '../Component/Sheard/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;