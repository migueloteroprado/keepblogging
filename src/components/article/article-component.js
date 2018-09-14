export const createArticle = ({
	id, category, title, user, imageURL, video, summary, timestamp, like
} = {
	id: 0,
	category: { name: 'No category' },
	title: 'No title',
	user: { name: 'No author', pictureURL: '' },
	imageURL: '',
	video: '',
	summary: 'No content',
	timestamp: '2000-01-01 00:00:00',
	like: false
}) => {
	const article = document.createElement('article');
	article.classList.add('article');
	article.innerHTML = `
		<header>
			<a class="article-title" href="/article/?id=${id}">${title}</a>
		</header>
		<div class="article-content">
			<div class="article-like">
				${like}
			</div>
			<div class="article-category">
				${category.name}
			</div>
			<a class="article-title" href="/article/?id=${id}">
				<img src="${imageURL}" class="article-image"></img>
			</a>
			<div>
				<p class="article-summary">${summary}</p>
			</div>
			<div class="article-author">
				<div class="article-author-name">${user.name}</div>
				<div class="article-author-picture">
					<img src="${user.pictureURL}" alt="${user.name}" title="${user.name}"/>
				</div>
			</div>
			<div class="article-timestamp">${timestamp}</div>
		</div>
  `;

	return article;
};

export default {
	createArticle
};