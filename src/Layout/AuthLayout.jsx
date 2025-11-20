import React from 'react';
import Logo from '../Component/Logo/Logo';
import authLogo from '../assets/authImage.png'
import { Outlet } from 'react-router';
const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto '>
            <Logo></Logo>
            <div className='flex items-center min-h-screen justify-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={authLogo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;