import 'styles/main.scss';
import { updateHeader } from 'components/header/header-component';
import { updateArticleDetail } from 'components/article-detail/article-detail-component';
import queryString from 'query-string';
import ArticleService from 'services/article-service';

const articleServiceInstance = new ArticleService();
const query = queryString.parse(window.location.search);
const articleId = query && query.id;

if (articleId) {
	const article = document.getElementById('article-detail');
	article.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
	articleServiceInstance.getArticle(articleId).then((articleJSON) => {
		console.log(articleJSON);
		updateArticleDetail(articleJSON);
	}).catch((error) => {
		console.log(error);
		article.innerHTML = 'There was an error loading the article data, please reload';
	});
}
updateHeader({ title: 'Keep Blogging', active: '' });
