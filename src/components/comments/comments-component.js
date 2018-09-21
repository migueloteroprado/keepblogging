import { appendComponent } from 'utils/utils';
import { CommentService } from 'services/comment-service';
import { createComment } from 'components/comment/comment-component';
import { sleep } from '../../utils/utils';

const commentsPerPage = 5;
let commentsData = [];
let currentPage = 1;
let totalPages = 0;

const loadComments = (comments) => {
	const updatedComments = comments;
	// calculate fisrt and last comments to load and get them from array
	const begin = (currentPage - 1) * commentsPerPage;
	const end = Math.min(commentsData.length, begin + commentsPerPage);
	const showedComponents = commentsData.slice(begin, end);
	// create new comments components
	const components = showedComponents.map(commentData => createComment(commentData));
	// Remove previous comments from DOM
	while (updatedComments.firstChild) {
		updatedComments.removeChild(updatedComments.firstChild);
	}
	// append new comments to DOM
	appendComponent(updatedComments, components);
};

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
const handlePagingButtons = (comments) => {
	const btnFirst = document.getElementById('comments-nav-first');
	const btnPrev = document.getElementById('comments-nav-prev');
	const btnNext = document.getElementById('comments-nav-next');
	const btnLast = document.getElementById('comments-nav-last');

	btnFirst.addEventListener('click', () => {
		currentPage = 1;
		loadComments(comments);
		updateButtonState();
	});
	btnPrev.addEventListener('click', () => {
		if (currentPage > 0) currentPage--;
		loadComments(comments);
		updateButtonState();
	});
	btnNext.addEventListener('click', () => {
		if (currentPage < totalPages) currentPage++;
		loadComments(comments);
		updateButtonState();
	});
	btnLast.addEventListener('click', () => {
		currentPage = totalPages;
		loadComments(comments);
		updateButtonState();
	});
};

export const updateComments = ({ articleId }) => {
	const commentServiceInstance = new CommentService();
	const comments = document.getElementById('comments');
	comments.innerHTML = `<div class="comment">
													<div class="spinner">
														<i class="fas fa-spinner fa-spin fa-2x"></i>
													</div>
												</div>`;
	// get comments
	commentServiceInstance.getComments({ article: articleId }).then(async (commentsJSON) => {
		comments.innerHTML = '';
		commentsData = commentsJSON;
		const numComments = commentsData.length;
		if (numComments === 0) {
			comments.innerHTML = 'No comments yet';
		} else {
			// calculate cuurent page and total pages for navigation
			totalPages = commentsData ? Math.ceil(commentsData.length / commentsPerPage) : 1;
			currentPage = 1;
			// load comments
			loadComments(comments);
			// show or hide nav buttons
			const btnContainer = document.getElementById('comments-nav');
			if (commentsData.length > 0) {
				btnContainer.classList.remove('hidden');
				handlePagingButtons(comments);
				updateButtonState();
			} else {
				btnContainer.classList.add('hidden');
			}
		}

		// Go to comments directly if invoked from comments number in articles page
		if (window.location.hash) {
			// wait a little time to ensure the DOM is updated
			await sleep(300);
			const commentsDiv = document.querySelector('.comments-section');
			if (commentsDiv) commentsDiv.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
		}
	}).catch((error) => {
		console.log('Error:', error.message); // eslint-disable-line no-console
		comments.innerHTML = 'There was an error loading comments, please reload';
	});
};

export const createComments = ({ articleId }) => {
	const comments = document.getElementById('comments');
	updateComments({ articleId });
	return comments;
};

export default {
	createComments
};
