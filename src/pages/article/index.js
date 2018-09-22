import { updateHeader } from 'components/header/header-component';
import { configHeaderScroll } from 'utils/scroll';
import { configGoTopButton } from 'components/footer/footer-component';
import { updateArticleDetail } from 'components/article-detail/article-detail-component';
import queryString from 'query-string';
import { ArticleService } from 'services/article-service';
import 'styles/main.scss';

const articleServiceInstance = new ArticleService();
const query = queryString.parse(window.location.search);
const articleId = query && query.id;

if (articleId) {
	const article = document.getElementById('article-detail');
	article.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
	articleServiceInstance.getArticle(articleId).then((articleJSON) => {
		updateArticleDetail(articleJSON);
	}).catch((error) => {
		console.log('Error:', error.message); // eslint-disable-line no-console
		article.innerHTML = '<h4 class="error center">There was an error loading article detail, please reload</h4>';
	});
}
updateHeader({ title: 'KeepBlogging', active: '' });
configHeaderScroll();
configGoTopButton();
