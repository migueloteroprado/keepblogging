export const createCategory = ({ id,	name } = { id: 0, name: '' }) => {
	const category = document.createElement('article');
	category.classList.add('category');
	category.innerHTML = `<a class="category-title" href="/?category=${id}">${name}</a>`;

	return category;
};

export default {
	createCategory
};
