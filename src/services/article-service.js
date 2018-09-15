
import APIService from './API-service';

export class ArticleService {
	constructor() {
		this.APIServiceInstance = new APIService();
		this.model = 'articles';
	}

	async getArticles({
		category, filter, start, limit
	} = {
		category: undefined, filter: '', start: 0, limit: 10
	}) {
		let queryString = '?_expand=category&_expand=user';
		queryString += category ? `&categoryId=${category}` : '';
		queryString += filter && filter.length > 0 ? `&q=${filter}` : '';
		queryString += start && start > 0 ? `&_start=${start}` : '';
		queryString += limit && limit > 0 ? `&_limit=${limit}` : '';

		return this.APIServiceInstance.get(this.model + queryString);
	}

	async getArticle(id) {
		return this.APIServiceInstance.get(`${this.model}/${id}?_expand=user`);
	}
}

export default ArticleService;
