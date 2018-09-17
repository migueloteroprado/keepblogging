import { appendComponent, getFormData, getStringDate } from 'utils/utils';
import { CommentService } from 'services/comment-service';
import { createComment } from 'components/comment/comment-component';
import PubSub from 'pubsub-js';

const handleCommentForm = (commentServiceInstance, articleId) => {
	const commentForm = document.getElementById('comment-form');
	const submitFormButton = document.getElementById('comment-form-submit');
	const formInputs = commentForm.getElementsByClassName('comment-input');

	submitFormButton.addEventListener('click', (e) => {
		e.preventDefault();
		submitFormButton.disable = true;
		const formData = getFormData(formInputs);
		formData.articleId = articleId;
		formData.timestamp = getStringDate(Date.now());
		commentServiceInstance.postComment(formData).then(
			(response) => {
				if (response === true) {
					commentForm.reset();
					PubSub.publish('reload-comments', { articleId });
				}
			}
		);
	});
};
const loadComments = (commentsJSON, comments) => {
	const updatedComments = comments;
	if (commentsJSON.length === 0) {
		updatedComments.innerHTML = 'No comments';
	} else {
		appendComponent(updatedComments,
			commentsJSON.map(commentData => createComment(commentData)));
	}
};

export const updateComments = ({ articleId }) => {
	const commentServiceInstance = new CommentService();
	const comments = document.getElementById('comments');
	comments.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
	// get comments
	commentServiceInstance.getComments({ article: articleId }).then(async (commentsJSON) => {
		comments.innerHTML = '';
		loadComments(commentsJSON, comments);
	}).catch((error) => {
		console.log(error); // eslint-disable-line no-console
		comments.innerHTML = 'There was an error loading comments, please reload';
	});
};

export const createComments = ({ articleId }) => {
	const commentServiceInstance = new CommentService();
	const comments = document.getElementById('comments');
	updateComments({ articleId });
	handleCommentForm(commentServiceInstance, articleId);
	return comments;
};

export default {
	createComments
};
