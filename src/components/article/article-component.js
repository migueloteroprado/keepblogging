import userPlaceholder from 'assets/user-placeholder.png';
import { createDomElement } from 'utils/utils';

// Uncomment this lines to load placeholder in article has no image
/*
import picturePlaceholder600 from 'assets/image-placeholder-600.png';
import picturePlaceholder900 from 'assets/image-placeholder-900.png';
import picturePlaceholder1200 from 'assets/image-placeholder-1200.png';
*/

import { getFormatedDateDiff } from 'utils/date';
import path from 'path';

export const createArticle = ({
	id,
	category,
	title,
	user,
	imageURL,
	videoURL,
	summary,
	timestamp,
	commentsNumber
} = {
	id: 0,
	category: { name: 'No category' },
	title: 'No title',
	user: { name: 'No author', pictureURL: '' },
	imageURL: '',
	videoURL: '',
	summary: 'No content',
	timestamp: '2000-01-01 00:00:00',
	commentsNumber: 0
}) => {
	const userImage = user.imageURL !== '' ? user.imageURL : `/${userPlaceholder}`;
	let imgContent = '';
	if (imageURL) {
		const base = path.dirname(imageURL);
		const aux = path.basename(imageURL).split('.');
		const name = aux[0] || '';
		const ext = aux[1] || '';
		imgContent += `
			<div class="article-image-container">
				<a class="article-image" href="/article/?id=${id}">
				<img src="${imageURL}" srcset="
					${base}/${name}-600.${ext} 600w,
					${base}/${name}-900.${ext} 900w,
					${base}/${name}-1200.${ext} 1200w"
					alt="${title}" title="${title}">
				</a>
			</div>`;
	}
	// uncomment these lines if you want to load a image placeholder if article has no image
	/* 	else {
		imgContent += `
			<div class="article-image-container">
				<a class="article-image" href="/article/?id=${id}">
				<img src="${picturePlaceholder600}" srcset="
					${picturePlaceholder600} 600w,
					${picturePlaceholder900} 900w,
					${picturePlaceholder1200} 1200w"
					alt="${title}" title="${title}">
				</a>
			</div>`;
	} */
	let videoContent = '';
	if (videoURL) {
		videoContent += `<div class="article-video-container">
										<iframe class="article-video" src="${videoURL}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
									</div>`;
	}

	const article = createDomElement('article', '', ['article']);
	article.innerHTML = `
		<header class="article-header">
			<h1 class="article-title">
				<a href="/article/?id=${id}">${title}</a>
			</h1>
			<div class="article-category">
				${category.name}
			</div>
		</header>
		<div class="article-content">
			<div>
				${imgContent}
				<div class="article-summary">
					${summary}
				</div>
			</div>
			${videoContent}
		</div>
		</div>
		<div class="article-footer">
			<div class="article-author">
				<div class="article-author-picture">
					<img src="${userImage}" alt="${user.name}" title="${user.name}"/>
				</div>
				<div class="article-author-name"><span class="author-name-title">Posted by:</span> ${user.name} (<a href="mailto:${user.email}">${user.email})</a></div>
			</div>
			<div class="article-status">
				<div class="article-timestamp">${getFormatedDateDiff(timestamp)}</div>
				<div class="article-comments-number"><a href="/article?id=${id}#comments">Comments: ${commentsNumber}</a></div>
			</div>
		</div>
	`;

	return article;
};

export default {
	createArticle
};
