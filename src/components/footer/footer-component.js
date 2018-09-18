
export const goTop = () => {
	const btnTop = document.getElementById('btn-top');
	const containerMain = document.querySelector('.container-main');

	// Click event on go top button
	btnTop.addEventListener('click', () => {
		// scroll top (window for mobile and container-main fot tablet and desktop)
		window.scroll({	top: 0, left: 0, behavior: 'smooth' });
		containerMain.scroll({ top: 0, left: 0, behavior: 'smooth' });
	});

	// scroll event listener for window (mobile)
	containerMain.addEventListener('scroll', () => {
		if (containerMain.scrollTop > 10 || window.scrollY > 10) {
			btnTop.classList.remove('hidden');
		} else {
			btnTop.classList.add('hidden');
		}
	});

	// scroll event listener for container-main (tablet and desktop)
	window.addEventListener('scroll', () => {
		if (containerMain.scrollTop > 10 || window.scrollY > 10) {
			btnTop.classList.remove('hidden');
		} else {
			btnTop.classList.add('hidden');
		}
	});
};

export default {
	goTop
};
