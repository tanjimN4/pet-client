
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const PartnersSlider = () => {
    return (
        <div className='mx-10 my-10 bg-slate-600 rounded-lg text-white pt-10'>
            <div ><h1 className='text-2xl md:text-4xl text-center font-extrabold'>Kind Words from Adopt a Buddy Users</h1></div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='h-96 flex justify-center items-center'>
                    <div className=' text-center'>
                        <p className='px-2 md:px-32'> We cannot thank you enough for helping find a happy home with a smooth transition and no shelter time!!!! Thanks again. </p>
                        <div>
                            <h1 className='text-2xl font-extrabold'>G.W.</h1>
                            <p>Khione's former owner</p>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-96 flex justify-center items-center'>
                    <div className=' text-center'>
                        <p className='px-2 md:px-32'>  Thank you, and thanks for offering such a great resource! It was wonderful to be able to foster this sweet dog and not have to worry about her being stressed at the shelter.  </p>
                        <div>
                            <h1 className='text-2xl font-extrabold'>Dana</h1>
                            <p>Lily's foster</p>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-96 flex justify-center items-center'>
                    <div className=' text-center'>
                        <p className='px-2 md:px-32'> The information provided helped us screen potential owners until we found the perfect owner for Mickey and we were able to keep him with us until we did. Thank you! </p>
                        <div>
                            <h1 className='text-2xl font-extrabold'>Nancy</h1>
                            <p>Mickey's former owner</p>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='h-96 flex justify-center items-center'>
                    <div className=' text-center'>
                        <p className='px-2 md:px-32'> We were so happy to have found Lilly. She was just what we were looking for and had been well cared for by a wonderful family. She fits right in and we all love her like crazy! </p>
                        <div>
                            <h1 className='text-2xl font-extrabold'>Darra</h1>
                            <p>Lilly's new owner</p>
                        </div>
                    </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default PartnersSlider;
