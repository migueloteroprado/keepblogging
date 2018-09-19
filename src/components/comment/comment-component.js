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
			<div>
				${getFormatedDateDiff(timestamp)}
			</div>
			<div>
				<span class="comment-stats-title">Posted by:</span> ${name} (${email}) 
			</div>
		</div>
		<!--
		<div class="comment-author"> 
			<div class="comment-author-name">${name}</div>
			<div class="comment-author-email">${email}</div>
		</div>
		<div class="comment-timestamp">${getFormatedDateDiff(timestamp)}</div>
		-->
  `;

	return commentContainer;
};

export default {
	createComment
};
