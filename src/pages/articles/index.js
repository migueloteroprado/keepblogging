import { updateHeader } from 'components/header/header-component';
import { configHeaderScroll } from 'utils/scroll';
import { updateFooter, configGoTopButton } from 'components/footer/footer-component';
import { createArticles } from 'components/articles/articles-component';
import queryString from 'query-string';
import 'styles/main.scss';

const query = queryString.parse(window.location.search);
const categoryId = query && query.category;
const search = query && query.search;

configHeaderScroll();
configGoTopButton();
updateHeader({ title: 'KeepBlogging', documentTitle: 'KeepBlogging', active: 'home' });
updateFooter({ footerText: 'List of Articles' });
createArticles({ categoryId, search });
