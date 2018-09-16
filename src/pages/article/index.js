import 'styles/main.scss';
import { updateHeader } from 'components/header/header-component';
import { updateArticleDetail } from 'components/article-detail/article-detail-component';
import queryString from 'query-string';
import ArticleService from 'services/article-service';
import 'styles/main.scss';

const articleServiceInstance = new ArticleService();
const query = queryString.parse(window.location.search);
const articleId = query && query.id;

if (articleId) {
  articleServiceInstance.getArticle(articleId).then((articleJSON) => {
    console.log(articleJSON);
    updateArticleDetail(articleJSON);
  });
}
updateHeader({ title: 'Article', active: '' });
