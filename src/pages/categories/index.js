import { updateHeader } from 'components/header/header-component';
import { configGoTopButton } from 'components/footer/footer-component';
import { createCategories } from 'components/categories/categories-component';
import 'styles/main.scss';

updateHeader({ title: 'KeepBlogging', active: 'menu-category-more' });
configGoTopButton();
createCategories();
