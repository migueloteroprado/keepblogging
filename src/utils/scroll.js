let lastScrollPosition = 0;

export const configHeaderScroll = () => {
	window.addEventListener('scroll', () => {
		const newScrollPosition = window.pageYOffset;
		const header = document.querySelector('.header-main');
		if (newScrollPosition < lastScrollPosition) {
			// scroll up
			header.classList.remove('static');
			if (newScrollPosition > 0) {
				header.classList.add('fixed');
				header.classList.remove('menu-open');
			} else {
				header.classList.remove('fixed');
			}
		} else if (newScrollPosition > lastScrollPosition) {
			// scroll down
			header.classList.remove('fixed');
			header.classList.add('static');
		}
		lastScrollPosition = newScrollPosition;
	});
};

export default {
	configHeaderScroll
};
