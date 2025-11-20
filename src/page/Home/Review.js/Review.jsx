import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import reviewTop from "../../../assets/customer-top.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Review = () => {
  const [reviews, setReview] = useState([]);
  useEffect(() => {
    fetch("./reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReview(data), console.log(data);
      });
  }, []);
  return (
    <div className="pt-10 pb-25">
      <section className="flex flex-col justify-center items-center space-y-4 py-8">
        <img src={reviewTop} alt="" />
        <h2 className="text-2xl font-bold text-secondary">
          What our customers are sayings
        </h2>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </section>

      <>
        <Swiper
          effect={"coverflow"}
           loop = {true}
            autoPlay = {true}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            slideShadows: true,
            scale: 0.80,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map((reviw) => (
            <SwiperSlide>
              <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm">
                <div className="text-secondary/90 text-5xl">“</div>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {reviw.review}
                </p>
                <div className="border-t border-dotted border-gray-300 mt-4 mb-4"></div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full ">
                    <img src={reviw.user_photoURL} alt="" />
                  </div>
                  <div>
                    <h4 className="font-bold text-teal-900">
                      {reviw.userName}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Senior Product Designer
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Review;
