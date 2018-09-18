export const createCategory = ({id,	name } = { id: 0, name: '' }) => {
	const category = document.createElement('article');
	category.classList.add('category');
	category.innerHTML = `
		<header class="category-header">
			<a class="category-title" href="/?category=${id}">${name}</a>
		</header>
	`;

	return category;
};

export default {
	createCategory
};
