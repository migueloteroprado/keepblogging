import { getFormatedDateDiff } from 'utils/utils';

export const createComment = ({
	articleId,
	name,
	email,
	comment,
	id,
	timestamp
} = {
	articleId: 0,
	name: '',
	emaikl: '',
	comment: '',
	id: 0,
	timestamp: ''
}) => {
	const commentContainer = document.createElement('article');
	commentContainer.classList.add('comment');
	commentContainer.innerHTML = `
		<div class="comment-content">
			${comment}
		<div>
		<div class="comment-author">
			<div class="comment-author-name">${name}</div>
			<div class="comment-author-email">${email}</div>
		</div>
		<div class="comment-timestamp">${getFormatedDateDiff(timestamp)}</div>
  `;

	return commentContainer;
};

export default {
	createComment
};
