import { updateHeader } from 'components/header/header-component';
import { configHeaderScroll } from 'utils/scroll';
import { configGoTopButton } from 'components/footer/footer-component';
import { createCategories } from 'components/categories/categories-component';
import 'styles/main.scss';

configGoTopButton();
configHeaderScroll();
updateHeader({ title: 'KeepBlogging', active: 'menu-category-more' });
createCategories();
