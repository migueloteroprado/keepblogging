import { getFormatedDateDiff } from 'utils/date';
import { createDomElement } from 'utils/utils';

export const createComment = ({
	name,
	email,
	comment,
	timestamp
} = {
	name: '',
	email: '',
	comment: '',
	timestamp: ''
}) => {
	const commentContainer = createDomElement('article');
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
