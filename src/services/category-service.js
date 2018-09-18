import APIService from './API-service';

export class CategoryService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'categories';
	}

	async getCategories() {
		const categories = await this.APIServiceInstance.get(this.model);
		return categories;
	}

	async getCategory(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}`);
	}
}

export default CategoryService;
