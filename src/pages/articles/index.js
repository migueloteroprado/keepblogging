import { updateHeader } from 'components/header/header-component';
import { createArticles } from 'components/articles/articles-component';
import queryString from 'query-string';
import 'styles/main.scss';

const query = queryString.parse(window.location.search);
const categoryId = query && query.category;
const search = query && query.search;

updateHeader({ title: 'KeepBlogging', active: 'home' });

createArticles({ categoryId, search });
