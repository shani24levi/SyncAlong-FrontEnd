import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SwiperCore, { Navigation, Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
//import 'swiper/swiper-bundle.min.css';
import UserCard from '../../card/UserCard';
import Toolbar from './CarouselToolbar';
import { CarouselDiv } from './Carousel.styles';

SwiperCore.use([Navigation, Mousewheel, Pagination]);

const Carousel = () => {
    const userList = useSelector(state => state.profile.trainees_profiles);
    const [prev, setPrev] = useState(0);
    const [next, setNext] = useState(0);
    const prevRef = useRef(prev);
    const nextRef = useRef(next);
    console.log(prevRef, nextRef);

    return (
        <CarouselDiv style={{ margin: '2rem', backgroundColor: 'inherit' }}>
            <Toolbar prevRef={prevRef} nextRef={nextRef} prev={prev} setPrev={setPrev} next={next} setNext={setNext} />
            <Swiper
                navigation={{
                    prevEl: prevRef.current ? prevRef.current : undefined,
                    nextEl: nextRef.current ? nextRef.current : undefined,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.update();
                }}
                slidesPerView={5}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    760: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    980: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1700: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}

                slidesPerGroup={1}
                freeMode
                grabCursor
                // centeredSlides
                mousewheel={{ forceToAxis: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                loop={true}>
                {userList.map((user, index) => (
                    <SwiperSlide key={index} >
                        <UserCard trainee={user.user} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </CarouselDiv>
    );
};

export default Carousel;