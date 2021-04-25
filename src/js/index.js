import '../sass/index.sass';

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.min.css';
// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

import { gsap } from 'gsap';
import Splitter from 'split-html-to-chars';


// POC open and close cards aka items
document.querySelectorAll('.project__item').forEach(item => {

    const itemToggler = item.querySelector('.project__item__head__icon');

    itemToggler.addEventListener('click', () => {

        // Open or close the item if toggler is clicked
        item.classList.toggle('is_open');

        // The item should only be printed if it is open. Otherwise just hide it.
        if (item.classList.contains('is_open')) {
            item.classList.remove('print_not')
        } else {
            item.classList.add('print_not')
        }

    });

});


// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

// init Swiper:
new Swiper('.swiper-container', {

    speed: 400,
    spaceBetween: 24,
    // loop: true,
    // centeredSlides: true,
    slidesPerView: 'auto',



    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

// Animations

// TODO add wrapper function to get rid of blank space (format issue)
const headerIntroHeadline = document.querySelector('.header__intro__headline');
headerIntroHeadline.outerHTML = Splitter(headerIntroHeadline.outerHTML, '<span class="letter">$</span>');

//create a timeline instance
const tl = gsap.timeline({defaults: {ease: 'power2.inOut'} });

tl.set('.header__intro', {y: '30vh'});
tl.from('.header__intro__subtitle', {duration: 2, y: -40, opacity: 0});
// tl.from('.header__intro__headline', {duration: 2, y: -40, opacity: 0},'+=0.5');
tl.from('.letter', {
    stagger: {
        each: 0.15, // 0.1 seconds between when each '.box' element starts animating
        ease: 'steps(16)'
    },
    opacity: 0,
});
// tl.from('.header__intro__headline', {duration: 1, letterSpacing: 0});
tl.to('.header__intro', {duration: 2, y: 0 });
tl.from('.header__content', {duration: 1.5, y: -100, opacity: 0});
tl.from('.header__searchbar', {duration: 1.5, y: -100, opacity: 0});
tl.from('.career', {duration: 1.5, y: -100, opacity: 0});
tl.from('.A4', { duration: 2, boxShadow: 'none' }, '-=2');


// tl.from('.letter', {
//     y: -5,
//     opacity: 0,
//     stagger: {
//         each: 0.1, // 0.1 seconds between when each '.box' element starts animating
//         ease: 'none'
//     }
// });
