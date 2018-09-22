import { appendComponent } from 'utils/utils';
import { CategoryService } from 'services/category-service';
import { createCategory } from 'components/category/category-component';

const loadCategories = (categoriesJSON, categories) => {
	const updatedCategories = categories;
	if (categoriesJSON.length === 0) {
		updatedCategories.innerHTML = 'No categories';
	} else {
		appendComponent(updatedCategories,
			categoriesJSON.map(articleData => createCategory(articleData)));
	}
};

export const updateCategories = () => {
	const categoryServiceInstance = new CategoryService();
	const categories = document.getElementById('categories');
	categories.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
	// get categories
	categoryServiceInstance.getCategories().then(async (categoriesJSON) => {
		// get coments number for each article
		categories.innerHTML = '';
		loadCategories(categoriesJSON, categories);
	}).catch((error) => {
		console.log(error); // eslint-disable-line no-console
		categories.innerHTML = '<h4 class="error center">There was an error loading categories, please reload</h4>';
	});
};

export const createCategories = () => {
	const categories = document.getElementById('categories');
	updateCategories();
	return categories;
};

export default {
	createCategories
};
