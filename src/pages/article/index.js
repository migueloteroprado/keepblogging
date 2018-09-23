import { updateHeader } from 'components/header/header-component';
import { configHeaderScroll } from 'utils/scroll';
import { configGoTopButton, updateFooter } from 'components/footer/footer-component';
import { updateArticleDetail } from 'components/article-detail/article-detail-component';
import queryString from 'query-string';
import { ArticleService } from 'services/article-service';
import 'styles/main.scss';

const articleServiceInstance = new ArticleService();
const query = queryString.parse(window.location.search);
const articleId = query && query.id;

const showError = (error, article) => {
	const articleContainer = article;
	console.log(error); // eslint-disable-line no-console
	articleContainer.innerHTML = '<h4 class="error center">There was an error loading article detail, please reload</h4>';
};

if (articleId) {
	const article = document.getElementById('article-detail');
	article.innerHTML = '<div class="spinner"><i class="fas fa-sync-alt fa-spin"></i></div>';
	articleServiceInstance.getArticle(articleId).then((articleJSON) => {
		if (!articleJSON.error) {
			updateArticleDetail(articleJSON);
		} else {
			showError(articleJSON.error, article);
		}
	}).catch((error) => {
		showError(error, article);
	});
}
updateHeader({ title: 'KeepBlogging', documentTitle: 'KeepBlogging - Article Detail', active: '' });
updateFooter({ footerText: 'Article Detail' });
configHeaderScroll();
configGoTopButton();
