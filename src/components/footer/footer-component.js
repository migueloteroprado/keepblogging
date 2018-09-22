export const updateFooter = ({ footerText }) => {
	const text = document.getElementById('footer-text');
	text.innerHTML = footerText;
};

export const configGoTopButton = () => {
	const btnTop = document.getElementById('btn-top');

	// Click event on go top button
	btnTop.addEventListener('click', () => {
		// scroll top
		window.scroll({	top: 0, left: 0, behavior: 'smooth' });
	});

	// scroll event listener
	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 50) {
			btnTop.classList.remove('hidden');
		} else {
			btnTop.classList.add('hidden');
		}
	});
};

export default {
	configGoTopButton
};
