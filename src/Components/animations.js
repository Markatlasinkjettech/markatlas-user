import anime from 'animejs/lib/anime.es.js';

export const fadeInUp = () => {
  anime({
    targets: '.animate-fadeInUp',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(200),
  });
};

export const fadeInLeft = () => {
  anime({
    targets: '.animate-fadeInLeft',
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(200),
  });
};

export const fadeInRight = () => {
  anime({
    targets: '.animate-fadeInRight',
    opacity: [0, 1],
    translateX: [20, 0],
    duration: 1000,
    easing: 'easeOutQuad',
    delay: anime.stagger(200),
  });
};
