import { updateHeader } from 'components/header/header-component';
import { configHeaderScroll } from 'utils/scroll';
import { configGoTopButton, updateFooter } from 'components/footer/footer-component';
import { createCategories } from 'components/categories/categories-component';
import 'styles/main.scss';

configGoTopButton();
configHeaderScroll();
updateHeader({ title: 'KeepBlogging', documentTitle: 'KeepBlogging - Categories', active: 'menu-category-more' });
updateFooter({ footerText: 'List of Categories' });
createCategories();
