import ScrollReveal from 'scrollreveal';

export const revealAnimate = (element, config) => {
	ScrollReveal().reveal(element, config);
};

export default {
	revealAnimate
};
