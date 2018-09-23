// placeholders to load if the article has no image.
// (uncomment thes lines if you want to load a placeholder for articles without an image)
/*
import picturePlaceholder600 from 'assets/images/image-placeholder-600.png';
import picturePlaceholder900 from 'assets/images/image-placeholder-900.png';
import picturePlaceholder1200 from 'assets/images/image-placeholder-1200.png';
*/

// placeholder image to load if user has no profile photo
import userPlaceholder from 'assets/images/user-placeholder.png';

import path from 'path';
import { createComments, updateComments } from 'components/comments/comments-component';
import { createCommentForm } from 'components/comment-form/comment-form-component';
import { createPagination } from 'components/comments-pagination/comments-pagination-component';
import { getFormatedDateDiff } from 'utils/date';
import { isScrolledIntoView } from 'utils/scroll';
import PubSub from 'pubsub-js';
import { sleep } from 'utils/utils';

// reveal animation library
import { revealAnimate } from 'utils/animate';

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

// update DOM of the article detail
export const updateArticleDetail = async ({
	title, user, category, imageURL, videoURL, body, id, timestamp
} = {
	title: 'No title',
	user: { name: 'No author', imageURL: '' },
	category: { name: 'No categoty' },
	imageURL: '',
	videoURL: '',
	body: 'No content',
	id: 0,
	timestamp: ''
}) => {
	const article = document.getElementById('article-detail');
	const userImage = user && user.imageURL ? user.imageURL : `/${userPlaceholder}`;
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
	let videoContent = '';
	if (videoURL) {
		videoContent += `<div class="article-video-container">
										<iframe class="article-video" src="${videoURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
									</div>`;
	}

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
		${videoContent}
	
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
			<nav id="comments-nav" class="comments-nav hidden">
			</nav>
		</section>
	`;

	// animate component showing
	revealAnimate('.article-detail', {
		opacity: 0,
		duration: 800,
		scale: 0.98,
		delay: 0,
		distance: '0px'
	});

	handleLike(id);

	// create comment form component
	createCommentForm({ articleId: id });

	// create comments navigation buttons component
	createPagination();

	// Go to comments directly if invoked from comments number in articles page
	if (window.location.hash && window.location.hash === '#comments') {
		// wait a little time to ensure that comments div is added to DOM
		await sleep(100);
		const commentsElement = document.querySelector('#comments');
		if (commentsElement) commentsElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
	}

	// Load comments when comments section is visible, acording to scroll position
	const commentsSection = document.querySelector('#comments');
	window.addEventListener('scroll', () => {
		if (isScrolledIntoView(commentsSection) && !commentsShowed) {
			commentsShowed = true;

			// create comments components
			createComments({ articleId: id });
		}
	});

	// when a new comment is added, reload comments
	PubSub.subscribe('reload-comments', () => {
		updateComments({ articleId: id });
	});
};

export default {
	updateArticleDetail
};
