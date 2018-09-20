import userPlaceholder from 'assets/user-placeholder.png';
import { createComments, updateComments } from 'components/comments/comments-component';
import { createCommentForm } from 'components/comment-form/comment-form-component';
import { getFormatedDateDiff } from 'utils/date';
import PubSub from 'pubsub-js';

const isLiked = id => localStorage.getItem(`article-${id}`);

const toggleLike = (id) => {
	const likeValue = isLiked(id) === 'true' ? 'false' : 'true';
	localStorage.setItem(`article-${id}`, likeValue);
};

const setInitialLikeValue = (likeButton, liked) => {
	if (liked === 'true') likeButton.children[0].classList.add('fas');
};

const handleLike = (id) => {
	const likeButton = document.getElementById('like-button');
	setInitialLikeValue(likeButton, isLiked(id));
	likeButton.addEventListener('click', () => {
		likeButton.children[0].classList.toggle('fas');
		toggleLike(id);
	});
};

export const updateArticleDetail = ({
	title, user, body, id, timestamp, imageURL
} = {
	title: 'No title',
	user: { name: 'No author', imageURL: '' },
	body: 'No content',
	id: 0,
	timestamp: '',
	imageURL: ''
}) => {
	const article = document.getElementById('article-detail');
	const userImage = user.imageURL !== '' ? user.imageURL : `/${userPlaceholder}`;
	article.innerHTML = `
    <header class="title-container">
      <h1 title="Article title" class="article-detail-title">${title}</h1>
      <button id="like-button" class="like-button" title="toggle like">
        <i class="far fa-thumbs-up"></i>
      </button>
		</header>
		<div class="article-detail-media">
			<img src="${imageURL}" alt="${title}"/>
		</div>
    <div class="article-detail-body">
      ${body}
		</div>
		<div class="article-detail-footer">
			<div class="article-detail-author">
				<div class="article-detail-author-picture">
					<img src="${userImage}" alt="${user.name}" title="${user.name}"/>
				</div>
				<div class="article-detail-author-name"><span class="author-name-title">Posted by:</span> ${user.name} (<a href="mailto:${user.email}">${user.email})</a></div>
			</div>
			<div class="article-detail-timestamp">${getFormatedDateDiff(timestamp)}</div>
		</div>

    <section class="comments-section">
      <header>
        <h2>Comments</h2>
      </header>
      <div id="comments-form-container">
			</div>
      <div id="comments" class="comments">
      </div>
		</section>
  `;

	handleLike(id);

	createCommentForm({ articleId: id });

	createComments({ articleId: id });

/* 	// Go to comments directly if invoked from comments number in articles page
	window.addEventListener('load', () => {
		console.log('load');
		if (window.location.hash) {
			console.log('hash');
			const commentsDiv = document.getElementById('comments');
			commentsDiv.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
		}
	});
 */
	PubSub.subscribe('reload-comments', () => {
		updateComments({ articleId: id });
	});
};

export default {
	updateArticleDetail
};
