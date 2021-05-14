import 'swiper/swiper-bundle.min.css';
import Swiper, { Navigation } from 'swiper';

// Configs
Swiper.use([Navigation]);

// Functions
const initEducationSwiper = () => {
    new Swiper('.career__education .swiper-container', {

        spaceBetween: 62,
        slidesPerView: 1,

        speed: 1000,

        breakpoints: {
            792: {
                // centeredSlides: true,
                slidesPerView: 3,
                spaceBetween: 20
            },
            480: {
                // centeredSlides: true,
                slidesPerView: 2,
            },
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
}

// Exports
export {
    initEducationSwiper
}
