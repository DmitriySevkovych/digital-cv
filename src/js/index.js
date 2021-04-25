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

//create a timeline instance
const tl = gsap.timeline();

tl.from('.A4', { duration: 1.5, y: -100, opacity: 0 });
// tl.from('.header__intro__headline', {duration: 1.5, y: -100, opacity: 0});

// TODO add wrapper function to get rid of blank space (format issue)
const headerIntroHeadline = document.querySelector('.header__intro__headline');
console.log(headerIntroHeadline.outerHTML);
headerIntroHeadline.outerHTML = Splitter(headerIntroHeadline.outerHTML, '<span class="letter">$</span>');

tl.from('.letter', {
    y: -5,
    opacity: 0,
    stagger: {
        each: 0.1, // 0.1 seconds between when each '.box' element starts animating
        ease: 'none'
    }
});
