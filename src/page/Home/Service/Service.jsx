import React, { useEffect, useState } from 'react';

const Service = () => {
    const [services, SetServices] = useState([])
    useEffect(()=>{
        fetch('./Service.json')
        .then(res=>res.json())
        .then(data=>SetServices(data))
        .catch(err=>console.log(err))
    },[])
    return (
        <div className='bg-secondary p-8'> 
        <div className="text-center space-y-3 text-white mt-4">
            <h3 className="text-2xl font-bold">Our Services</h3>
            <p className="text-base">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments <br /> — we deliver on time, every time.</p>
            
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-20 ">
 {services.map(service =>(
       <section className="bg-white rounded-2xl shadow-2xl py-5 px-2 flex flex-col items-center justify-center space-y-3 cursor-pointer hover:bg-primary transition-all duration-700 hover:translate-x-4">
        <img src={service.Image} alt="" />
        <h2 className="text-xl font-bold text-secondary">{service.tittle}</h2>
        <p className="text-base text-black/60 text-center">{service.description}</p>
    </section>
 ))}
</div>  
        </div>
    );
};

export default Service;