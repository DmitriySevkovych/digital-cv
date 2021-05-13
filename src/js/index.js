import 'swiper/swiper-bundle.min.css';
import '../sass/index.sass';

import Swiper, { Navigation, Autoplay } from 'swiper';

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
            item.classList.remove('print_not', 'is_collapsed');
        } else {
            item.classList.add('print_not', 'is_collapsed');
        }

    });

});

// Swiper

// configure Swiper to use modules
Swiper.use([Navigation, Autoplay]);

// init Swiper:
new Swiper('.swiper-container', {

    spaceBetween: 62,
    slidesPerView: 1,

    // autoplay: {
    //     delay: 10000,
    // },
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

// Animations

const ANIMATION_OPTIONS = {
    breakpointMobile: 782,
    textMoving: false,
    introDuration: 0.5
}

// TODO add wrapper function to get rid of blank space (format issue)
const lettersElements = document.querySelectorAll('.to_letters');
lettersElements.forEach(element => {
    element.outerHTML = Splitter(element.outerHTML, '<span class="letter">$</span>');
});

const setupCodingButtonAnimation = () => {
    const codingButton = document.querySelector('.coding .clickme');
    const tlCodingButton = gsap.timeline({ paused: true });

    tlCodingButton.from('.gauge', {
        opacity: 0,
        transform: 'rotate(120deg) ',
        ease: 'sine.inOut',
        stagger: 0.03
    })

    let isOpen = false;

    const toggle = () => {
        isOpen ? close() : open();
        codingButton.classList.toggle('clickme');
    }

    const open = () => {
        tlCodingButton.play();
        isOpen = true;
    }

    const close = () => {
        tlCodingButton.reverse();
        isOpen = false;
    }

    const codingLanguagesContainer = document.querySelector('.coding__subtitle');
    codingLanguagesContainer.addEventListener('click', toggle);
}

const searchBarAnimation = () => {
    const text = document.querySelector('.header__searchbar__text');
    const slider = document.querySelector('.header__searchbar__slider');

    const isTextTooLong = slider.offsetWidth < text.offsetWidth;

    if (isTextTooLong) {
        const tl = gsap.timeline({ defaults: { ease: 'linear' } });

        tl.to('.header__searchbar__text',
            {
                duration: 10,
                x: -1 * text.offsetWidth,
                onComplete: () => {
                    tl.fromTo('.header__searchbar__text',
                        {
                            x: slider.offsetWidth
                        },
                        {
                            duration: 15,
                            delay: 1,
                            repeat: -1,
                            repeatDelay: 1,
                            x: -1 * text.offsetWidth
                        }
                    );
                }
            }
        )
    }
}

const animate = () => {
    //create a timeline instance
    const tl = gsap.timeline({ defaults: { ease: 'power.in' } });

    // Searchbar
    tl.from('.header__searchbar',
        {
            duration: 0.5,
            opacity: 0,
            y: -10
        }
    );
    tl.fromTo('.header__searchbar',
        {
            width: 0
        },
        {
            width: '100%',
            duration: 1
        },
        '+=0.3'
    );
    tl.from('.header__searchbar__text .letter',
        {
            opacity: 0,
            stagger: {
                amount: 3
            },
            onUpdate: () => {
                let progress = tl.progress();

                if (progress >= 0.2 && !ANIMATION_OPTIONS.textMoving) {
                    ANIMATION_OPTIONS.textMoving = true;
                    searchBarAnimation();
                }
            }
        }
    );

    // Intro
    tl.from('.header__intro__headline',
        {
            opacity: 0,
            duration: ANIMATION_OPTIONS.introDuration,
            ease: 'power.inOut'
        }
    );
    tl.from('.header__intro__subtitle',
        {
            opacity: 0,
            duration: ANIMATION_OPTIONS.introDuration,
            ease: 'power.inOut'
        }
    );
    tl.from('.header__content__picture',
        {
            opacity: 0,
            duration: ANIMATION_OPTIONS.introDuration -0.25,
            x: 20
        }
    );
    tl.from('.header__content__data',
        {
            duration: ANIMATION_OPTIONS.introDuration -0.25,
            opacity: 0,
            x: -20
        }
    );

    // Projects
    tl.from('.career__subtitle.projects__subtitle', { opacity: 0, duration: ANIMATION_OPTIONS.introDuration -0.25 });

    tl.from('.project__item',
        {
            opacity: 0,
            y: 10,
            stagger: {
                each: 0.2
            }
        }
    );

    // Education
    tl.from('.career__subtitle.education__subtitle',
        {
            opacity: 0,
            duration: 0.5
        }
    );

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
    tl.from('.coding__subtitle',
        {
            opacity: 0,
            y: 10,
            duration: 0.5
        }
    );

    if (window.innerWidth <= ANIMATION_OPTIONS.breakpointMobile) {
        setupCodingButtonAnimation();
    } else {
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

    }
    tl.from('.coding__message',
        {
            opacity: 0,
            y: 10,
            duration: 0.5
        }
    );

    // 'Outer' elements
    tl.from('footer',
        {
            duration: 1,
            opacity: 0,
            y: 20
        },
        '-=0.5'
    );
}

animate()
