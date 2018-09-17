import { appendComponent } from 'utils/utils';
import { CommentService } from 'services/comment-service';
import { createComment } from 'components/comment/comment-component';

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
		console.log(error);
		comments.innerHTML = 'There was an error, please reload';
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
