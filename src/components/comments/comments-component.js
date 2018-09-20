import { appendComponent } from 'utils/utils';
import { CommentService } from 'services/comment-service';
import { createComment } from 'components/comment/comment-component';
import { sleep } from '../../utils/utils';

const loadComments = (commentsJSON, comments) => {
	const updatedComments = comments;
	if (commentsJSON.length === 0) {
		updatedComments.innerHTML = 'No comments yet';
	} else {
		const components = commentsJSON.map(commentData => createComment(commentData));
		appendComponent(updatedComments, components);
	}
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
		loadComments(commentsJSON, comments, articleId);
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
