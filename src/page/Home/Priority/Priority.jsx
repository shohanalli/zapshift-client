import React from 'react';
import { Link } from 'react-router';
import locationMarchent from '../../../assets/location-merchant.png'
import bgImg  from '../../../assets/be-a-merchant-bg.png'
const Priority = () => {
    return (
        <div className='bg-[#03373D] relative rounded-2xl p-20 my-15'>
            <section className='flex gap-10 '>
                <aside className='space-y-5'>
                    <h2 className='text-3xl font-bold text-white'>Merchant and Customer Satisfaction is Our First Priority</h2>
                    <p className='text-base text-white'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className="flex gap-3">
                        <Link className='primary_btn' to={''}>Become a Merchant</Link>
                        <Link className='bg-transparent  border border-primary rounded-4xl px-5 py-2 font-semiboldbold text-secondary text-white' to={''}>Earn with ZapShift Courier</Link>
                    </div>
                </aside>
                <aside className=''>
                    <img src={locationMarchent} alt="" />
                </aside>
                <img src={bgImg} alt="" className='absolute top-0'/>
            </section>
        </div>
    );
};

export default Priority;