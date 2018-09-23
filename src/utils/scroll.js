let lastScrollPosition = 0;


export const configHeaderScroll = () => {
	window.addEventListener('scroll', () => {
		const newScrollPosition = window.pageYOffset;
		const header = document.querySelector('.header-main');
		if (newScrollPosition < lastScrollPosition) {
			// scroll up
			header.classList.remove('header-static');
			if (newScrollPosition > 0) {
				header.classList.add('header-fixed');
				header.classList.remove('menu-open');
			} else {
				header.classList.remove('header-fixed');
			}
		} else if (newScrollPosition > lastScrollPosition) {
			// scroll down
			header.classList.remove('header-fixed');
			header.classList.add('header-static');
		}
		lastScrollPosition = newScrollPosition;
	});
};

// function to determine if an element is visible according its position into scrollView
export const isScrolledIntoView = (elem) => {
	const rect = elem.getBoundingClientRect();
	const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
	return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

export default {
	configHeaderScroll
};
