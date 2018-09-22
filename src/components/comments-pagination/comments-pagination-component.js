import { loadComments } from 'components/comments/comments-component';

let currentPage = 0;
let totalPages = 0;

// Update button disabled state acording to current page
const updateButtonState = () => {
	const btnFirst = document.getElementById('comments-nav-first');
	const btnPrev = document.getElementById('comments-nav-prev');
	const btnNext = document.getElementById('comments-nav-next');
	const btnLast = document.getElementById('comments-nav-last');
	btnFirst.disabled = currentPage === 1;
	btnPrev.disabled = currentPage === 1;
	btnNext.disabled = currentPage === totalPages;
	btnLast.disabled = currentPage === totalPages;
};

// Add click events for pagination buttons
const handlePagingButtons = () => {
	const btnFirst = document.getElementById('comments-nav-first');
	const btnPrev = document.getElementById('comments-nav-prev');
	const btnNext = document.getElementById('comments-nav-next');
	const btnLast = document.getElementById('comments-nav-last');

	btnFirst.addEventListener('click', () => {
		currentPage = 1;
		loadComments(currentPage, totalPages);
		updateButtonState();
	});
	btnPrev.addEventListener('click', () => {
		if (currentPage > 0) currentPage--;
		loadComments(currentPage, totalPages);
		updateButtonState();
	});
	btnNext.addEventListener('click', () => {
		if (currentPage < totalPages) currentPage++;
		loadComments(currentPage, totalPages);
		updateButtonState();
	});
	btnLast.addEventListener('click', () => {
		currentPage = totalPages;
		loadComments(currentPage, totalPages);
		updateButtonState();
	});
};

export const updatePagination = (page, total) => {
	currentPage = page;
	totalPages = total;
	const currentPageContainer = document.getElementById('comments-current-page');
	const totalPagesContainer = document.getElementById('comments-total-pages');
	currentPageContainer.innerHTML = currentPage;
	totalPagesContainer.innerHTML = totalPages;
	updateButtonState();
};

export const createPagination = () => {
	const commentsNav = document.getElementById('comments-nav');
	commentsNav.innerHTML = `
		<button class="comments-nav-btn form-button" id="comments-nav-first">|<</button>
		<button class="comments-nav-btn form-button" id="comments-nav-prev"><</button>
		<button class="comments-nav-btn form-button" id="comments-nav-next">></button>
		<button class="comments-nav-btn form-button" id="comments-nav-last">>|</button>
		<div class="comments-pagination-info">
			Page <span id="comments-current-page">${currentPage}</span> of <span id="comments-total-pages">${totalPages}</span>
		</div>`;

	handlePagingButtons(commentsNav);
};

export default {
	createPagination, updatePagination
};
