import React from 'react';
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png"
import amazon_vector from "../../../assets/brands/amazon_vector.png"
import casio from "../../../assets/brands/casio.png"
import moonstar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import star from "../../../assets/brands/star.png"
import start_people from "../../../assets/brands/start_people.png"
const brands = [start_people, star, randstad, moonstar, casio, amazon_vector, amazon];
const Team = () => {
    return (
        <div className='py-12 border-b border-secondary border-dashed'>
            <h3 className="text-xl text-center pb-10 font-bold text-secondary">We've helped thousands of sales teams</h3>
    <Marquee
    autoFill
    pauseOnHover
    direction='right'
    gradient
    >
       {
        brands.map((brand) => {
          return  <img src={brand} alt="" className='mx-5'/>
        })

       } 
  </Marquee>
        </div>
    );
};

export default Team;