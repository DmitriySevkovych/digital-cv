import '../sass/index.sass';

// import Swiper JS
import Swiper, { Navigation, Autoplay } from 'swiper';
// configure Swiper to use modules
Swiper.use([Navigation, Autoplay]);

// import Swiper styles
import 'swiper/swiper-bundle.min.css';

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


// init Swiper:
new Swiper('.swiper-container', {

    speed: 3000,
    spaceBetween: 24,
    // loop: true,
    // centeredSlides: true,
    slidesPerView: 'auto',
    autoplay: {
        delay: 10000,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

// Animations

// TODO add wrapper function to get rid of blank space (format issue)
const lettersElements = document.querySelectorAll('.to_letters');
lettersElements.forEach(element => {
    element.outerHTML = Splitter(element.outerHTML, '<span class="letter">$</span>');
});

//create a timeline instance
const tl = gsap.timeline({ defaults: { ease: 'power.inOut' } });


// Searchbar
tl.from('.header__searchbar', {
    duration: 0.5,
    opacity: 0,
    y: -10
});
tl.from('.header__searchbar', {
    width: 0,
    duration: 1.5
}, '+=0.3');

tl.from('.header__searchbar__text .letter',
    {
        opacity: 0,
        stagger: {
            amount: 3,
        }
    }
);

// Intro
tl.from('.header__intro__subtitle',
    {
        opacity: 0,
        duration: 2,
    }
);

tl.from('.header__intro__headline', {
    opacity: 0,
    duration: 1.5,
});


tl.from('.header__content__picture',
    {
        opacity: 0,
        duration: 1.5,
        x: 20,
        ease: 'power.in'
    },
    '-=1'
);

tl.from('.header__content__data', { duration: 1.5, opacity: 0, x: -20, ease: 'power.in' }, '-=1.5');

// Projects
tl.from('.career__subtitle.projects__subtitle', { opacity: 0, duration: 0.5 });

tl.from('.project__item',
    {
        opacity: 0,
        y: 10,
        ease: 'power.inOut',
        stagger: {
            each: 0.1
        }
    }
);

// Education
tl.from('.career__subtitle.education__subtitle', { opacity: 0, duration: 0.5 });

tl.from('.education__item',
    {
        opacity: 0,
        y: 10,
        ease: 'power.in',
        stagger: {
            each: 0.25
        }
    }
);

tl.from('.swiper-button > div',
    {
        opacity: 0,
        y: 10,
        ease: 'power.in',
        stagger: {
            each: 0.25
        }
    }
);

// Coding
tl.from('.coding__subtitle', { opacity: 0, y: 10, duration: 0.5 });

tl.from('.coding__overview .gauge',
    {
        opacity: 0,
        y: 10,
        ease: 'power.in',
        stagger: {
            each: 0.1
        }
    }
);

tl.from('.coding__message', { opacity: 0, y: 10, duration: 0.5 });

// tl.from('.career', {duration: 1.5, y: -100, opacity: 0});
tl.from('.A4', { duration: 2, boxShadow: 'none' }, '-=2');
