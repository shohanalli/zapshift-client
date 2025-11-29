import React, { useEffect, useState } from 'react';

const System = () => {
    const [systems, SetSystems] = useState([])
    useEffect(()=>{
        fetch('./System.json')
        .then(res=>res.json())
        .then(data=>SetSystems(data))
        .catch(err=>console.log(err))
    },[])
    return (
        <div className='py-10 border-b border-secondary border-dashed'>
            {
                systems.map((system, i)=>
                <div key={i} className='flex py-5 gap-10 bg-white w-[95%] mx-auto rounded-xl my-5'>
                <aside className=' border-r border-secondary border-dashed pr-6 flex-1'>
                    <img src={system.Image} alt="" className='p-3'/>
                </aside>
                <aside className='flex-4 flex flex-col justify-center'>
                    <h3 className='text-xl font-bold text-secondary text-start'>{system.tittle}</h3>
                    <p >{system.description}</p>
                </aside>
            </div>
                )
            }
        </div>
    );
};

export default System;