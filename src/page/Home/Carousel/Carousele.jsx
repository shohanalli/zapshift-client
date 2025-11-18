import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
const Carousele = () => {
    return (
 <Carousel 
 infiniteLoop = {true}
 autoPlay = {true}
 >
                <div className='relative my-5'>
                    <img src={img1} />
                    <div className=' flex justify-center items-center gap-3 absolute bottom-20 left-20'>
                      <Link className='primary_btn'>Track Your Parcel</Link>  
                      <span className='p-2 rounded-full bg-black/90'><FaArrowRight className='rotate-330 text-primary'/></span>  
                      <Link className='border rounded-3xl px-5 py-2 font-bold'>Be A Rider</Link>                    
                    </div>
                    
                </div>
                <div className='relative'>
                    <img src={img2} />
                    <div className=' flex justify-center items-center gap-3 absolute bottom-20 left-20'>
                      <Link className='primary_btn'>Track Your Parcel</Link>  
                      <span className='p-2 rounded-full bg-black/90'><FaArrowRight className='rotate-330 text-primary'/></span>  
                      <Link className='border rounded-3xl px-5 py-2 font-bold'>Be A Rider</Link>                    
                    </div>
                    
                </div>
                <div className='relative'>
                    <img src={img3} />
                    <div className=' flex justify-center items-center gap-3 absolute bottom-20 left-20'>
                      <Link className='primary_btn'>Track Your Parcel</Link>  
                      <span className='p-2 rounded-full bg-black/90'><FaArrowRight className='rotate-330 text-primary'/></span>  
                      <Link className='border rounded-3xl px-5 py-2 font-bold'>Be A Rider</Link>                    
                    </div>
                    
                </div>
            </Carousel>
    );
};

export default Carousele;