import React from 'react';
import Carousele from '../Carousel/Carousele';
import Work from '../HowItWork/Work';
import Service from '../Service/Service';
import Team from '../Team/Team';
import System from '../System/System';
import Priority from '../Priority/Priority';
import Review from '../Review.js/Review';

const Home = () => {
    return (
        <div>
           <Carousele></Carousele>
           <Work></Work>
           <Service></Service>
           <Team></Team>
           <System></System>
           <Priority></Priority>
           <Review></Review>
        </div>
    );
};

export default Home;