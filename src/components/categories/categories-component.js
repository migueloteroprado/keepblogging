import { appendComponent } from 'utils/utils';
import { CategoryService } from 'services/category-service';
import { createCategory } from 'components/category/category-component';

// reveal animation library
import { revealAnimate } from 'utils/animate';

const loadCategories = (categoriesJSON, categories) => {
	const updatedCategories = categories;
	if (categoriesJSON.length === 0) {
		updatedCategories.innerHTML = 'No categories';
	} else {
		// append categories to DOM
		appendComponent(updatedCategories,
			categoriesJSON.map(articleData => createCategory(articleData)));

		// animate categories showing
		revealAnimate('.categories', {
			opacity: 0.1,
			duration: 800,
			scale: 0.9,
			delay: 0,
			distance: '0px'
		});
	}
};

const showError = (error, categories) => {
	const categoriesContainer = categories;
	console.log(error); // eslint-disable-line no-console
	categoriesContainer.innerHTML = '<h4 class="error center">There was an error loading categories, please reload</h4>';
};

export const updateCategories = () => {
	const categoryServiceInstance = new CategoryService();
	const categories = document.getElementById('categories');
	categories.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
	// get categories
	categoryServiceInstance.getCategories().then(async (categoriesJSON) => {
		if (categoriesJSON.error) {
			showError(categoriesJSON.error, categories);
		} else {
			// get coments number for each article
			categories.innerHTML = '';
			loadCategories(categoriesJSON, categories);
		}
	}).catch((error) => {
		showError(error, categories);
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
