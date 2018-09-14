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

export const updateArticles = () => {
	const articleServiceInstance = new ArticleService();
	const articles = document.getElementById('articles');
	articles.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
	articleServiceInstance.getArticles().then((articlesJSON) => {
		articles.innerHTML = '';
		loadArticles(articlesJSON, articles);
	}).catch((error) => {
		console.log(error);
		articles.innerHTML = 'There was an error, please reload';
	});
};

export const createArticles = () => {
	const articles = document.getElementById('articles');
	updateArticles();
	return articles;
};

export default {
	createArticles
};