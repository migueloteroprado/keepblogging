import { createDomElement } from 'utils/utils';

export const createCategory = ({ id,	name } = { id: 0, name: '' }) => {
	const category = createDomElement('article', '', ['category']);
	category.innerHTML = `<a class="category-title" href="/?category=${id}">${name}</a>`;
	return category;
};

export default {
	createCategory
};
