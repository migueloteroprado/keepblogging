import { createComments, updateComments } from 'components/comments/comments-component';
import { createCommentForm } from 'components/comment-form/comment-form-component';
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
	title, user, body, id
} = {
	title: 'No title', user: { name: 'No author' }, body: 'No content', id: 0
}) => {
	const article = document.getElementById('article-detail');
	article.innerHTML = `
    <header class="title-container">
      <h2 title="Article title" class="article-detail-title">${title}</h2>
      <button id="like-button" class="like-button">
        <i class="far fa-heart"></i>
      </button>
    </header>
    <div class="article-detail-author">
      ${user.name}
    </div>
    <div class="article-detail-body">
      ${body}
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

    <div>
      <a title="back" class="back" href='javascript:history.back()'><-- Go Back</a>
    </div>
  `;

	handleLike(id);

	createCommentForm({ articleId: id });

	createComments({ articleId: id });

	// Go to comments directly if invoked from comments number in articles page
	if (window.location.hash) {
		const comments = document.getElementById('comments');
		comments.scrollIntoView();
	}

	PubSub.subscribe('reload-comments', () => {
		updateComments({ articleId: id });
	});
};


export default {
	updateArticleDetail
};
