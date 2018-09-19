import { appendComponent } from 'utils/utils';
import { ArticleService } from 'services/article-service';
import { createArticle } from 'components/article/article-component';

const loadArticles = (articlesJSON, articles) => {
	const updatedArticles = articles;
	if (articlesJSON.length === 0) {
		updatedArticles.innerHTML = 'No articles';
	} else {
		appendComponent(updatedArticles,
			articlesJSON.map(articleData => createArticle(articleData)));
	}
};

export const updateArticles = ({ categoryId, search }) => {
	const articleServiceInstance = new ArticleService();
	const articles = document.getElementById('articles');
	articles.innerHTML = `<div class="article">
													<div class="spinner">
														<i class="fas fa-spinner fa-spin fa-2x"></i>
													</div>
												</div>`;
	// get articles
	articleServiceInstance.getArticles({
		category: categoryId,
		search
	}).then(async (articlesJSON) => {
		// get coments number for each article
		const articlesData = articlesJSON;
		for (let i = 0; i < articlesData.length; i++) {
			const num = await articleServiceInstance.getCommentsNumber(articlesData[i].id);
			articlesData[i].commentsNumber = num;
		}
		articles.innerHTML = '';
		loadArticles(articlesJSON, articles);
	}).catch((error) => {
		console.log(error); // eslint-disable-line no-console
		articles.innerHTML = '<div class="article">There was an error loading articles, please reload</div>';
	});
};

export const createArticles = ({ categoryId, search }) => {
	const articles = document.getElementById('articles');
	updateArticles({ categoryId, search });
	return articles;
};

export default {
	createArticles
};
