import { getFormatedDateDiff } from 'utils/date';

export const createComment = ({
	name,
	email,
	comment,
	timestamp
} = {
	name: '',
	emaikl: '',
	comment: '',
	timestamp: ''
}) => {
	const commentContainer = document.createElement('article');
	commentContainer.classList.add('comment');
	commentContainer.innerHTML = `
		<div class="comment-content">
			${comment}
		</div>
		<div class="comment-stats-container">
			<div class="comment-author">
				<span class="comment-stats-title">Posted by:</span> ${name} (<a href="mailto:${email}">${email}</a>) 
			</div>
			<div class="comment-timestamp">
				${getFormatedDateDiff(timestamp)}
			</div>
		</div>
  `;

	return commentContainer;
};

export default {
	createComment
};
