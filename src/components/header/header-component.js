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
	const query = queryString.parse(window.location.search);
	const categoryId = query && query.category;
	console.log(categoryId);
	if (categoryId) {
		active = `menu-category-${categoryId}`;
		console.log(active);
	}
	updateTitle(title);
	handleHamburgerClick();
	removeActiveClass();
	addActiveClass(active);
};

export default {
	updateHeader
};
