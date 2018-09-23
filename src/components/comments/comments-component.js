import { appendComponent } from 'utils/utils';
import { CommentService } from 'services/comment-service';
import { createComment } from 'components/comment/comment-component';
import { updatePagination } from 'components/comments-pagination/comments-pagination-component';

// animation library
import { revealAnimate } from 'utils/animate';

const commentsPerPage = 5;
let commentsData = [];

const showError = (error, comments) => {
	const commentsContainer = comments;
	console.log('Error:', error); // eslint-disable-line no-console
	commentsContainer.innerHTML = '<h4 class="error center">There was an error loading comments, please reload<h4>';
};

export const loadComments = (currentPage, totalPages) => {
	const comments = document.getElementById('comments');
	// calculate fisrt and last comments to load and get them from array
	const begin = (currentPage - 1) * commentsPerPage;
	const end = Math.min(commentsData.length, begin + commentsPerPage);
	const showedComponents = commentsData.slice(begin, end);
	// create new comments components
	const components = showedComponents.map(commentData => createComment(commentData));
	// Remove previous comments from DOM
	while (comments.firstChild) {
		comments.removeChild(comments.firstChild);
	}
	// append new comments to DOM
	appendComponent(comments, components);

	// update pagination buttons state
	updatePagination(currentPage, totalPages);

	// animate comments showing
	revealAnimate('.comment', {
		opacity: 0.2,
		duration: 500,
		scale: 0.95,
		delay: 0,
		distance: '0px'
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
		if (commentsData.error) {
			showError(commentsData.error, comments);
		} else {
			const numComments = commentsData.length;
			if (numComments === 0) {
				comments.innerHTML = 'No comments yet';
			} else {
				// calculate cuurent page and total pages for navigation
				const totalPages = commentsData ? Math.ceil(commentsData.length / commentsPerPage) : 1;
				const currentPage = 1;

				// load comments
				loadComments(currentPage, totalPages);

				// show or hide nav buttons
				const btnContainer = document.getElementById('comments-nav');
				if (commentsData.length > 0) {
					btnContainer.classList.remove('hidden');
				} else {
					btnContainer.classList.add('hidden');
				}
			}
		}
	}).catch((error) => {
		showError(error.message, comments);
	});
};

export const createComments = ({ articleId }) => {
	const comments = document.getElementById('comments');
	updateComments({ articleId });
	return comments;
};

export default {
	createComments, updateComments, loadComments
};
