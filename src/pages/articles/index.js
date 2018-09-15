import { updateHeader } from 'components/header/header-component';
import { createArticles, updateArticles } from 'components/articles/articles-component';
import queryString from 'query-string';
import 'styles/main.scss';
import PubSub from 'pubsub-js';

const query = queryString.parse(window.location.search);
const categoryId = query && query.category;

updateHeader({ title: 'Keep Blogging', active: 'home' });

createArticles({ categoryId });

PubSub.subscribe('reload', () => {
	updateArticles();
});
