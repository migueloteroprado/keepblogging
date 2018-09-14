import { updateHeader } from 'components/header/header-component';
import { createArticles, updateArticles } from 'components/articles/articles-component';
import 'styles/main.scss';
import PubSub from 'pubsub-js';

updateHeader({ title: 'Keep playing', active: 'home' });
createArticles();

PubSub.subscribe('reload', () => {
	updateArticles();
});
