// placeholders to load if the article has no image.
// (uncomment thes lines if you want to load a placeholder for articles without an image)
/*
import picturePlaceholder600 from 'assets/image-placeholder-600.png';
import picturePlaceholder900 from 'assets/image-placeholder-900.png';
import picturePlaceholder1200 from 'assets/image-placeholder-1200.png';
*/

// placeholder to load in user has no profile photo
import userPlaceholder from 'assets/user-placeholder.png';

import path from 'path';
import { createComments, updateComments } from 'components/comments/comments-component';
import { createCommentForm } from 'components/comment-form/comment-form-component';
import { getFormatedDateDiff } from 'utils/date';
import { isScrolledIntoView } from 'utils/scroll';
import PubSub from 'pubsub-js';
import { sleep } from '../../utils/utils';

// function to get the localstorage variable for 'liked' state of the article
const isLiked = id => localStorage.getItem(`article-${id}`);

// determine if comments where loaded
let commentsShowed = false;

// change 'like' toggle value in localstorage for current article
const toggleLike = (id) => {
	const likeValue = isLiked(id) === 'true' ? 'false' : 'true';
	localStorage.setItem(`article-${id}`, likeValue);
};

// set initial state of the 'like' button
const setInitialLikeValue = (likeButton, liked) => {
	if (liked === 'true') likeButton.children[0].classList.add('fas');
};

// function to toggle 'like' state
const handleLike = (id) => {
	const likeButton = document.getElementById('like-button');
	setInitialLikeValue(likeButton, isLiked(id));
	likeButton.addEventListener('click', () => {
		likeButton.children[0].classList.toggle('fas');
		toggleLike(id);
	});
};

export const updateArticleDetail = async ({
	title, user, category, body, id, timestamp, imageURL
} = {
	title: 'No title',
	user: { name: 'No author', imageURL: '' },
	category: { name: 'No categoty' },
	body: 'No content',
	id: 0,
	timestamp: '',
	imageURL: ''
}) => {
	const article = document.getElementById('article-detail');
	const userImage = user.imageURL !== '' ? user.imageURL : `/${userPlaceholder}`;
	let imageContent = '';
	if (imageURL) {
		const base = path.dirname(imageURL);
		const aux = path.basename(imageURL).split('.');
		const name = aux[0] || '';
		const ext = aux[1] || '';
		imageContent = `
			<img src="${imageURL}" srcset="
				${base}/${name}-600.${ext} 600w,
				${base}/${name}-900.${ext} 900w,
				${base}/${name}-1200.${ext} 1200w"
				alt="${title}" title="${title}">`;
	}
	// uncomment these lines if you want to load a placeholder for articles without images
	/*
	else {
		imageContent += `
			<img src="/${picturePlaceholder600}" srcset="
				/${picturePlaceholder600} 600w,
				/${picturePlaceholder900} 900w,
				/${picturePlaceholder1200} 1200w"
				alt="${title}" title="${title}">
			</a>
		</div>`;
	}
	*/

	article.innerHTML = `
    <header class="title-container">
			<h1 title="Article title" class="article-detail-title">${title}</h1>
			<div class="article-category">
				${category.name}
			</div>
      <button id="like-button" class="like-button" title="toggle like">
        <i class="far fa-thumbs-up"></i>
      </button>
		</header>
		<div class="article-detail-media">
			${imageContent}
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
				&nbsp;
			</div>
			<nav id="comments-nav" class="comments-nav hidden">
				<button class="comments-nav-btn form-button" id="comments-nav-first">|<</button>
				<button class="comments-nav-btn form-button" id="comments-nav-prev"><</button>
				<button class="comments-nav-btn form-button" id="comments-nav-next">></button>
				<button class="comments-nav-btn form-button" id="comments-nav-last">>|</button>
			</nav>
		</section>
  `;

	handleLike(id);

	createCommentForm({ articleId: id });

	// Go to comments directly if invoked from comments number in articles page
	if (window.location.hash) {
		// wait a little time to ensure that comments div is added to DOM
		await sleep(100);
		const commentsElement = document.querySelector('#comments');
		if (commentsElement) commentsElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	}

	// function fired on scroll event to determine if comments section is visible, then load comments
	const commentsSection = document.querySelector('.comments-section');
	window.addEventListener('scroll', () => {
		if (isScrolledIntoView(commentsSection) && !commentsShowed) {
			commentsShowed = true;
			createComments({ articleId: id });
		}
	});

	PubSub.subscribe('reload-comments', () => {
		updateComments({ articleId: id });
	});
};

export default {
	updateArticleDetail
};
