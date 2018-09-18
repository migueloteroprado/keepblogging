import queryString from 'query-string';

const removeActiveClass = () => {
	const activeElement = document.getElementsByClassName('menu-active')[0];
	if (activeElement) activeElement.classList.remove('menu-active');
};

const addActiveClass = (active) => {
	const newActiveElement = document.getElementById(active);
	if (newActiveElement) newActiveElement.classList.add('menu-active');
};

const handleHamburgerClick = () => {
	const header = document.querySelector('header.header-main');
	const hamburgerLink = document.getElementById('hamburger-icon');
	hamburgerLink.addEventListener('click', () => {
		header.classList.toggle('menu-open');
	});
};

const updateTitle = (title) => {
	const titleElement = document.getElementById('title');
	titleElement.innerHTML = title;
};

export const updateHeader = ({ title, active }) => {
	let activeItem = active;
	const query = queryString.parse(window.location.search);
	const categoryId = query && query.category;
	if (categoryId) {
		activeItem = `menu-category-${categoryId}`;
	}
	updateTitle(title);
	handleHamburgerClick();
	removeActiveClass();
	addActiveClass(activeItem);
};

export default {
	updateHeader
};

let lastScrollPosition = 0;
let lastScrollDirection = 'down';
window.addEventListener('scroll', () => {
	const newScrollPosition = window.pageYOffset;
	const header = document.querySelector('.header-main');
	if (newScrollPosition < lastScrollPosition) {
		// scroll up
		if (lastScrollDirection === 'down') {
			header.classList.remove('header-static');
			if (newScrollPosition > 0) {
				header.classList.add('header-fixed');
				header.classList.remove('menu-open');
			} else {
				header.classList.remove('header-fixed');
			}
		}
		lastScrollDirection = 'up';
	} else if (newScrollPosition > lastScrollPosition) {
		// scroll down
		if (lastScrollDirection === 'up') {
			header.classList.remove('header-fixed');
			header.classList.add('header-static');
		}
		lastScrollDirection = 'down';
	}
	lastScrollPosition = newScrollPosition;
});
