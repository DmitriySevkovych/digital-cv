import '../sass/index.sass';

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

// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.min.css';
// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

// init Swiper:
new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    loop: true,
    centeredSlides: true,


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
