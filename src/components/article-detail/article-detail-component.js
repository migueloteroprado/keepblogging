import { createComments } from 'components/comments/comments-component';

const isLiked = id => localStorage.getItem(`article-${id}`);

const toggleLike = (id) => {
  const likeValue = isLiked(id) === 'true' ? 'false' : 'true';
  localStorage.setItem(`article-${id}`, likeValue);
};

const setInitialLikeValue = (likeButton, liked) => {
  if (liked === 'true') likeButton.children[0].classList.add('fas');
};

export const updateArticleDetail = ({
	title, user, body, id
} = {
	title: 'No title', user: { name: 'No author' }, body: 'No content', id: 0
}) => {
	const article = document.getElementById('article-detail');
	article.innerHTML = `
    <div class="title-container">
      <h2 title="Article title" class="article-detail-title">${title}</h2>
      <button id="like-button" class="like-button">
        <i class="far fa-heart"></i>
      </button>
    </div>
    <p title="Author" class="article-detail-author">${user.name}</p>
    <div class="article-detail-body">
      ${body}
    </div>
    <div id="comments" class="comments">
    </div>
    <div>
      <a title="back" class="back" href='javascript:history.back()'><- Go Back</a>
    </div>
  `;

  const likeButton = document.getElementById('like-button');

  setInitialLikeValue(likeButton, isLiked(id));

  likeButton.addEventListener('click', () => {
    likeButton.children[0].classList.toggle('fas');
    toggleLike(id);
  });
	createComments({ articleId: id });
};

export default {
	updateArticleDetail
};
