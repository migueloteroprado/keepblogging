import { getFormatedDateDiff } from 'utils/date';

export const createArticle = ({
	id,
	category,
	title,
	user,
	imageURL,
	video,
	summary,
	timestamp,
	commentsNumber
} = {
	id: 0,
	category: { name: 'No category' },
	title: 'No title',
	user: { name: 'No author', pictureURL: '' },
	imageURL: '',
	video: '',
	summary: 'No content',
	timestamp: '2000-01-01 00:00:00',
	commentsNumber: 0
}) => {
	const article = document.createElement('article');
	article.classList.add('article');
	article.innerHTML = `
		<header class="article-header">
			<h1 class="article-title">
				<a href="/article/?id=${id}">${title}</a>
			</h1>
			<div class="article-category">
				${category.name}
			</div>
		</header>
		<div class="article-content-wrapper">
			<div class="article-content">
				<a class="article-image" href="/article/?id=${id}">
					<img src="${imageURL}"></img>
				</a>
				<div class="article-summary">${summary}</div>
			</div>
		</div>
		<div class="article-footer">
			<div class="article-author">
				<div class="article-author-picture">
					<img src="${user.imageURL}" alt="${user.name}" title="${user.name}"/>
				</div>
				<div class="article-author-name"><span class="author-name-title">Posted by:</span> ${user.name}</div>
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
