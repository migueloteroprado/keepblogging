import { getFormatedDate } from 'utils/utils';

export const createComment = ({
	articleId,
	user,
	text,
	id,
	timestamp
} = {
	articleId: 0,
	userId: 0,
	text: '',
	id: 0,
	timestamp: ''
}) => {
	const comment = document.createElement('article');
	comment.classList.add('comment');
	comment.innerHTML = `
		<div class="comment-content">
			${text}
		<div>
		<div class="comment-author">
			<div class="comment-author-name">${user.name}</div>
			<div class="comment-author-picture">
				<img src="${user.pictureURL}" alt="${user.name}" title="${user.name}"/>
			</div>
		</div>
		<div class="article-timestamp">${getFormatedDate(timestamp)}</div>
  `;

	return comment;
};

export default {
	createComment
};
